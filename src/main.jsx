import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
//styles
import './assets/styles/reset.css';
import './assets/styles/index.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
