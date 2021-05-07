import React, { FC, useState } from "react"

interface LocationSearchProps {
  onSearch: (search: string) => void
}

export const LocationSearch: FC<LocationSearchProps> = ({ onSearch }) => {
  const [locationSearch, setLocationSearch] = useState("")
  const disableSearch = locationSearch.trim() === ""

  const addLocation = () => {
    onSearch(locationSearch)
    setLocationSearch("")
  }

  return (
    <div className="text-center">
      <label htmlFor="Search">
        <input className="mr-3" type="text" placeholder="type a city" value={locationSearch} onChange={(e) => setLocationSearch(e.target.value)} />
      </label>
      <button className="btn btn-primary" onClick={addLocation} disabled={disableSearch}>
        Search
      </button>
    </div>
  )
}
