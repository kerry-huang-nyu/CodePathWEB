import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className="header">
      <h1>Can you get the answer?</h1>
      <p>Please answer these questions using 1 word.</p>
    </div>

    <App />

  </React.StrictMode>,
)
