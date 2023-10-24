'use client'

import { useEffect, useState } from 'react'

interface Props {
  text: string
}

const randomString = (length: number) => {
  let string = ''
  for (let i = 0; i < length; i++) {
    string = string + String.fromCharCode(32 + Math.floor(Math.random() * 95))
  }
  return string
}
const HackerText = ({ text }: Props) => {
  const [hackerText, setHackerText] = useState(randomString(text.length))
  const [iterations, setIterations] = useState(0)
  console.log(iterations)
  useEffect(() => {
    setIterations(iterations + 1)
    if (iterations < 10) {
      const id = setInterval(() => {
        console.log(iterations)
        setHackerText(randomString(text.length))
      }, 1000)
    }
  }, [])

  return <>{hackerText}</>
}

export default HackerText
