import usePosition from './components/usePosition'
import CoffeeShops from './components/CoffeeShops'
import { useState, useEffect } from 'react'
import MyMap from './components/MyMap'

function App() {
  const { latitude, longitude, error } = usePosition()
  const [appState, setAppState] = useState({
    isLoading: false,
    coffeeShops: null,
    coffeeShopsFetchError: null
  })

  useEffect(() => {
    setAppState({ isLoading: true })
    fetch('https://blue-bottle-api-test.herokuapp.com/v1/tokens', { method: 'POST' })
      .then((response) => response.json())
      .then((jsonData) => {
        fetch('https://blue-bottle-api-test.herokuapp.com/v1/coffee_shops?token=' + jsonData.token)
          .then((response) => {
            switch (response.status) {
              case 200:
                response.json()
                  .then((jsonData) => setAppState({ isLoading: false, coffeeShops: jsonData }))
                break
              default:
                setAppState({
                  isLoading: false,
                  coffeeShopsFetchError: 'Could not fetch shop locations ' +
                    response.status + ': ' + response.statusText
                })
            }
          })
      })
  }, [setAppState])

  return (
    <div>
      <code>
        latitude: {latitude}<br />
        longitude: {longitude}<br />
        error: {error}
      </code>

      <CoffeeShops isLoading={appState.isLoading}
        shops={appState.coffeeShops}
        error={appState.coffeeShopsFetchError} />

      <MyMap shops={appState.coffeeShops} />
    </div>
  )
}

export default App
