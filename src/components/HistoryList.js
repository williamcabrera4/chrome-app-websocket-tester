import React from 'react';
import PropTypes from 'prop-types';
import { List, ListItem } from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';
import AddIcon from 'material-ui/svg-icons/content/add-box';
import ArrowIcon from 'material-ui/svg-icons/action/compare-arrows';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import { ConnectionStatus } from '../constant/Constants';
import { SocketContainerAction } from '../actions/ActionsType';

class HistoryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      connectionStatusDialog: false,
      addConnectionDialog: false,
      connectionErrorMessage: '',
    };
  }

  handleStatusDialogOpen() {
    this.setState({ connectionStatusDialog: true });
  }

  handleStatusDialogClose() {
    this.setState({ connectionStatusDialog: false });
  }

  handleAddConnectionOpen() {
    this.setState({
      addConnectionDialog: true,
      connectionErrorMessage: '',
    });
  }

  handleAddConnectionClose() {
    this.setState({ addConnectionDialog: false });
  }

  addConnection() {
    const connectionName = this.connectionName.input.value;
    if (connectionName === '') {
      this.setState({ connectionErrorMessage: 'This field is required' });
      return;
    }
    this.props.dispatch({
      type: SocketContainerAction.ADD_CONNECTION,
      value: connectionName,
    });
    this.handleAddConnectionClose();
  }

  newConnectionTextListener(event) {
    if (event.keyCode === 13) {
      this.addConnection();
    }
  }

  updatePlaygroundIndex(itemIndex) {
    if (this.props.status === ConnectionStatus.CONNECTED) {
      this.handleStatusDialogOpen();
      return;
    }
    this.props.dispatch({
      type: SocketContainerAction.UPDATE_INDEX,
      value: itemIndex,
    });
  }

  createListItem(connectionItem, index) {
    const selectedClass = this.props.currentIndex === index ? 'selected-item' : '';
    return (
      <ListItem
        key={index}
        leftIcon={<ArrowIcon />}
        primaryText={connectionItem.name}
        onTouchTap={() => this.updatePlaygroundIndex(index)}
        className={selectedClass}
      />
    );
  }

  render() {
    const containerStyle = { height: this.props.height };
    const items = this.props.connections.map((item, index) => this.createListItem(item, index));
    const statusActions = [
      <FlatButton
        label="Got it!"
        primary
        onTouchTap={() => this.handleStatusDialogClose()}
      />,
    ];
    const addConnectionActions = [
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={() => this.handleAddConnectionClose()}
      />,
      <FlatButton
        label="Add Connection"
        primary
        onTouchTap={() => this.addConnection()}
      />,
    ];
    return (
      <List style={containerStyle} className="full-height">
        <ListItem
          primaryText="Add Connection"
          leftIcon={<AddIcon />}
          className="menu-button-item"
          onTouchTap={() => this.handleAddConnectionOpen()}
        />
        {items}
        <Dialog
          contentStyle={{ width: '350px' }}
          title="Active socket connection"
          modal={false}
          actions={statusActions}
          open={this.state.connectionStatusDialog}
          onRequestClose={() => this.handleStatusDialogClose()}
        >
          Please close the current connection first.
        </Dialog>
        <Dialog
          contentStyle={{ width: '300px' }}
          title="Add Connection"
          modal={false}
          actions={addConnectionActions}
          open={this.state.addConnectionDialog}
          onRequestClose={() => this.handleAddConnectionClose()}
        >
          <TextField
            onKeyUp={event => this.newConnectionTextListener(event)}
            ref={(input) => { this.connectionName = input; }}
            hint="Connection Name"
            floatingLabelText="Connection Name"
            errorText={this.state.connectionErrorMessage}
          />
        </Dialog>
      </List>
    );
  }
}

HistoryList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currentIndex: PropTypes.number.isRequired,
  connections: PropTypes.array.isRequired,
  status: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
};

export default HistoryList;
