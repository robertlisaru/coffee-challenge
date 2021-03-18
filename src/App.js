import { useState, useEffect } from 'react'
import MyMap from './components/MyMap'
import UserLocationText from './components/UserLocationText'
import CoffeeShopsText from './components/CoffeeShopsText'
import useLocation from './hooks/useLocation'

function App() {
  const userLocationState = useLocation()

  const [coffeeShopsState, setCoffeeShopsState] = useState({
    isLoading: false,
    coffeeShops: null,
    fetchError: null
  })

  useEffect(() => {
    fetchCoffeeShopsList()
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
