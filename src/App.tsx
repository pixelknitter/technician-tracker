import React from "react"
import "./App.css"
import { Map } from "./components"

function App() {
  return (
    <div className="App">
      <header className="App-header">Technician Tracker</header>
      <Map />
      <footer className="App-footer">
        <a
          className="App-link"
          href="https://wanderinghearth.studio/connect"
          target="_blank"
          rel="noopener noreferrer"
        >
          Created by Wandering Hearth Studios
        </a>
      </footer>
    </div>
  )
}

export default App
