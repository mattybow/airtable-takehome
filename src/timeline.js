import React, { Component, Fragment } from 'react';
import Grid from './grid';
import PropTypes from 'prop-types';
import TLItems from './tLItems';
import ZoomControls from './zoomControls';
import { debounce } from './utils';

const propTypes = {
  items: PropTypes.array.isRequired,
  colors: PropTypes.array.isRequired,
  options: PropTypes.object.isRequired,
  height: PropTypes.number.isRequired,
  updateHandler: PropTypes.func.isRequired
};

const {
  addEventListener: addListener,
  removeEventListener: removeListener,
} = document;

const MAX_TIMESCALE = 100;
const MIN_TIMESCALE = 10;

class Timeline extends Component {
  constructor(props){
    super(props);
    this.state = {
      x: 0,
      y: 100,
      timescale: 50
    }
  }

  componentDidMount(){
    if(this.state.svgWidth === undefined){
      this.setWidth();
    }

    // TODO should debounce setWidth?
    window.addEventListener('resize', this.setWidth);
  }

  componentWillUnmount(){
    window.removeEventListener('resize', this.setWidth);
  }

  setWidth = () => {
    // console.log(this.svgRef.getBoundingClientRect().width)
    this.setState({
      svgWidth: this.svgRef.getBoundingClientRect().width
    });
  }

  render() {
    const { items, colors, options, height, updateHandler } = this.props;
    const { svgWidth, x, y, timescale } = this.state;
    return (
      <svg
        viewBox={`0 0 ${svgWidth || 0} ${height}`}
        width="100%"
        xmlns="http://www.w3.org/2000/svg" version="1.1"
        style={{
          cursor: 'move',
          'WebkitUserSelect': 'none'
        }}
        onMouseDown={(e) => {
          const coords = [e.pageX, e.pageY];
          this.moveHandler = (e) => {
            const xDiff = e.pageX - coords[0];
            const yDiff = e.pageY - coords[1];
            this.setState({ x: x + xDiff, y: y + yDiff });
          }
          addListener('mousemove', this.moveHandler);
        }}
        onMouseUp={() => {
          removeListener('mousemove', this.moveHandler);
        }}
        onMouseLeave={() => {
          removeListener('mousemove', this.moveHandler);
        }}
        ref={dref => this.svgRef = dref}>
        { svgWidth && (
          <Fragment>
            <g transform={`translate(${x})`}>
              <Grid
                axis="y"
                max={1500}
                height={height}
                every={timescale}
                offset={10}
                startDate={options.startDate}
                color="rgba(0,0,0,0.12)"
              />
            </g>
            <g transform={`translate(${x},${y})`}>
              <TLItems
                items={items}
                colors={colors}
                options={options}
                timescale={timescale}
                onUpdate={updateHandler}/>
            </g>
          </Fragment>
        )}
        <ZoomControls
          x={30}
          y={height - 100}
          inHandler={() => {
            const curScale = this.state.timescale;
            this.setState({timescale: Math.min(curScale + 10, MAX_TIMESCALE)});
          }}
          outHandler={() => {
            const curScale = this.state.timescale;
            this.setState({timescale: Math.max(curScale - 10, MIN_TIMESCALE)});
          }}
        />
      </svg>
    );
  }
}

Timeline.proptypes = propTypes;

export default Timeline;
