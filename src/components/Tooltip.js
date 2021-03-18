import './../style/tooltip.css'
import React from 'react'
import PropTypes from 'prop-types'

const Tooltip = ({ isVisible, name, distance }) =>
    isVisible ?
        <div className={'shopTooltip'}>
            <p>{name}</p>
            <p>{distance}</p>
        </div>
        : null

Tooltip.propTypes = {
    isVisible: PropTypes.bool,
    name: PropTypes.string,
    distance: PropTypes.string
}

export default Tooltip
