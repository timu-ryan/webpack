import React, { useState } from 'react'
import classes from './App.module.scss';

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
      <button className={classes.button} onClick={handleClick}>add 1</button>
    </>
  )
}
