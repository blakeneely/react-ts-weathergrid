import React, { FC, useState } from "react"
import { LocationSearch } from "./components/LocationSearch"
import { LocationTable } from "./components/LocationTable"
import { WeatherLocation } from "./model/Weather"
import { searchLocation } from "./services/WeatherService"
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"

require("dotenv").config()

const App: FC = () => {
  const [locations, setLocations] = useState<WeatherLocation[]>([])
  const [error, setError] = useState("")
  const [warning, setWarning] = useState("")

  const resetAlerts = () => {
    setError("")
    setWarning("")
  }

  let addLocation = async (term: string) => {
    resetAlerts()
    const location = await searchLocation(term)

    if (!location) {
      setError(`No location found called ""${term}`)
    } else if (locations.find((item) => item.id === location.id)) {
      setWarning(`Location "${term} is already in this list.`)
    } else {
      setLocations([location, ...locations])
    }
  }

  return (
    <div className="container">
      <h1 className="text-center">Weather Grid</h1>

      <LocationSearch onSearch={addLocation} />
      {error ? <div className={`alert alert-danger`}>{error}</div> : null}
      {warning ? <div className={`alert alert-warning`}>{warning}</div> : null}
      <LocationTable locations={locations} />
    </div>
  )
}

export default App
