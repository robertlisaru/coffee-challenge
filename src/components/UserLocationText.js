const UserLocationText = ({ userLocationState }) => {
    const { latitude, longitude, isLoading, error } = userLocationState
    if (isLoading) return LocationLoadingMessage()
    if (error) return LocationErrorMessage(error)
    return (
        <div>
            Your location: {latitude}, {longitude}
        </div>
    )
}

const LocationLoadingMessage = () => {
    return <div>Locating...</div>
}

const LocationErrorMessage = (error) => {
    return <div>Error: {error}</div>
}

export default UserLocationText