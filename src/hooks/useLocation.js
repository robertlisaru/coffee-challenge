import { useState, useEffect } from 'react'

const useLocation = () => {
    const [userLocationState, setUserLocationState] = useState({
        latitude: null,
        longitude: null,
        isLoading: false,
        error: null
    })

    const onUserLocationChange = ({ coords }) =>
        setUserLocationState({
            latitude: coords.latitude,
            longitude: coords.longitude,
        })

    const onUserLocationError = (error) =>
        setUserLocationState({ error: error.message })

    useEffect(() => {
        const geo = navigator.geolocation
        let watcher = null
        if (!geo)
            setUserLocationState({ error: 'Geolocation is not supported' })
        else {
            setUserLocationState({ isLoading: true })
            watcher = geo.watchPosition(onUserLocationChange, onUserLocationError)
        }

        return () => geo.clearWatch(watcher)
    }, [])

    return userLocationState
}

export default useLocation
