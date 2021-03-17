import { useState, useEffect } from 'react'
import MyMap from './components/MyMap'
import UserLocationText from './components/UserLocationText'
import CoffeeShopsText from './components/CoffeeShopsText'

function App() {
  const [userLocationState, setUserLocationState] = useState({
    latitude: null,
    longitude: null,
    isLoading: false,
    error: null
  })

  const [coffeeShopsState, setCoffeeShopsState] = useState({
    isLoading: false,
    coffeeShops: null,
    fetchError: null
  })

  const onUserLocationChange = ({ coords }) =>
    setUserLocationState({
      latitude: coords.latitude,
      longitude: coords.longitude,
    })

  const onUserLocationError = (error) =>
    setUserLocationState({ error: error.message })

  useEffect(() => {
    const geo = navigator.geolocation
    let watcher = null
    if (!geo)
      setUserLocationState({ error: 'Geolocation is not supported' })
    else {
      setUserLocationState({ isLoading: true })
      watcher = geo.watchPosition(onUserLocationChange, onUserLocationError)
    }

    setCoffeeShopsState({ isLoading: true })
    fetch('https://blue-bottle-api-test.herokuapp.com/v1/tokens', { method: 'POST' })
      .then((response) => response.json())
      .then((jsonData) => {
        fetch(`https://blue-bottle-api-test.herokuapp.com/v1/coffee_shops?token=${jsonData.token}`)
          .then((response) => {
            switch (response.status) {
              case 200:
                response.json()
                  .then((jsonData) => setCoffeeShopsState({ isLoading: false, coffeeShops: jsonData }))
                break
              default:
                setCoffeeShopsState({
                  isLoading: false,
                  fetchError: `Could not fetch shop locations ${response.status} ${response.statusText}`
                })
            }
          })
      })
    return () => geo.clearWatch(watcher)
  }, [setCoffeeShopsState])

  return (
    <div>
      <MyMap
        shops={coffeeShopsState.coffeeShops}
        userLatitude={userLocationState.latitude}
        userLongitude={userLocationState.longitude}
      />

      <UserLocationText
        isLoading={userLocationState.isLoading}
        latitude={userLocationState.latitude}
        longitude={userLocationState.longitude}
        error={userLocationState.error}
      />

      <CoffeeShopsText
        isLoading={coffeeShopsState.isLoading}
        shops={coffeeShopsState.coffeeShops}
        error={coffeeShopsState.fetchError}
      />
    </div>
  )
}

export default App