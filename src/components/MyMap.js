import { Map, Marker } from 'pigeon-maps'

const osmProvider = (x, y, z) => {
    const s = String.fromCharCode(97 + ((x + y + z) % 3))
    return `https://${s}.tile.openstreetmap.org/${z}/${x}/${y}.png`
}

const MyMap = ({ shops, userLatitude, userLongitude }) => {
    return <Map provider={osmProvider}
        defaultCenter={[45.795, 24.147]}
        defaultZoom={4}
        width={600}
        height={400}>
        {shops ? shops.map((shop) =>
            <Marker
                key={shop.id}
                anchor={[parseFloat(shop.x), parseFloat(shop.y)]}
                color='black'
                payload={shop.id}
                onClick={({ event, anchor, payload }) => {
                    console.log('Clicked marker nr: ', payload)
                }}
            />
        ) : null}
        {(userLatitude && userLongitude) ? <Marker
            anchor={[userLatitude, userLongitude]}
            color='red'
            payload={'user'}
            onClick={({ event, anchor, payload }) => {
                console.log('Clicked user')
            }}
        /> : null}
    </Map >
}

export default MyMap
