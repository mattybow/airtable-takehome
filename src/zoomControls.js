import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import SvgButton from './svgButton';

const propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  outHandler: PropTypes.func,
  inHandler: PropTypes.func
};
const defaultProps = {
  outHandler: () => {},
  inHandler: () => {}
};

const ZoomControls = ({ x, y, outHandler, inHandler }) => {
  const w = 30, h = 30, spacing = 5;
  const x2 = x + w + spacing;
  const lineWidth = 2;
  const iconWidth = 15;
  const commonProps = {
    stroke: '#000',
    fill: '#000',
    strokeWidth: '1',
    rx:.5,
    ry:.5
  };
  const minusProps = {
    width: iconWidth,
    height: lineWidth
  }

  return (
    <Fragment>
      <SvgButton x={x} y={y} w={w} h={h} clickHandler={outHandler}>
        <rect
          x={x + w/2 - iconWidth/2}
          y={y + h/2 - lineWidth/2}
          {...minusProps}
          {...commonProps}/>
      </SvgButton>
      <SvgButton x={x2} y={y} w={w} h={h} clickHandler={inHandler}>
        <rect
          x={x2 + w/2 - iconWidth/2}
          y={y + h/2 - lineWidth/2}
          {...minusProps}
          {...commonProps}/>
        <rect
          x={x2 + w/2 - lineWidth/2}
          y={y + h/2 - iconWidth/2}
          width={lineWidth}
          height={iconWidth}
          {...commonProps}/>
      </SvgButton>
    </Fragment>
  )
};

ZoomControls.proptypes = propTypes;
ZoomControls.defaultProps = defaultProps;

export default ZoomControls;
