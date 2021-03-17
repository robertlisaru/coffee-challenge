const CoffeeShopsText = ({ coffeeShopsState }) => {
    const { isLoading, coffeeShops, fetchError } = coffeeShopsState
    if (isLoading) return CoffeeShopsLoadingMessage()
    if (fetchError) return CoffeeShopsErrorMessage(fetchError)
    if (!coffeeShops || coffeeShops.length === 0) return CoffeeShopsEmptyListMessage()
    return (
        <ul>
            <h2>Coffee Shops</h2>
            {coffeeShops.map((shop) =>
                <li key={shop.id}>
                    {shop.name}<br />
                    {shop.x}<br />
                    {shop.y}<br />
                </li>
            )}
        </ul>
    )
}

const CoffeeShopsErrorMessage = (fetchError) => {
    return <p>Could not fetch shop locations. {fetchError.code} {fetchError.text}</p>
}

const CoffeeShopsEmptyListMessage = () => {
    return <p>No shops</p>
}

const CoffeeShopsLoadingMessage = () => {
    return <p>Fetching coffee shop list</p>
}

export default CoffeeShopsText
