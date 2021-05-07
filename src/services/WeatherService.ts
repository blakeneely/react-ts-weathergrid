import { WeatherLocation } from "../model/Weather"

require("dotenv").config()

const key: string = process.env.REACT_APP_OPEN_WEATHER_API_KEY as string

if (key === undefined) {
  throw new Error("No Open Weather API Key defined")
}

const keyQuery = `appid=${key}`
const server = "http://api.openweathermap.org/data/2.5"

export async function searchLocation(term: string): Promise<WeatherLocation | undefined> {
  const result = await fetch(`${server}/weather?q=${term}&${keyQuery}&units=imperial`)

  if (result.status === 404) return undefined
  if (result.status !== 200) throw new Error("Failed to read location data")

  console.log(result)

  return await result.json()
}
