import './../style/tooltip.css'

const Tooltip = ({ isVisible, name, distance }) =>
    isVisible ?
        <div className={'shopTooltip'}>
            <p>{name}</p>
            <p>{distance}</p>
        </div>
        : null

export default Tooltip
