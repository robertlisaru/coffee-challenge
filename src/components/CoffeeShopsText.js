import DataStates from './../utils/DataStates'
import React from 'react'
import PropTypes from 'prop-types'
import StatefulData from './../utils/StatefulData'

const CoffeeShopsText = ({ coffeeShops }) => {
    switch (coffeeShops.dataState) {
        case DataStates.LOADING:
            return CoffeeShopsLoadingMessage()
        case DataStates.ERROR:
            return CoffeeShopsErrorMessage(coffeeShops.error)
        case DataStates.EMPTY:
            return CoffeeShopsEmptyListMessage()
        case DataStates.AVAILABLE:
            return (
                <ul>
                    <h2>Coffee Shops</h2>
                    {coffeeShops.data.map((shop) =>
                        <li key={shop.id}>
                            {shop.name}<br />
                            {shop.x}<br />
                            {shop.y}<br />
                        </li>
                    )}
                </ul>
            )
    }
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

CoffeeShopsText.propTypes = {
    coffeeShops: PropTypes.instanceOf(StatefulData)
}

export default CoffeeShopsText
