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
  const [hackerText, setHackerText] = useState(' ')
  const [iterations, setIterations] = useState(0)
  console.log(hackerText)
  useEffect(() => {
    if (iterations < 10) {
      const intervalId = setInterval(() => {
        setIterations(iterations + 1)
        setHackerText(randomString(text.length))
      }, 30)
      return () => clearInterval(intervalId)
    } else {
      setHackerText(text)
    }
  }, [iterations])

  return <>{hackerText}</>
}

export default HackerText
