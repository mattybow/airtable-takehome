import React from 'react';
import PropTypes from 'prop-types';
import { addDaysToDate } from './utils';

const propTypes = {
  max: PropTypes.number.isRequired,
  every: PropTypes.number.isRequired,
  offset: PropTypes.number.isRequired,
  axis: PropTypes.oneOf(['x', 'y']),
  color: PropTypes.string,
  startDate: PropTypes.string.isRequired
};
const defaultProps = {
  max: 2000,
  every: 20,
  offset: 0,
  axis: 'y',
  color: 'rgba(0,0,0,0.2)'
};

const ANNOTATION_HEIGHT = 50;
const SPACING_FROM_LINE_END = 5;

const Grid = ({ height, max, every, offset, axis, color, startDate }) => {
  const gridLines = [];
  const annotations = [];
  const lim = Math.round(max/every);
  const yMax = height - ANNOTATION_HEIGHT;

  for(let i=-lim; i < lim*2; i++){
    const v = i*every;
    if(axis === 'x'){
      gridLines.push(<line key={i} x1="0" x2="1000" y1={v} y2={v} stroke={color} strokeWidth="1"/>);
    } else {
      gridLines.push(<line key={i} y1="0" y2={yMax} x1={v} x2={v} stroke={color} strokeWidth="1"/>);
      if (i % 2) {
        annotations.push(
          <text
            key={i}
            x={v}
            y={yMax + SPACING_FROM_LINE_END}
            textAnchor="end"
            alignmentBaseline="middle"
            transform={`rotate(-30,${v},${yMax + SPACING_FROM_LINE_END/2})`}
            stroke="slate"
            fontSize="12">
            {addDaysToDate(startDate, i)}
          </text>);
      }
    }
  }
  return <g>
    {gridLines}
    {annotations}
  </g>
};

Grid.proptypes = propTypes;
Grid.defaultProps = defaultProps;

export default Grid;
