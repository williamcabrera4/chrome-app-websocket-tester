import React from 'react';
import { connect } from 'react-redux';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import RaisedButton from 'material-ui/lib/raised-button';
import FlatButton from 'material-ui/lib/flat-button';
import AddIcon from 'material-ui/lib/svg-icons/content/add-box';
import ArrowIcon from 'material-ui/lib/svg-icons/action/compare-arrows';
import Dialog from 'material-ui/lib/dialog';
import TextField from 'material-ui/lib/text-field';
import Helper from '../helpers/GlobalHelpers';
import { ConnectionStatus } from '../constant/constant';
import { SocketContainerAction } from '../actions/actions';

class HistoryList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      connectionStatusDialog: false,
      addConnectionDialog: false
    };
  }

  handleStatusDialogOpen() {
    this.setState({connectionStatusDialog: true});
  };

  handleStatusDialogClose() {
    this.setState({connectionStatusDialog: false});
  };

  handleAddConnectionOpen() {
    this.setState({addConnectionDialog: true});
  };

  handleAddConnectionClose() {
    this.setState({addConnectionDialog: false});
  };

  addConnection() {
    const connectionName = this.refs.connectionName.input.value;
    this.props.dispatch({
      type: SocketContainerAction.ADD_CONNECTION,
      value: connectionName
    });
    this.handleAddConnectionClose();
  }

  render() {
    const containerStyle = {height: this.props.height};
    const items = this.props.connections.map((item, index) => this.createListItem(item, index));
    const statusActions = [
      <FlatButton
        label="Got it!"
        primary={true}
        onTouchTap={this.handleStatusDialogClose.bind(this)}
      />
    ];
    const addConnectionActions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleAddConnectionClose.bind(this)}
      />,
      <FlatButton
        label="Add Connection"
        primary={true}
        onTouchTap={this.addConnection.bind(this)}
      />
    ];
    return (
      <List style={containerStyle} className="full-height">
        <ListItem primaryText="Add Connection"
                  leftIcon={<AddIcon></AddIcon>}
                  className="menu-button-item"
                  onTouchTap={this.handleAddConnectionOpen.bind(this)}/>
        {items}

        <Dialog
          contentStyle={{width: '350px'}}
          title="Active socket connection"
          modal={false}
          actions={statusActions}
          open={this.state.connectionStatusDialog}
          onRequestClose={this.handleStatusDialogClose.bind(this)}>
          Please close the current connection first.
        </Dialog>
        <Dialog
          contentStyle={{width: '300px'}}
          title="Add Connection"
          modal={false}
          actions={addConnectionActions}
          open={this.state.addConnectionDialog}
          onRequestClose={this.handleAddConnectionClose.bind(this)}>
          <TextField ref="connectionName" hint floatingLabelText="Connection Name"/>
        </Dialog>
      </List>
    );
  }

  updatePlaygroundIndex(itemIndex) {
    if (this.props.status == ConnectionStatus.CONNECTED) {
      this.handleStatusDialogOpen();
      return;
    }
    this.props.dispatch({
      type: SocketContainerAction.UPDATE_INDEX,
      value: itemIndex
    });
  }

  createListItem(connectionItem, index) {
    const selectedClass = this.props.currentIndex === index ? 'selected-item' : '';
    return (
      <ListItem key={index}
                leftIcon={<ArrowIcon></ArrowIcon>}
                primaryText={connectionItem.name}
                onTouchTap={() => this.updatePlaygroundIndex(index)}
                className={selectedClass}/>
    )
  }
}

function mapStateToProps(state) {
  const stateObject = state.socketContainerReducer.toJS();
  const currentConnection = Helper.getCurrentConnection(state.socketContainerReducer);
  return {
    connections: stateObject.connections,
    currentIndex: stateObject.index,
    status: currentConnection.status
  }
}

export default connect(mapStateToProps)(HistoryList);
