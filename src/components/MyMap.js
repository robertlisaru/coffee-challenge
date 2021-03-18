import { Map, Marker, Overlay } from 'pigeon-maps'
import Tooltip from './Tooltip'
import React from 'react'
import PropTypes from 'prop-types'
import StatefulData from './../utils/StatefulData'
import DataStates from '../utils/DataStates'
const haversine = require('haversine')

class MyMap extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            shopTooltipsVisibility: [],
            userTooltipVisibility: false
        }
        this.toggleTooltipVisibility = this.toggleTooltipVisibility.bind(this)
    }

    render() {
        const { shops, userLocation } = this.props
        return (
            <Map
                provider={this.osmProvider}
                defaultCenter={[45.795, 24.147]}
                defaultZoom={4}
                width={600}
                height={400}>

                {this.createShopMarkers(shops)}
                {this.createShopTooltips(shops)}
                {this.createUserMarker(userLocation)}
                {this.createUserTooltip(userLocation)}

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
        return shops.dataState == DataStates.AVAILABLE ? shops.data.map((shop) =>
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
        return shops.dataState == DataStates.AVAILABLE ? shops.data.map((shop) =>
            <Overlay key={shop.id} anchor={[parseFloat(shop.x), parseFloat(shop.y)]}>
                <Tooltip
                    isVisible={this.state.shopTooltipsVisibility[shop.id]}
                    name={shop.name}
                    distance={this.computeDistanceFromUserTo(
                        { latitude: shop.x, longitude: shop.y })} />
            </Overlay>
        ) : null
    }

    createUserMarker(userLocation) {
        return (userLocation.dataState == DataStates.AVAILABLE) ?
            <Marker
                anchor={[userLocation.data.latitude, userLocation.data.longitude]}
                color='red'
                payload={'user'}
                onClick={() => {
                    this.setState(state => ({ userTooltipVisibility: !state.userTooltipVisibility }))
                }}
            />
            : null
    }

    createUserTooltip(userLocation) {
        return (userLocation.dataState == DataStates.AVAILABLE) ?
            <Overlay anchor={[userLocation.data.latitude, userLocation.data.longitude]}>
                <Tooltip
                    isVisible={this.state.userTooltipVisibility}
                    name={'Your location'}
                    distance={null} />
            </Overlay>
            : null
    }

    computeDistanceFromUserTo({ latitude, longitude }) {
        return (this.props.userLocation.dataState == DataStates.AVAILABLE) ? Math.round(
            haversine(
                {
                    latitude: this.props.userLocation.data.latitude,
                    longitude: this.props.userLocation.data.longitude
                },
                {
                    latitude: latitude,
                    longitude: longitude
                }
            ) * 10) / 10 + ' km'
            : 'Locating...'
    }

    osmProvider(x, y, z) {
        const s = String.fromCharCode(97 + ((x + y + z) % 3))
        return `https://${s}.tile.openstreetmap.org/${z}/${x}/${y}.png`
    }
}

MyMap.propTypes = {
    shops: PropTypes.instanceOf(StatefulData),
    userLocation: PropTypes.instanceOf(StatefulData)
}

export default MyMap
