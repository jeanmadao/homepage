title: ASM registers simulation with Python
date: 2024-09-16
---

### Using Python for Reverse Engineering

Lately, I've been trying to grind my Reverse Engineering skills by solving
challenges on Root-Me. One of them seemed to be entirely written in x86 ASM,
so the decompilation in Ghidra led to something unreadable in C. No choice
there, I have to read the assembly code.

Assembly code is actually quite simple since it consists of only a set of
limited instructions. What is hard though is to be able to keep track of the
value of each registers after each instruction and each loop. One could get a
pen and a piece of paper to be able to get through the whole code. But I've
decided to go for a simulation of the whole assembly code by using Python.

### Simulating Registers

Since it is forbidden to share Root-Me challenges solutions I will instead be
sharing how I created this assembly simulation in Python.

I decided to got for a `Register` class to be able to simulate each operation
possible as well as keeping track of the value inside each register. The
`__init__()` function goes like this:

```py
class Register:
    def __init__(self, value=0, bits_size=32):
        self.value = value
        self.bits_size = bits_size
```

Quite simple, just an initial `value` as well as the number of bits inside the
register. Since we are working on x86 ASM, we will pass `32` bits (4 bytes) to
`bits_size`. After that, we need to write the methods to recreate the
different assembly instructions.

I didn't write the methods for every ASM instruction (yet), I just went for
the instructions present in the binary I was analyzing. You are free to
implement the other instructions not implemented by youself if you feel like
it.

### Instructions

#### Basic arithmetic and rotation

```py
def get_value(self):
    return self.value

def mov(self, value):
    self.value = self.extract_value(value)
```

`get_value()` and `mov()` are quite straightforward. The former return the
value in the register, and the latter set the value in the register.

```py
def rol(self, rotation_bits):
    mask = (2**self.bits_size - 1) ^ (2**(self.bits_size - rotation_bits) - 1)
    lsb = self.value & mask
    lsb >>= self.bits_size - rotation_bits
    self.value &= ~mask
    self.value <<= rotation_bits
    self.value += lsb

def ror(self, rotation_bits):
    mask = 2**rotation_bits - 1
    msb = self.value & mask
    msb <<= self.bits_size - rotation_bits
    self.value >>= rotation_bits
    self.value += msb
```

`rol` and `ror` rotate the bits around respectively to the left and right.
As an example, if we do the `rol` operation by 3 bits on a 8-bit register:

```
     rol 3
  ^>>>>>>>>>>
|001|10101  v
     10101|001|
```

Basically, we create a mask with the number of bits to rotate, apply this mask
to the most significant bits if it's a rotation to the right, and to the least
significant bits if it's a rotation to the left. We then shift both the value
in the register and the value extracted by the mask to rotate the bits.

```py
def __add__(self, value):
    return self.value + self.extract_value(value) % 2**self.bits_size

def add(self, value):
    self.value = self.__add__(value)

def inc(self):
    self.add(1)

def __sub__(self, value):
    return self.value - self.extract_value(value) % 2**self.bits_size

def sub(self, value):
    self.value = self.__sub__(value)

def dec(self):
    self.sub(1)
```

`add` and `sub` are quite straightforward as well, we just add or substract
the value in the register by the value passed. It's important to handle
overflow with `% 2**self.bits_size`.

`inc` and `dec` are even easier, just reuse the `add` and `sub` methods by
only passing `1` as a value.

#### Operations on subregisters

In the code, I have seen instructions operating on the lower bits of a
register. Before starting to recreate the other instructions, we have to
understand how it works.

```py
    |     16 bits     | 8 bits | 8 bits |
    -------------------------------------
EAX |                 |   AH   |   AL   | 32-bits
    -------------------------------------
                      |       AX        |
```

Each main register, namely `EAX`, `EBX`, `ECX`, `EDX`, are segmented like the
schema above. In the case of `EAX`, the 16 lower bits can be accessed with the
name `AX`. And this 16-bit `AX` subregister is split into `AH`, which occupy
the 9th to 16th bit, and `AL`, occupying the 1st to 8th bit. One thing I
didn't know about and found out way too late is that when one of those
subregisters overflows, for example `AL`, the rest of the addition does not
carry over to the next subregister `AH`. The actual behavior is that the
registers and subregisters value cycle back to `0` and carry on the rest of
the addition. In other words `result = result % 2^8`.

It is also worth mentioning that when a register overflows, the Carry Flag
will be set.

The implementation will be like this.

```py
@staticmethod
def extract_value(other):
    match other:
        case Register():
            return other.value
        case int():
            return other

def get_sub(self, bits, offset_bit):
    return (self.value & ((2**bits - 1) << offset_bit)) >> offset_bit

def reset_sub(self, bits, offset_bit):
    self.value ^= self.value & ((2**bits-1) << offset_bit)

def mov_sub(self, bits, offset_bit, value):
    self.reset_sub(bits, offset_bit)
    self.value |= self.extract_value(value) << offset_bit

def add_sub(self, bits, offset_bit, value):
    result = (self.get_sub(bits, offset_bit) + self.extract_value(value)) % (2**bits)
    self.mov_sub(bits, offset_bit, result)

def sub_sub(self, bits, offset_bit, value):
    result = (self.get_sub(bits, offset_bit) - self.extract_value(value)) % (2**bits)
    self.mov_sub(bits, offset_bit, result)
```

`get_sub()` will get us the value from a subregister. It takes the number of
bits to get and at which offset we start.

What happens in this one line function is that it creates a mask with how many
bits we want to get(`(2**bits - 1) << offset_bit`), it thens apply this mask
to the value of the whole register to only extract the subregister value.
It then shifts to the right the value by the offset bit.

As an example, this is how we can retrive the value of `AL`, `AH` and `AX`.

```py
AL = get_sub(8, 0)
AH = get_sub(8, 8)
AX = get_sub(16, 0)
```

`reset_sub()` will reset a subregister value to 0.

It does basically the same thing by creating a mask and applying it to the
register value, and after receiving the results, we do a XOR operation to the
value to put the subregister to `0`.

`mov_sub()` will copy a value to the subregister.

For this purpose, we can reset the subregister using `reset_sub()`, then shift
the value to the offset bit where the subregister is, and the do an `or`
operation with the result value and the current value in the register.

`add_sub()` and `sub_sub()` will add or substract the value in the register
with the passed value, then put the result back in the subregister.

We just need to get the value in the subregister with `get_sub()`,
add/substract the value in the register by the value passed to the method.
Afterwards, we manage the overflow with `% (2**bits)` just as explained above.
We then use the `mov_sub()` method to move the result value into the register.

### Conclusion

This simulation is a nice way to understand more about how registers work in a
CPU. It's also a nice way to reproduce the behavior of an executable to do
binary analysis. There are obviously some missing features like access to
the in the memory, the handling of the flags, and all the other ASM
instructions. I might complete this little bit of code later. In the mean
time, feel free to implement the missing features yourself! You will find the
source code
<a href="https://github.com/jeanmadao/reverse-engineering" target="_blank">here</a>.
