import React from 'react';
import { connect } from 'react-redux';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import { SocketContainerAction } from '../actions/actions';

class HistoryList extends React.Component {

  render() {
    const items = this.props.connections.map((item, index) => this.createListItem(item, index));
    return (
      <List>
        {items}
      </List>
    );
  }

  updatePlaygroundIndex(itemIndex) {
    this.props.dispatch({
      type: SocketContainerAction.UPDATE_INDEX,
      value: itemIndex
    });
  }

  createListItem(connectionItem, index) {
    const selectedClass = this.props.currentIndex === index ? 'selected-item' : '';
    return (
      <ListItem primaryText={connectionItem.name}
                onTouchTap={() => this.updatePlaygroundIndex(index)}
                className={selectedClass}/>
    )
  }
}

function mapStateToProps(state) {
  const stateObject = state.socketContainerReducer.toJS();
  return {
    connections: stateObject.connections,
    currentIndex: stateObject.index
  }
}

export default connect(mapStateToProps)(HistoryList);
