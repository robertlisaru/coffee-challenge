const CoffeeShopsText = ({ coffeeShopsState }) => {
    const { isLoading, coffeeShops, fetchError } = coffeeShopsState
    if (isLoading) return <p>Fetching coffee shop list</p>
    if (fetchError) return <p>{fetchError}</p>
    if (!coffeeShops || coffeeShops.length === 0) return <p>No shops</p>
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

export default CoffeeShopsText