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
import Column from './Column';

const textFieldStyle = {
  width: '100%',
  minWidth: '100px'
};

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

  handleChannelChange(event) {
    this.props.dispatch({
      type: SocketContainerAction.CHANGE_CHANNEL,
      value: event.target.value
    });
  }

  connectToWebSocket() {
    const webSocket = this.props.webSocket;
    if (this.props.status == ConnectionStatus.DISCONNECTED) {
      const host = this.props.parameters.host;
      const dispatch = this.props.dispatch;
      const channel = this.props.parameters.channel;
      webSocket.connect(host, dispatch, channel);
    }
    else {
      webSocket.close();
    }
  }

  generateChannelInput(disableChanges) {
    if (this.props.parameters.type != ConnectionType.io) {
      return;
    }
    const channelValue = this.props.parameters.channel;
    return (
      <Row >
        <Column xs={3}>
          <TextField value={channelValue} hint floatingLabelText="Channel"
                     onChange={this.handleChannelChange.bind(this)}
                     disabled={disableChanges}
                     style={textFieldStyle}/>
        </Column>
      </Row>
    )
  }

  render() {
    const connectionName = this.props.name;
    const connectionTypeValue = this.props.parameters.type;
    const hostValue = this.props.parameters.host;
    const disableChanges = this.props.status == ConnectionStatus.CONNECTED;
    const buttonLabel = this.props.status == ConnectionStatus.CONNECTED ? 'Disconnect' : 'Connect';
    const channelInput = this.generateChannelInput(disableChanges);

    return (
      <div>
        <Row>
          <h2 className="margin-bottom-0">
            Websocket Settings: <span className="highlight-title">{connectionName}</span>
          </h2>
        </Row>
        <Row className="relative-container">
          <Column xs={3}>
            <SelectField
              style={textFieldStyle}
              disabled={disableChanges}
              value={connectionTypeValue}
              onChange={this.handleSelectChange.bind(this)}
              floatingLabelText="Connection Type">
              <MenuItem key={1} value={ConnectionType.ws} primaryText="Standard WS"/>
              <MenuItem key={2} value={ConnectionType.io} primaryText="Socket.IO"/>
            </SelectField>
          </Column>
          <Column xs={6}>
            <TextField value={hostValue} hint floatingLabelText="Location"
                       onChange={this.handleHostChange.bind(this)}
                       disabled={disableChanges}
                       style={textFieldStyle}/>
          </Column>
          <Column xs={2}>
            <RaisedButton className="form-bottom-element" label={buttonLabel} primary={true}
                          onClick={this.connectToWebSocket.bind(this)}
                          className="form-bottom-element"/>
          </Column>
        </Row>
        {channelInput}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const socketState = state.socketContainerReducer;
  const currentConnection = Helper.getCurrentConnection(socketState);
  return {
    name: currentConnection.name,
    parameters: currentConnection.parameters,
    status: currentConnection.status
  }
}

export default connect(mapStateToProps)(SocketSetting);
