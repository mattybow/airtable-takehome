import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  length: PropTypes.number,
  r: PropTypes.number,
  start: PropTypes.bool,
  changeHandler: PropTypes.func
};
const defaultProps = {
  start: false,
  changeHandler: () => {}
};

const arcPrefs = '0 1 0 0';
const { addEventListener: addListener, removeEventListener: removeListener } = document;

class BubbleHandle extends Component {
  render() {
    const {x, y, length, r, start, changeHandler} = this.props
    return (
      <path
        onMouseDown={(e) => {
          e.stopPropagation();
          const prevX = e.pageX;
          this.moveHandler = (e) => {
            const xDiff = e.pageX - prevX;
            this.props.dragHandler(xDiff);
          }
          addListener('mousemove', this.moveHandler);
          this.mouseUpHandler = (e) => {
            // const days = Math.round(this.state.xDiff/this.props.timescale);
            changeHandler();
            this.setState({ isMouseDown: false, xDiff: 0, yDiff: 0 });
            removeListener('mousemove', this.moveHandler);
            removeListener('mouseup', this.mouseUpHandler);
          }
          addListener('mouseup', this.mouseUpHandler);
        }}
        style={{
          cursor: 'col-resize'
        }}
        d={start
          ? `M${x} ${y} a${r} ${r} ${arcPrefs} ${r*2}z`  // left half
          : `M${x+length} ${y+r*2} a${r} ${r} ${arcPrefs} -${r*2} z` }  // right half
        fill="transparent" />
    );
  }
}

BubbleHandle.proptypes = propTypes;
BubbleHandle.defaultProps = defaultProps;

export default BubbleHandle;
