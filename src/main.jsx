import React from 'react'
import ReactDOM from 'react-dom/client'
import { GameProvider } from './hooks/GameContext'
import App from './App.jsx'
import './style.css'

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/memory-lane-game/service-worker.js', { scope: '/memory-lane-game/' })
  })
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GameProvider>
      <App />
    </GameProvider>
  </React.StrictMode>,
)
