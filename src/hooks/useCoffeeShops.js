import { useState, useEffect } from 'react'
import StatefulData from './../utils/StatefulData'

const useCoffeeShops = () => {
    const [coffeeShops, setCoffeeShops] = useState(new StatefulData())

    const fetchCoffeeShops = async () => {
        const tokenResponse = await fetch(
            'https://blue-bottle-api-test.herokuapp.com/v1/tokens',
            { method: 'POST' }
        )
        const tokenJson = await tokenResponse.json()
        const coffeeShopsResponse = await fetch(
            `https://blue-bottle-api-test.herokuapp.com/v1/coffee_shops?token=${tokenJson.token}`
        )
        const fetchedCoffeeShops = new StatefulData()
        switch (coffeeShopsResponse.status) {
            case 200:
                fetchedCoffeeShops.setData(await coffeeShopsResponse.json())
                break
            default:
                fetchedCoffeeShops.setError(
                    {
                        code: coffeeShopsResponse.status,
                        text: coffeeShopsResponse.statusText
                    })
        }
        setCoffeeShops(fetchedCoffeeShops)
    }

    useEffect(() => {
        fetchCoffeeShops()
    }, [])

    return coffeeShops
}

export default useCoffeeShops
