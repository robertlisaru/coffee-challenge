import { Map, Marker, Overlay } from 'pigeon-maps'
import Tooltip from './Tooltip'
import { useState } from 'react'
const haversine = require('haversine')

const osmProvider = (x, y, z) => {
    const s = String.fromCharCode(97 + ((x + y + z) % 3))
    return `https://${s}.tile.openstreetmap.org/${z}/${x}/${y}.png`
}

const MyMap = ({ shops, userLatitude, userLongitude }) => {
    const [shopTooltipsVisibility, setShopTooltipsVisibility] = useState([])
    const [userTooltipVisibility, setUserTooltipVisibility] = useState(false)

    const onShopMarkerClick = ({ payload }) => {
        const index = payload
        let arrayCopy = [...shopTooltipsVisibility]
        arrayCopy[index] = !arrayCopy[index]
        setShopTooltipsVisibility(arrayCopy)
    }

    const createShopMarkers = (shops) =>
        shops ? shops.map((shop) =>
            <Marker
                key={shop.id}
                anchor={[parseFloat(shop.x), parseFloat(shop.y)]}
                color='black'
                payload={shop.id}
                onClick={onShopMarkerClick}
            />
        ) : null

    const createShopTooltips = (shops) =>
        shops ? shops.map((shop) =>
            <Overlay key={shop.id} anchor={[parseFloat(shop.x), parseFloat(shop.y)]}>
                <Tooltip
                    isVisible={shopTooltipsVisibility[shop.id]}
                    name={shop.name}
                    distance={
                        Math.round(
                            haversine({ latitude: userLatitude, longitude: userLongitude },
                                { latitude: parseFloat(shop.x), longitude: parseFloat(shop.y) }
                            ) * 10) / 10 + ' km'
                    } />
            </Overlay>
        ) : null

    const createUserMarker = (userLatitude, userLongitude) =>
        (userLatitude && userLongitude) ?
            <Marker
                anchor={[userLatitude, userLongitude]}
                color='red'
                payload={'user'}
                onClick={() => {
                    setUserTooltipVisibility(!userTooltipVisibility)
                }}
            />
            : null

    const createUserTooltip = (userLatitude, userLongitude) =>
        (userLatitude && userLongitude) ?
            <Overlay anchor={[userLatitude, userLongitude]}>
                <Tooltip
                    isVisible={userTooltipVisibility}
                    name={'Your location'}
                    distance={null} />
            </Overlay>
            : null

    return <Map
        provider={osmProvider}
        defaultCenter={[45.795, 24.147]}
        defaultZoom={4}
        width={600}
        height={400}>

        {createShopMarkers(shops)}
        {createShopTooltips(shops)}
        {createUserMarker(userLatitude, userLongitude)}
        {createUserTooltip(userLatitude, userLongitude)}
    </Map >
}

export default MyMap