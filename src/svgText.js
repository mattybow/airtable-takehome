import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  value: PropTypes.string
};
const defaultProps = {
  value: ''
};

const SvgText = ({ x, y, size, value, fill }) => (
  <text
    textAnchor="start"
    dominantBaseline="hanging"
    x={x}
    y={y}
    fill={fill}
    fontSize={size}>{value}</text>
);

SvgText.proptypes = propTypes;
SvgText.defaultProps = defaultProps;

export default SvgText;
