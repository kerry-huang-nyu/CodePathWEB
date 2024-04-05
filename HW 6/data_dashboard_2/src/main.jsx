import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";

import MoreInfo from './routes/MoreInfo.jsx';

import Layout from './routes/Layout';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index={true} element={<App />} />
          <Route index = {false} path="/moreinfo/:symbol" element={<MoreInfo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
