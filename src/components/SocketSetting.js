import React from 'react';
import SelectField from 'material-ui/lib/select-field';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import MenuItem from 'material-ui/lib/menus/menu-item';
import { connect } from 'react-redux';
import { ConnectionType, ConnectionStatus } from '../constant/constant';
import { SocketContainerAction, SocketConnectionAction } from '../actions/actions';
import Helper from '../helpers/GlobalHelpers';
import Row from './Row';

class SocketSetting extends React.Component {

  handleSelectChange(event, index, value) {
    this.props.dispatch({
      type: SocketContainerAction.CHANGE_CONNECTION_TYPE,
      value: value
    });
  }

  handleHostChange(event) {
    this.props.dispatch({
      type: SocketContainerAction.CHANGE_HOST,
      value: event.target.value
    });
  }

  connectToWebSocket() {
    const webSocket = this.props.webSocket;
    if (this.props.status == ConnectionStatus.DISCONNECTED) {
      const host = this.props.parameters.host;
      const dispatch = this.props.dispatch;
      webSocket.connect(host, dispatch);
    }
    else {
      webSocket.close();
    }
  }

  render() {
    const connectionTypeValue = this.props.parameters.type;
    const hostValue = this.props.parameters.host;
    const disableChanges = this.props.status == ConnectionStatus.CONNECTED;
    const buttonLabel = this.props.status == ConnectionStatus.CONNECTED ? 'Disconnect' : 'Connect';
    return (
      <div>
        <Row>
          <h2 className="margin-bottom-0">Websocket Settings</h2>
        </Row>
        <Row className="relative-container">
          <SelectField
            disabled={disableChanges}
            value={connectionTypeValue}
            onChange={this.handleSelectChange.bind(this)}
            floatingLabelText="Connection Type">
            <MenuItem key={1} value={ConnectionType.ws} primaryText="Standard WS"/>
            <MenuItem key={2} value={ConnectionType.io} primaryText="Socket.IO"/>
          </SelectField>
          <TextField value={hostValue} className="margin-left-15" hint floatingLabelText="Location"
                     onChange={this.handleHostChange.bind(this)}
                     disabled={disableChanges}/>
          <RaisedButton className="margin-left-15 form-bottom-element" label={buttonLabel} primary={true}
                        onClick={this.connectToWebSocket.bind(this)}/>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const socketState = state.socketContainerReducer;
  const currentConnection = Helper.getCurrentConnection(socketState);
  return {
    parameters: currentConnection.parameters,
    status: currentConnection.status
  }
}

export default connect(mapStateToProps)(SocketSetting);
