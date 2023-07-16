import { useState, useEffect } from 'react'
import countryService from '../services/countries'

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (name) {
      countryService
        .getCountry(name)
        .then(response => {
          console.log(response)
          setCountry( { ...response, found: true })
        })
        .catch((error) => {
          setCountry({ found: false })
        })
    }
  }, [name])

  return country
}