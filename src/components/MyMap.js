import { Map, Marker, Overlay } from 'pigeon-maps'
import Tooltip from './Tooltip'
import { useState } from 'react'
const haversine = require('haversine')

const osmProvider = (x, y, z) => {
    const s = String.fromCharCode(97 + ((x + y + z) % 3))
    return `https://${s}.tile.openstreetmap.org/${z}/${x}/${y}.png`
}

const MyMap = ({ shops, userLatitude, userLongitude }) => {
    const [tooltipsState, setTooltipsState] = useState([])
    const [userTooltipVisibility, setUserTooltipVisibility] = useState(false)

    const onMarkerClick = ({ event, anchor, payload }) => {
        const index = payload;
        let arrayCopy = [...tooltipsState]
        arrayCopy[index] = !arrayCopy[index]
        setTooltipsState(arrayCopy)
    }

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
                onClick={onMarkerClick}
            />

        ) : null}

        {shops ? shops.map((shop) =>
            <Overlay key={shop.id} anchor={[parseFloat(shop.x), parseFloat(shop.y)]}>
                <Tooltip
                    isVisible={tooltipsState[shop.id]}
                    name={shop.name}
                    distance={
                        Math.round(
                            haversine({ latitude: userLatitude, longitude: userLongitude },
                                { latitude: parseFloat(shop.x), longitude: parseFloat(shop.y) }
                            ) * 10) / 10 + ' km'
                    } />
            </Overlay>

        ) : null}

        {(userLatitude && userLongitude) ?
            <Marker
                anchor={[userLatitude, userLongitude]}
                color='red'
                payload={'user'}
                onClick={({ event, anchor, payload }) => {
                    setUserTooltipVisibility(!userTooltipVisibility)
                }}
            />
            : null}

        {(userLatitude && userLongitude) ?
            <Overlay anchor={[userLatitude, userLongitude]}>
                <Tooltip
                    isVisible={userTooltipVisibility}
                    name={'Your location'}
                    distance={null} />
            </Overlay>
            : null}
    </Map >
}

export default MyMap
