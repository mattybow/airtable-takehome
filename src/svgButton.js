import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  h: PropTypes.number.isRequired,
  w: PropTypes.number.isRequired,
  clickHandler: PropTypes.func
};
const defaultProps = {
  clickHandler: () => {}
};

const radius = 10;

const SvgButton = ({ x, y, w, h, clickHandler, children }) => {
  return (
    <g
      cursor="pointer"
      onClick={clickHandler}>
      <rect
        x={x}
        y={y}
        rx={radius}
        ry={radius}
        width={w}
        height={h}
        stroke="#E1DEE3"
        fill="#E1DEE3"
        strokeWidth="1"/>
      {children}
    </g>
  )
};

SvgButton.proptypes = propTypes;
SvgButton.defaultProps = defaultProps;

export default SvgButton;
