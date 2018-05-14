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

const RightPointer = ({ fill, x, y, h, w, value, fontSize, color }) => {
  const halfH = h/2;
  const r = 3;
  const sideL = w - halfH - r;
  const lLArc = `a ${r} ${r} 0 0 0 ${r} ${r}`;
  const lUArc = `a ${r} ${r} 0 0 0 ${-r} ${r}`;
  return (
    <g>
      <path
        fill={fill}
        d={`M${x} ${y+halfH - r} v${halfH - r} ${lLArc} h${sideL} l${halfH} ${-halfH} l${-halfH} ${-halfH} h ${-sideL} ${lUArc} z`}/>
      {value && (
        <SvgText
          value={value}
          size={fontSize}
          fill={color}
          x={x + halfH/2}
          y={y + 2}
        />
      )}
    </g>
  )
};

RightPointer.proptypes = propTypes;
RightPointer.defaultProps = defaultProps;

export default RightPointer;
