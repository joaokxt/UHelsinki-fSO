import React from 'react'
import { useState } from 'react'

//'this' keyword doesn't work when referencing functions

/*
  const object = {
    name: ...,
    age: ...,
    greet: function(){
      console.log('Hi, my name is' + this.name)
    }
  }

  object.name <=> object[name]

  object.growOlder = function(){
    age+=1
  } --> Methods can be added later!

  const referenceToGreet = object.greet

  object.greet() --> This works
  referenceToGree() --> This doesn't

  class Person{
    constructor(name,age){
      this.name=name
      this.age=age
    }
    greet(){
      console.log('Hi, my name is' + this.name)
    }
  }
*/


/* const t = [2,4,6]
  const t_squared = t.map((value) => value*value)
  const t_div = t.map((value) => '<div>' + value + '<div>')
  t.forEach((value) ==> {
    console.log(value)
  })
  const t2 = t.concat(8) -->> [2,4,6,8] -->> Advisable method for array modification
  const [first, rest] = t
    first -->> 2
    rest -->> [4,6]
*/

// it is not advisable to use 'var'

/*
const Hello = ({ name, age }) => {
  // const {name, age} = props -->> Destructuring
  const bornYear = () => new Date().getFullYear() - age

  return (
    <div>
      <p>Hello {name}, you are {age}</p>
      <p>You were probably born in {bornYear()}</p>
    </div>
  )
}

const Footer = () => {
  return (
    <div>
      Greeting app created by <a href='https://github.com/joaokxt'>joaokxt</a>
    </div>
  )
}

const App = (props) => {
  const {counter} = props
  const name = 'Peter'
  const age = 20
  return (
    <>
      <h1>Greetings</h1>
      <div>{counter}</div>
      <Hello name={name} age={age} />
      <Footer />
    </>
  )
}

export default App
*/

/*
  setTimeout(
    () => setCounter(counter+1), // Every second call setCounter to update counter
    1000 
  )
*/

// <button onClick = {setCounter(0)} 
// This wouldn't work, because it is a function call and not reference
// It's called immediately when the button renders

/*

const Display = ({counter}) => <div>{counter}</div>

const Button = ({onSmash, text}) => <button onClick={onSmash}>{text}</button>

const App = () => {
  const [ counter, setCounter ] = useState(0) // 0 is initial state of 'counter', 'setCounter' is the function to modify state
  const increaseByOne = () => setCounter(counter+1)
  const decreaseByOne = () => setCounter(counter-1)
  const zeroCounter = () => setCounter(0)

  return(
    <>
      <Display counter={counter}/>
      <Button
        onSmash = {increaseByOne}
        text = {"Add one"}
      />
      <Button
        onSmash = {decreaseByOne}
        text = {"Remove one"}
      />
      <Button
        onSmash = {zeroCounter}
        text = {"Zero"}
      />
    </>
  )
}

*/

/*
  const[clicks, setClicks] = useState({
    left:0, right:0
  })

  const handleLeftClick = () => {
    const newClicks = {
      ...clicks,
      left: clicks.left + 1,
    } //Create a copy of 'clicks', which left attribute is increased by one
    setClicks(newClicks)
  }

  const handleRightClick = () => {
    const newClicks = {
      ...clicks,
      right: clicks.right + 1
    }
    setClicks(newClicks)
  }
*/
//IT IS FORBIDDEN TO MUTATE A STATE DIRECTLY

const History = ({allClicks}) => {
  if(allClicks.length === 0){
    return (
      <div>
        The app is used by pressing buttons
      </div>
    )
  }
  return (
    <div>
      Press History: {allClicks.join(' ')}
    </div>
  )
}

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const App = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setClicks] = useState([])
  const [total, setTotal] = useState(0)

  const handleLeftClick = () => {
    const updatedLeft = left+1
    setLeft(updatedLeft)
    setClicks(allClicks.concat('L'))
    setTotal(updatedLeft+right)
  }

  const handleRightClick = () => {
    const updatedRight = right+1
    setRight(updatedRight)
    setClicks(allClicks.concat('R'))
    setTotal(left+updatedRight)
  }

  return (
    <div>
      {left}
      <Button handleClick={handleLeftClick} text='left' />
      <Button handleClick={handleRightClick} text='right' />
      {right}
      <History allClicks={allClicks} />
      <p>Total: {total}</p>
    </div>
  )
}

export default App