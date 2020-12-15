import React from "react"
import { ToastProvider } from "react-toast-notifications"
import "./App.css"
import { Map } from "./components"
import { Loading } from "./components/loading"
import { useTechLocationService } from "./hooks"

function App() {
  const service = useTechLocationService()
  if (service.status === "error") console.error(service.error)

  return (
    <ToastProvider>
      <div className="App">
        <header className="App-header">Technician Tracker</header>
        {service.status === "loading" && <Loading />}
        {service.status === "error" && (
          <Loading type={service.status} message={service.error.message} />
        )}
        {service.status === "loaded" && <Map data={service.payload} />}
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
    </ToastProvider>
  )
}

export default App
