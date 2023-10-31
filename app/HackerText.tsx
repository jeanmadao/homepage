"use client"

import { useEffect, useState } from "react"

interface Props {
  text: string
  iterationReveal?: number
}

const randomString = (length: number) => {
  let string = ""
  for (let i = 0; i < length; i++) {
    string = string + String.fromCharCode(32 + Math.floor(Math.random() * 95))
  }
  return string
}
const HackerText = ({ text, iterationReveal = 10 }: Props) => {
  const [hackerText, setHackerText] = useState(randomString(text.length))
  const [iterations, setIterations] = useState(0)
  console.log(hackerText)
  useEffect(() => {
    if (iterations < iterationReveal) {
      const intervalId = setInterval(() => {
        setIterations(iterations + 1)
        setHackerText(randomString(text.length))
      }, 30)
      return () => clearInterval(intervalId)
    } else if (Math.floor(iterations) - iterationReveal <= text.length) {
      const intervalId = setInterval(() => {
        setIterations(iterations + 0.4)
        setHackerText(
          text
            .slice(0, Math.floor(iterations) - iterationReveal)
            .concat(
              randomString(
                text.length - (Math.floor(iterations) - iterationReveal)
              )
            )
        )
      }, 30)
      return () => clearInterval(intervalId)
    }
  }, [iterations, iterationReveal, text])

  return <>{hackerText}</>
}

export default HackerText
