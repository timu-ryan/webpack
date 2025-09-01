import React, { useState } from 'react'

export const App = () => {

  const [counter, setCounter] = useState<number>(0);

  function handleClick() {
    setCounter(counter => counter + 1)
  }

  return (
    <>
      <div>
        Hello world
      </div>
      <div>{counter}</div>
      <button onClick={handleClick}>add 1</button>
    </>
  )
}
