import MyMap from './components/MyMap'
import UserLocationText from './components/UserLocationText'
import CoffeeShopsText from './components/CoffeeShopsText'
import useLocation from './hooks/useLocation'
import useCoffeeShops from './hooks/useCoffeeShops'

function App() {
  const userLocationState = useLocation()
  const coffeeShopsState = useCoffeeShops()

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
