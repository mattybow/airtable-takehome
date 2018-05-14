import React, { Component } from 'react';
import { diffDate } from './utils';
import Timeline from './timeline';
import timelineItems from './timelineItems';
import chroma from 'chroma-js';

const colors = chroma.scale(['#F1DFD6', '#C4E2EC', '#E4CBF3'])
    .mode('lch').correctLightness().colors(15);

function comparator(a, b){
  const startDiff = diffDate(b.start, a.start);
  const endDiff = diffDate(b.end, a.end);
  if(startDiff === 0){
    if(endDiff === 0){
      return a.name < b.name;
    }
    return endDiff;
  }
  return startDiff;
}


// this would be "connected" component if using something like redux
// state would be replaced by props injected from store
class TimelineContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      items: timelineItems.sort(comparator)
    }
  }

  // in redux, this would be in reducer code
  updateItem = (updateState) => {
    this.setState({
      items: this.state.items.map(item => item.id === updateState.id ? updateState : item).sort(comparator)
    });
  }

  render() {
    return (
      <Timeline
        options={{
          startDate: '2017-12-31'
        }}
        height={500}
        colors={colors}
        items={this.state.items}
        updateHandler={this.updateItem}/>
    );
  }
}

export default TimelineContainer;
