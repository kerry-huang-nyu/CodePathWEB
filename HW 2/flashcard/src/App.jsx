//import { useState } from 'react'
import './App.css';
import { useState } from 'react';
import Card from './component/Card'
import myObject from './assets/csvjson';
import random from 'random';

const App = () => {
  //read your files!!

  var pool = Array.from({ length: 300 }, (_, index) => index);

  /*
  Error with left and curr! they are reset to these initial values each time? 
  Do i need to update them through hooks? possibly... 

  */
  var left = 300;
  var curr = 0;

  var history = [];

  const chooseNum = () => {
    let ind = random.int(0, left-1);
    let realind = pool[ind]; //the real index is stored in the pool 
    pool[ind] = pool[left-1]; //puts the last value in the middle and then decrements 
    left --;
    history.push(realind);
    return realind;
  }

  const [count, setCount] = useState(1);

  //setup a random number generator 
  //choose a random question 
  const [fact, setState] = useState(["Please clickme :D to reveal the answer", "42", 1]);

  const next = () =>{
    if (left > 0) {
      let ind = chooseNum();
      var tempState = [myObject[ind]['Question'], myObject[ind]['Answer'], myObject[ind]['Correct']];
      setCount(count + 1);
      setState(tempState);
      curr += 1; 
      console.log("now curr is " +  curr)
      console.log("now left is ", left)
    }
  }

  const prev = () =>{
    console.log(count + "   " +curr)
    if (count > 0 && curr > 0){
      curr --;
      var ind = history[curr];
      var tempState = [myObject[ind]['Question'], myObject[ind]['Answer'], myObject[ind]['Correct']];
      setState(tempState);
    }
  }

  return (
    <div className = "mainblock">
      <button className='label'>{"Number of Cards Seen: "+ count}</button>
      
      <Card question={fact[0]} answer={fact[1]} diff={fact[2]}/>

      <div className ="buttonContain">

      <button onClick={prev}>← prev</button>
      <button onClick={next}>next →</button>
      </div>
      

    </div>
  )
}

export default App