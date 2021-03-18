import { useState, useEffect } from 'react'

const useCoffeeShops = () => {
    const [coffeeShopsState, setCoffeeShopsState] = useState({
        isLoading: false,
        coffeeShops: null,
        fetchError: null
    })

    const fetchCoffeeShops = async () => {
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

    useEffect(() => {
        fetchCoffeeShops()
    }, [])

    return coffeeShopsState
}

export default useCoffeeShops
