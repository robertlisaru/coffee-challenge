const UserLocationText = ({ userLocationState }) => {
    const { latitude, longitude, isLoading, error } = userLocationState
    if (isLoading) return <div>Locating...</div>
    if (error) return <div>Error: {error}</div>
    return (
        <div>
            Your location: {latitude}, {longitude}
        </div>
    )
}

export default UserLocationText