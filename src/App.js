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

  useEffect(() => {
    const geo = navigator.geolocation
    let watcher = null
    if (!geo)
      setUserLocationState({ error: 'Geolocation is not supported' })
    else {
      setUserLocationState({ isLoading: true })
      watcher = geo.watchPosition(onUserLocationChange, onUserLocationError)
    }

    fetchCoffeeShopsList()

    return () => geo.clearWatch(watcher)
  }, [])

  const fetchCoffeeShopsList = async () => {
    setCoffeeShopsState({ isLoading: true })
    const tokenResponse = await fetch(
      'https://blue-bottle-api-test.herokuapp.com/v1/tokens',
      { method: 'POST' }
    )
    const tokenJson = await tokenResponse.json()
    const coffeeShopsResponse = await fetch(
      `https://blue-bottle-api-test.herokuapp.com/v1/coffee_shops?token=${tokenJson.token}`
    )
    switch (coffeeShopsResponse.status) {
      case 200:
        const coffeeShopsJson = await coffeeShopsResponse.json()
        setCoffeeShopsState({ isLoading: false, coffeeShops: coffeeShopsJson })
        break
      default:
        setCoffeeShopsState({
          isLoading: false,
          fetchError: {
            code: coffeeShopsResponse.status,
            text: coffeeShopsResponse.statusText
          }
        })
    }
  }

  const onUserLocationChange = ({ coords }) =>
    setUserLocationState({
      latitude: coords.latitude,
      longitude: coords.longitude,
    })

  const onUserLocationError = (error) =>
    setUserLocationState({ error: error.message })

  return (
    <div>
      <MyMap
        shops={coffeeShopsState.coffeeShops}
        userLatitude={userLocationState.latitude}
        userLongitude={userLocationState.longitude}
      />
      <UserLocationText userLocationState={userLocationState} />
      <CoffeeShopsText coffeeShopsState={coffeeShopsState} />
    </div>
  )
}

export default App
