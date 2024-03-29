import { useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'

import BaristaForm from './components/BaristaForm';

function App() {
  
  return (
    <div className="whole-page">
      <h1>Build Your Own Screenshot! 📸</h1>
      
      <APIForm
        inputs={inputs}
        handleChange={(e) =>
          setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value.trim(),
          }))
        }
        onSubmit={submitForm}
      />
      <br></br>

    </div>
  );
}

export default App
