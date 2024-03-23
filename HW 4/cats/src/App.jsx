import { useState } from 'react'
import './App.css'
import './components/CatSelector.jsx'
import CatSelector from './components/CatSelector.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='container'>
        <CatSelector></CatSelector>
    </div>
  )
}

export default App
