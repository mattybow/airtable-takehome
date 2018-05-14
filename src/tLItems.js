import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import TLItem from './tLItem';
import { diffDate } from './utils';

const propTypes = {
  items: PropTypes.array,
};
const defaultProps = {};

const SCALE = 1;
const RADIUS = 10 * SCALE;
const TEXT_TO_LEN = 5 * SCALE;
const ROW_SPACING = 15 * SCALE;
const TEXT_SIZE = 12 * SCALE;
const TEXT_SPACING_POST_BUBBLE = 2 * SCALE;
const TEXT_LEN_TO_ELLIPSIZE = 5;


// returns items with layout properties
function layoutItems(items, options){
  const minStart = options.startDate || items[0].start;
  const itemSlice = items.slice(0);
  const rows = new Map();
  return itemSlice.reduce((acc, item) => {
    let x = diffDate(minStart, item.start) * options.timescale;
    const y = findRowWithSpace(rows, x, item.start === item.end);
    const format = generateFormat(x, y, item, options);
    // update rows map
    rows.set(y, format.bounds);
    acc.push({ ...item, format });
    return acc;
  }, []);
}

function findRowWithSpace(rowMap, x){
  let yMax = 0;
  for(let [y, bounds] of rowMap){
    if(x > bounds[1]){
      return y;
    }
    yMax = bounds[3];
  }
  // if you can't place in existing row make a new one
  return yMax + ROW_SPACING;
}


function generateFormat(x, y, item, options = { textMaxLen: 10 }){
  const dateDiff = diffDate(item.start, item.end);
  const bubbleLength = Math.max(0, dateDiff * options.timescale - RADIUS*2);
  const initialTextLen = item.name.length * TEXT_TO_LEN;
  const isFitInBubble = initialTextLen <= bubbleLength;
  // should we ellipsize
  const charsOverMax = item.name.length - options.textMaxLen;
  const displayText = !isFitInBubble && charsOverMax < TEXT_LEN_TO_ELLIPSIZE && charsOverMax > 0
    ? item.name.substr(0, options.textMaxLen) + '...'
    : item.name;

  const text = {
    x: isFitInBubble || !bubbleLength ? x + RADIUS : x + RADIUS * 2,
    y: y + RADIUS/2,
    value: displayText,
    size: TEXT_SIZE
  };
  const bubble = {
    x: bubbleLength ? x + RADIUS : x,
    y,
    r: RADIUS,
    length: bubbleLength
  }

  if(!isFitInBubble){
    text.x += bubbleLength + TEXT_SPACING_POST_BUBBLE
  }

  return {
    bounds: [
      Math.min(x - RADIUS, bubble.x),
      Math.max(text.x + displayText.length * TEXT_TO_LEN, x + bubbleLength + RADIUS * 2),
      Math.min(text.y, bubble.y),
      y + RADIUS * 2
    ],
    text,
    bubble
  }
}

class TLItems extends PureComponent {
  render() {
    const { items, options, timescale, colors, onUpdate } = this.props;
    const itemsWithLayout = layoutItems(items, {...options, timescale});
    return (
      <g>
        {itemsWithLayout.map(({ format, ...item }, i) => {
          const { bubble: bubbleProps, text: textProps } = format;
          const intId = parseInt(item.id, 10);
          return (
            <TLItem
              bubbleProps={bubbleProps}
              bubbleColor={colors[(intId + intId*2) % colors.length]}
              textProps={textProps}
              key={item.id}
              timescale={timescale}
              onUpdate={onUpdate}
              item={item}/>
          )})}
      </g>
    );
  }
}

TLItems.proptypes = propTypes;
TLItems.defaultProps = defaultProps;

export default TLItems;
