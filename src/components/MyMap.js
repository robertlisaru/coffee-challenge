import { Map, Marker, Overlay } from 'pigeon-maps'
import Tooltip from './Tooltip'
import React from 'react'
const haversine = require('haversine')

class MyMap extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            shopTooltipsVisibility: [],
            userTooltipVisibility: false
        }
        this.toggleTooltipVisibility = this.toggleTooltipVisibility.bind(this);
    }

    render() {
        const { shops, userLatitude, userLongitude } = this.props
        return (
            <Map
                provider={this.osmProvider}
                defaultCenter={[45.795, 24.147]}
                defaultZoom={4}
                width={600}
                height={400}>

                {this.createShopMarkers(shops)}
                {this.createShopTooltips(shops)}
                {this.createUserMarker(userLatitude, userLongitude)}
                {this.createUserTooltip(userLatitude, userLongitude)}

            </Map >
        )
    }

    toggleTooltipVisibility({ payload }) {
        const index = payload
        let newArray = [...this.state.shopTooltipsVisibility]
        newArray[index] = !newArray[index]
        this.setState({ shopTooltipsVisibility: newArray })
    }

    createShopMarkers(shops) {
        return shops ? shops.map((shop) =>
            <Marker
                key={shop.id}
                anchor={[parseFloat(shop.x), parseFloat(shop.y)]}
                color='black'
                payload={shop.id}
                onClick={this.toggleTooltipVisibility}
            />
        ) : null
    }

    createShopTooltips(shops) {
        return shops ? shops.map((shop) =>
            <Overlay key={shop.id} anchor={[parseFloat(shop.x), parseFloat(shop.y)]}>
                <Tooltip
                    isVisible={this.state.shopTooltipsVisibility[shop.id]}
                    name={shop.name}
                    distance={this.computeDistanceFromUserTo(
                        { latitude: shop.x, longitude: shop.y }) + ' km'} />
            </Overlay>
        ) : null
    }

    createUserMarker(userLatitude, userLongitude) {
        return (userLatitude && userLongitude) ?
            <Marker
                anchor={[userLatitude, userLongitude]}
                color='red'
                payload={'user'}
                onClick={() => {
                    this.setState(state => ({ userTooltipVisibility: !state.userTooltipVisibility }))
                }}
            />
            : null
    }

    createUserTooltip(userLatitude, userLongitude) {
        return (userLatitude && userLongitude) ?
            <Overlay anchor={[userLatitude, userLongitude]}>
                <Tooltip
                    isVisible={this.state.userTooltipVisibility}
                    name={'Your location'}
                    distance={null} />
            </Overlay>
            : null
    }

    computeDistanceFromUserTo({ latitude, longitude }) {
        return Math.round(
            haversine(
                {
                    latitude: this.props.userLatitude,
                    longitude: this.props.userLongitude
                },
                {
                    latitude: latitude,
                    longitude: longitude
                }
            ) * 10) / 10
    }

    osmProvider(x, y, z) {
        const s = String.fromCharCode(97 + ((x + y + z) % 3))
        return `https://${s}.tile.openstreetmap.org/${z}/${x}/${y}.png`
    }
}

export default MyMap
