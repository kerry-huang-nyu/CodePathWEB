import './App.css';
import { useState } from 'react';

const App = () => {

  const [count, setCount] = useState(0);

  const [multiplier, setMultiplier] = useState(1);

  const updateCount = () => setCount(count + multiplier);

  const buyDoubleStuffed = () => {
    if (count >= 10){
      setMultiplier(multiplier * 2);
      setCount(count - 10);
    }
  }

  const buyPartyPack = () => {
    if (count >= 100){
      setMultiplier(multiplier * 5);
      setCount(count - 100);
    }
  }

  const buyFullFeast = () => {
    if (count >= 1000){
      setMultiplier(multiplier * 100);
      setCount(count - 1000);
    }
  }


  //2x is 10, 5x is 100, 10x is 1000 

  return (
    <div className="App">
      <div className="header">
        <h1>Samosa Selector</h1>
        <h2>Count: {count}</h2>
        <img className="samosa" src="\src\assets\vegetable-Samosa.png" onClick={updateCount} />

      </div>

      <div className="container">
        <div className="upgrade" onClick={buyDoubleStuffed}> 
          <h3>Double Stuffed</h3>
          <p>2x per click</p>
          <button>10 samosas</button>
        </div>

        <div className="upgrade" onClick={buyPartyPack}> 
          <h3>Party Pack</h3>
          <p>5x per click</p>
          <button>100 samosas</button>
        </div>

        <div className="upgrade" onClick={buyFullFeast}> 
          <h3>Full Feast</h3>
          <p>10x per click</p>
          <button>1000 samosas</button>
        </div>
      </div>

    </div>
  )
}

export default App