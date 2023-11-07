import React, { useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [postcode1, setPostcode1] = useState('')
  const [postcode2, setPostcode2] = useState('')
  const [distance, setDistance] = useState(null)
  const [timeOfTravel, setTimeOfTravel] = useState("")

  const handleCalculateDistance = async () => {
    
    try {
      const base = import.meta.env.VITE_API_URL
      const mid = `origins=${postcode1}&destinations=${postcode2}`
      const suffix = import.meta.env.VITE_SUFFIX
      const fullApi = base + mid + suffix
      console.log(fullApi)

      const response = await axios.get(fullApi)
      
      setDistance(response.data.rows[0].elements[0].distance.text)
      setTimeOfTravel(response.data.rows[0].elements[0].duration.text)
    } catch (error) {
      console.error('Error calculating distance:', error)
    }
  }
  console.log(postcode1)
  return (
    <div className='container'>
            <div>
            <h3 className='gabi-logo'>:GaBi: Calculator</h3>
    </div>
    <div className="App">
      <h1>Geometric Distance Calculator</h1>
      <div>
        <label>
          Enter first postcode:
          <input
            type="text"
            value={postcode1}
            onChange={(e) => setPostcode1(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Enter second postcode:
          <input
            type="text"
            value={postcode2}
            onChange={(e) => setPostcode2(e.target.value)}
          />
        </label>
      </div>
      <button onClick={handleCalculateDistance}>Calculate Distance</button>
      { distance && <div>
       <p>The total distance between the 2 addresses is <span className='result'>{distance}les</span> miles.</p>
      <p>Estimated time of travel is <span className='result'>{timeOfTravel}</span> </p>
      </div>}
    </div>
      <footer><p className='footer'>This service uses Google map API geolocation services.</p></footer>
    </div>
  )
}

export default App

