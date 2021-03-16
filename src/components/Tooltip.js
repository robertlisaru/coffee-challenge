const Tooltip = ({ isVisible, name, distance }) => {
    return isVisible ?
        <div>
            <p>{name}</p>
            <p>{distance}</p>
        </div>
        : null
}

export default Tooltip
