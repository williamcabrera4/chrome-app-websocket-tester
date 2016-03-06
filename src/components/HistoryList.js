import React from 'react';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';

class HistoryList extends React.Component {

  render() {
    return (
      <List>
        <ListItem primaryText="Connection 1"/>
        <ListItem primaryText="Connection 2"/>
        <ListItem primaryText="Connection 3"/>
        <ListItem primaryText="Connection 4"/>
      </List>
    );
  }
}

HistoryList.defaultProps = {};

export default HistoryList;
