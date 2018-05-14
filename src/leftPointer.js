import React from 'react';
import PropTypes from 'prop-types';
import SvgText from './svgText';

const propTypes = {
  fill: PropTypes.string,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  h: PropTypes.number.isRequired,
  w: PropTypes.number.isRequired,
  value: PropTypes.string,
  fontSize: PropTypes.number,
  color: PropTypes.string
};
const defaultProps = {
  value: '',
  fontSize: 12,
  color: 'white'
};

const LeftPointer = ({ fill, x, y, h, w, value, fontSize, color }) => {
  const halfH = h/2;
  const r = 4;
  const sideH = w - halfH - r;
  const rUArc = `a ${r} ${r} 0 0 1 ${r} ${r}`;
  const rLArc = `a ${r} ${r} 0 0 1 ${-r} ${r}`;
  return (
    <g>
      <path
        fill={fill}
        d={`M${x} ${y+halfH} l${halfH} ${-halfH} h ${sideH} ${rUArc} v ${h-r*2} ${rLArc} h ${-sideH} z`}/>
      {value && (
        <SvgText
          value={value}
          size={fontSize}
          fill={color}
          x={x + halfH}
          y={y + fontSize/3}
        />
      )}
    </g>
  )
};

LeftPointer.proptypes = propTypes;
LeftPointer.defaultProps = defaultProps;

export default LeftPointer;
