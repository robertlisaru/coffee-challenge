const CoffeeShopsText = ({ isLoading, shops, error }) => {
    if (isLoading) return <p>Fetching coffee shop list</p>
    if (error) return <p>{error}</p>
    if (!shops || shops.length === 0) return <p>No shops</p>
    return (
        <ul>
            <h2>Coffee Shops</h2>
            {shops.map((shop) => {
                return (
                    <li key={shop.id}>
                        {shop.name}<br />
                        {shop.x}<br />
                        {shop.y}<br />
                    </li>
                )
            })}
        </ul>
    )
}

export default CoffeeShopsText
