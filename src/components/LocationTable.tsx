import React, { FC, useState } from "react"
import { WeatherLocation } from "../model/Weather"

interface LocationTableProps {
  locations: WeatherLocation[]
}

function convertUnixTimetoDate(unixUtc: number): Date {
  return new Date(unixUtc * 1000)
}

function roundDegreesUp(temp: number): number {
  return Math.ceil(temp)
}

function getIconUrl(code: string): string {
  return `http://openweathermap.org/img/wn/${code}.png`
}

export const LocationTable: FC<LocationTableProps> = ({ locations }) => {
  return (
    <div>
      <h2 className="text-center">Locations</h2>
      <table className="table table-hover text-center">
        <thead className="thead-dark">
          <tr>
            <th className="border-right">Name</th>
            <th className="border-right">Country</th>
            <th className="border-right">Time Stamp</th>
            <th>Weather</th>
          </tr>
        </thead>
        <tbody>
          {locations.map((location) => (
            <tr key={location.id}>
              <td className="align-middle">{location.name}</td>
              <td className="align-middle">{location.sys.country}</td>
              <td className="align-middle">{convertUnixTimetoDate(location.dt).toLocaleTimeString("en-us")}</td>
              <td>
                {location.weather.map((condition) => (
                  <div key={condition.id}>
                    <img src={getIconUrl(condition.icon)} alt={condition.main} />
                    <div>{condition.main}</div>
                  </div>
                ))}
                <div>{roundDegreesUp(location.main.temp)}&#730; F</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
