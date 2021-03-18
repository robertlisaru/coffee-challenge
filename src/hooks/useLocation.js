import { useState, useEffect } from 'react'
import StatefulData from '../utils/StatefulData'

const useLocation = () => {
    const [userLocation, setUserLocation] = useState(new StatefulData())

    const onUserLocationChange = ({ coords }) => {
        const newUserLocation = new StatefulData()
        newUserLocation.setData({
            latitude: coords.latitude,
            longitude: coords.longitude,
        })
        setUserLocation(newUserLocation)
    }

    const onUserLocationError = (error) => {
        const newUserLocation = new StatefulData()
        newUserLocation.setError(error.message)
        setUserLocation(newUserLocation)
    }

    useEffect(() => {
        const geo = navigator.geolocation
        let watcher = null
        if (!geo) {
            const newUserLocation = new StatefulData()
            newUserLocation.setError('Geolocation is not supported')
            setUserLocation(newUserLocation)
        }
        else {
            watcher = geo.watchPosition(onUserLocationChange, onUserLocationError)
        }

        return () => geo.clearWatch(watcher)
    }, [])

    return userLocation
}

export default useLocation
