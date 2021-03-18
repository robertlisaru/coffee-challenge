import MyMap from './components/MyMap'
import UserLocationText from './components/UserLocationText'
import CoffeeShopsText from './components/CoffeeShopsText'
import useLocation from './hooks/useLocation'
import useCoffeeShops from './hooks/useCoffeeShops'
import React from 'react'

function App() {
  const userLocation = useLocation()
  const coffeeShops = useCoffeeShops()

  return (
    <div>
      <MyMap
        shops={coffeeShops}
        userLocation={userLocation}
      />
      <UserLocationText userLocation={userLocation} />
      <CoffeeShopsText coffeeShops={coffeeShops} />
    </div>
  )
}

export default App
