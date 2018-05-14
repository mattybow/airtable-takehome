import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  r: PropTypes.number.isRequired,
  length: PropTypes.number,
  color: PropTypes.string,
  clickHandler: PropTypes.func,
};
const defaultProps = {
  length: 0,
  color: 'grey',
  clickHandler: () => {},
  updateHandler: () => {},
};

const arcPrefs = '0 1 0 0';

class Bubble extends Component {
  constructor(props){
    super(props);
    this.state = {
      isDragging: false
    }
  }
  render() {
    const { x, y, r, length, color, clickHandler } = this.props;
    return (
      <path
        onClick={clickHandler}
        d={`M${x} ${y} a${r} ${r} ${arcPrefs} ${r*2} h${length} a${r} ${r} ${arcPrefs} -${r*2} z`}
        fill={color} />
    );
  }
}

Bubble.proptypes = propTypes;
Bubble.defaultProps = defaultProps;

export default Bubble;
