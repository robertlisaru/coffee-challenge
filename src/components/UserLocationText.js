import React from 'react'
import PropTypes from 'prop-types'
import StatefulData from './../utils/StatefulData'
import DataStates from './../utils/DataStates'

const UserLocationText = ({ userLocation }) => {
    switch (userLocation.dataState) {
        case DataStates.LOADING:
            return LocationLoadingMessage()
        case DataStates.ERROR:
            return LocationErrorMessage(userLocation.error)
        case DataStates.AVAILABLE:
            return <div>
                Your location: {userLocation.data.latitude}, {userLocation.data.longitude}
            </div>
    }
}

const LocationLoadingMessage = () => {
    return <div>Locating...</div>
}

const LocationErrorMessage = (error) => {
    return <div>Error: {error}</div>
}

UserLocationText.propTypes = {
    userLocation: PropTypes.instanceOf(StatefulData)
}

export default UserLocationText
