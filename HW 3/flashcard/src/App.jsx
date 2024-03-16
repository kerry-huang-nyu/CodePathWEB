//import { useState } from 'react'
import './App.css';
import { useState } from 'react';
import Card from './component/Card'
import myObject from './assets/csvjson';
import random from 'random';

const App = () => {
  //read your files!!
  let TOTAL = 300;

  const [pool, setPool] = useState(Array.from({ length: 300 }, (_, index) => index));

  const [curr, setCurr] = useState(0);

  const [left, setLeft] = useState(TOTAL);

  const [history, setHistory] = useState([]); //history should be a list of integers 


  const chooseNum = () => {
    let ind = random.int(0, left-1);
    let realind = pool[ind]; //the real index is stored in the pool 
    var poolcopy = [...pool]; //copy pool 
    poolcopy[ind] = pool[left-1]; //swap the indices 
    setPool(poolcopy);

    setLeft(prevLeft => prevLeft - 1);

    var historycopy = [...history];
    historycopy.push(realind);
    setHistory(historycopy);
    console.log("i have set history to be ", history);
    console.log("i have set history to be ", history);
    return realind;
  }

  const [count, setCount] = useState(0);

  //setup a random number generator 
  //choose a random question 
  const [fact, setState] = useState(["Please clickme :D to reveal the answer", "42", 1]);

  const [correct, setCorrect] = useState("unknown");

  const next = () =>{
    reset();
    if (left > 0) {
      let ind = chooseNum();
      var tempState = [myObject[ind]['Question'], myObject[ind]['Answer'], myObject[ind]['Correct']];
      setCount(prevCount => prevCount + 1) // Return the updated state value);
      setState(tempState);
      setCurr(count + 1); //why can't i just use setCurr(prevCount)

      console.log("now count is " +  count);
      console.log("now curr is " +  curr);
      console.log("now left is ", left);
      console.log("the history is ", history);
    }
  }

  const prev = () =>{
    if (curr > 0){
      setCurr(prevCurr => prevCurr - 1);
      var newcurr = curr - 1;

      var ind = history[newcurr];
      var tempState = [myObject[ind]['Question'], myObject[ind]['Answer'], myObject[ind]['Correct']];
      setState(tempState);
    }
  }

  const checkAnswer = () =>{
    var userAnswer = document.getElementById('answer').value;
    var correctAnswer = fact[1];
    if (userAnswer === correctAnswer){
      setCorrect("correct");
    }
    else{
      setCorrect("wrong");
    }
  }

  const reset = () => {
    setCorrect("unknown");
    var inputfield = document.getElementById('answer');
    inputfield.value = '';
  }

  return (
    <div className = "mainblock">
      <button className='label'>{"Number of Cards Seen: "+ count}</button>
      
      <Card question={fact[0]} answer={fact[1]} diff={fact[2]}/>

      <div className ="buttonContain">

      <button onClick={prev}>← Prev</button>

      <div className='label'> 
      <label for="answer">Input: </label>
      <input type="text" className={correct} id="answer" ></input>
      </div>

      <button onClick={checkAnswer}>Submit</button>

      <button onClick={next}>Next →</button>
      </div>
      

    </div>
  )
}

export default App