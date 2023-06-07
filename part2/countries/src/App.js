import {useState, useEffect} from 'react'
import axios from 'axios'

const Countries = ({countries, onCountryClick}) => {

  const [temperature, setTemperature] = useState({
    value: null,
    icon: '',
    wind: ''
  })

  useEffect(() => {
    if (countries.length === 1) {
      let unit = 'metric'
      let key = process.env.REACT_APP_API_KEY
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?lat=${countries[0].capitalInfo.latlng[0]}&lon=${countries[0].capitalInfo.latlng[1]}&appid=${key}&units=${unit}`)
        .then(response => {
          console.log(response.data)
          setTemperature({
            value: response.data.main.temp,
            icon: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
            wind: response.data.wind.speed
          })
        })
        .catch(error => {
          setTemperature('haha')
          console.log(error)
        })
    }
  }, [countries])

  if (countries.length >= 10) {
    return <>Too many matches, specify another filter</>
  } else if (countries.length === 1) {
    return (
      <div>
        <h1>{countries[0].name.common}</h1>
        capital {countries[0].capital}<br />
        area {countries[0].area}<br />
        <h4>languages:</h4>
        <ul>
          {Object.entries(countries[0].languages).map(([code, name]) => <li key = {code}>{name}</li>)}
        </ul>
        <img src = {countries[0].flags.svg} alt = {countries[0].flags.alt} width = "150px"></img>
        <h2>Weather in {countries[0].capital}</h2>
        temperature {temperature.value} Celcius<br />
        <img src = {temperature.icon}></img><br />
        wind {temperature.wind} m/s
      </div>
    )
  }
  return (
    <>
      {countries.map(country => 
        <div key = {country.cca3}>
          {country.name.common}
          <button onClick = {() => onCountryClick(country.cca3)}>show</button>
        </div>)}
    </>
  )
}
   
const App = () => {
  const [countries, setCountries] = useState([])
  const [query, setQuery] = useState('')

  const filteredCountries = countries
    .filter(country => country.name.common.toLowerCase().includes(query.toLowerCase()))

  useEffect(() => {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then(response => {
          setCountries(response.data)
        })
        .catch(error => {
          console.log(error)
        })
  }, [])

  const handleCountryClick = cca3 => {
    const selected = countries.find(country => country.cca3 === cca3)
    setQuery(selected.name.common)
  }
  return (
    <div>
      Find countries: <input value = {query} onChange = {e => setQuery(e.target.value)} /><br />
      <Countries countries = {filteredCountries} onCountryClick = {handleCountryClick} />
    </div>
  )
}

export default App
