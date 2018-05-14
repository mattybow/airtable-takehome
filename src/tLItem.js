import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Bubble from './bubble';
import SvgText from './svgText';
import Handle from './bubbleHandle';
import LeftPointer from './leftPointer';
import RightPointer from './rightPointer';
import { addDaysToDate, diffDate } from './utils';

const propTypes = {
  bubbleProps: PropTypes.object.isRequired,
  textProps: PropTypes.object.isRequired,
  bubbleColor: PropTypes.string,
  timescale: PropTypes.number.isRequired,
  item: PropTypes.object.isRequired,
  onUpdate: PropTypes.func
};
const defaultProps = {
  bubbleColor: 'black',
};

const { addEventListener: addListener, removeEventListener: removeListener } = document;

class TLItem extends Component {
  constructor(props){
    super(props);
    this.state = {
      isMouseDown: false,
      xDiff: 0,
      yDiff: 0,
      startDiff: 0,
      lenDiff:0,
    }
  }
  render() {
    const { isMouseDown, xDiff, yDiff, lenDiff, startDiff } = this.state;
    const { bubbleProps: bub, textProps: txt, bubbleColor, timescale, item, onUpdate } = this.props;
    return (
      <g
        onMouseDown={(e) => {
          e.stopPropagation();
          this.setState({ isMouseDown: true });
          const startX = e.pageX
          const startY = e.pageY;

          // set handler for recording item drag
          this.moveHandler = (e) => {
            const xDiff = e.pageX - startX;
            const yDiff = e.pageY - startY;
            this.setState({ xDiff, yDiff });
          }
          addListener('mousemove', this.moveHandler);

          // set handler for removing listeners and updating state
          this.mouseUpHandler = (e) => {
            e.stopPropagation();
            const days = Math.round(this.state.xDiff/this.props.timescale);
            if(days){
              onUpdate({
                ...item,
                start: addDaysToDate(item.start, days),
                end: addDaysToDate(item.end, days)
              });
            }
            this.setState({ isMouseDown: false, xDiff: 0, yDiff: 0 });
            removeListener('mousemove', this.moveHandler);
            removeListener('mouseup', this.mouseUpHandler);
          }
          addListener('mouseup', this.mouseUpHandler);
        }}
        style={{
          cursor: isMouseDown ? '-webkit-grabbing' : '-webkit-grab'
        }}>
        <g opacity={isMouseDown ? .5 : 1}>
          <Bubble
            {...bub}
            x={bub.x + startDiff}
            length={Math.max(0, bub.length + lenDiff)}
            color={bubbleColor}/>
          <SvgText
            {...txt}
            x={txt.x + startDiff}
          />
          <Handle
            {...bub}
            start
            dragHandler={diff => {
              this.setState({
                startDiff: diff < 0 ? diff : Math.min(bub.length, diff),
                lenDiff: diff < 0 ? -diff : Math.max(-bub.length, -diff)
              });
            }}
            changeHandler={() => {
              const days = Math.round(this.state.startDiff/this.props.timescale);
              if(days){
                onUpdate({
                  ...item,
                  start: addDaysToDate(item.start, days)
                });
              }
              this.setState({
                startDiff: 0,
                lenDiff: 0,
              });

            }}/>
          <Handle
            {...bub}
            end
            dragHandler={diff => {
              this.setState({ lenDiff: Math.max(-bub.length, diff) });
            }}
            changeHandler={() => {
              const days = Math.round(this.state.lenDiff/this.props.timescale);
              if(days){
                const newDuration = diffDate(item.start, item.end) + days;
                onUpdate({
                  ...item,
                  end: addDaysToDate(item.start, newDuration)
                });
              }
              this.setState({ lenDiff: 0 });
            }}/>
        </g>
        {isMouseDown && (
          <g
            transform="matrix(1,0,0,1,0,2)">
            <Bubble
              {...bub}
              x={bub.x + xDiff}
              y={bub.y + yDiff}
              color={bubbleColor}/>
            <SvgText
              {...txt}
              x={txt.x + xDiff}
              y={txt.y + yDiff}
            />
            <LeftPointer
              x={txt.x + xDiff - 10}
              y={txt.y - 25 + yDiff - 4}
              h={20}
              w={87}
              fill="rgba(0,0,0,.4)"
              value={addDaysToDate(item.start, Math.round(xDiff/timescale))}
              fontSize={14}
              color="white" />

            {item.end !== item.start && (
              <RightPointer
                x={txt.x + bub.length - 90 + xDiff + 10}
                y={txt.y + 25 + yDiff - 4}
                h={20}
                w={87}
                fill="rgba(0,0,0,.4)"
                value={addDaysToDate(item.end, Math.round(xDiff/timescale))}
                fontSize={14}
                color="white"
                />
            )}
          </g>
        )}
      </g>
    );
  }
}

TLItem.proptypes = propTypes;
TLItem.defaultProps = defaultProps;

export default TLItem;
