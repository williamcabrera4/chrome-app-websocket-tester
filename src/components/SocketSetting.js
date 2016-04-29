import React from 'react';
import SelectField from 'material-ui/lib/select-field';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import MenuItem from 'material-ui/lib/menus/menu-item';
import { connect } from 'react-redux';
import RemoveIcon from 'material-ui/lib/svg-icons/content/remove-circle';
import { ConnectionType, ConnectionStatus } from '../constant/Constants';
import { SocketContainerAction } from '../actions/ActionsType';
import Helper from '../helpers/GlobalHelpers';
import Row from './Row';
import Column from './Column';

const textFieldStyle = {
  width: '100%',
  minWidth: '100px',
};

class SocketSetting extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      hostErrorMessage: '',
    };
  }

  handleSelectChange(event, index, value) {
    this.props.dispatch({
      type: SocketContainerAction.CHANGE_CONNECTION_TYPE,
      value,
    });
  }

  handleHostChange(event) {
    this.setState({ hostErrorMessage: '' });
    this.props.dispatch({
      type: SocketContainerAction.CHANGE_HOST,
      value: event.target.value,
    });
  }

  handleChannelChange(event) {
    this.props.dispatch({
      type: SocketContainerAction.CHANGE_CHANNEL,
      value: event.target.value,
    });
  }

  connectToWebSocket() {
    const webSocket = this.props.webSocket;
    const host = this.props.parameters.host;
    if (this.props.status === ConnectionStatus.DISCONNECTED && host !== '') {
      const dispatch = this.props.dispatch;
      const channel = this.props.parameters.channel;
      webSocket.connect(host, dispatch, channel);
    } else if (this.props.status === ConnectionStatus.DISCONNECTED && host === '') {
      this.setState({ hostErrorMessage: 'This field is required' });
    } else {
      webSocket.close();
    }
  }

  generateChannelInput(disableChanges) {
    if (this.props.parameters.type === ConnectionType.io) {
      const channelValue = this.props.parameters.channel;
      return (
        <Row >
          <Column xs={3}>
            <TextField value={channelValue} hint floatingLabelText="Channel"
              onChange={(event) => this.handleChannelChange(event)}
              disabled={disableChanges}
              style={textFieldStyle}
            />
          </Column>
        </Row>
      );
    }
    return null;
  }

  removeConnection() {
    this.props.dispatch({
      type: SocketContainerAction.REMOVE_CONNECTION,
    });
  }

  render() {
    const connectionName = this.props.name;
    const connectionTypeValue = this.props.parameters.type;
    const hostValue = this.props.parameters.host;
    const disableChanges = this.props.status === ConnectionStatus.CONNECTED;
    const buttonLabel = this.props.status === ConnectionStatus.CONNECTED ? 'Disconnect' : 'Connect';
    const channelInput = this.generateChannelInput(disableChanges);
    const iconColor = '#aaa';
    let buttonOnErrorStyle = {};
    if (this.state.hostErrorMessage !== '') {
      buttonOnErrorStyle = { bottom: '35px' };
    }
    return (
      <div>
        <Row>
          <h2 className="margin-bottom-0">
            Websocket Settings: <span className="highlight-title">{connectionName}
            <RemoveIcon className="cursor-pointer" onClick={() => this.removeConnection()}
              color={iconColor}
            /></span>
          </h2>
        </Row>
        <Row className="relative-container">
          <Column xs={3}>
            <SelectField
              style={textFieldStyle}
              disabled={disableChanges}
              value={connectionTypeValue}
              onChange={(event, index, value) => this.handleSelectChange(event, index, value)}
              floatingLabelText="Connection Type"
            >
              <MenuItem key={1} value={ConnectionType.ws} primaryText="Standard WS" />
              <MenuItem key={2} value={ConnectionType.io} primaryText="Socket.IO" />
            </SelectField>
          </Column>
          <Column xs={6}>
            <TextField value={hostValue} hint floatingLabelText="Location"
              onChange={(event) => this.handleHostChange(event)}
              disabled={disableChanges}
              errorText={this.state.hostErrorMessage}
              style={textFieldStyle}
            />
          </Column>
          <Column xs={2} className="form-bottom-element" style={buttonOnErrorStyle}>
            <RaisedButton label={buttonLabel} primary
              onClick={() => this.connectToWebSocket()}
            />
          </Column>
        </Row>
        {channelInput}
      </div>
    );
  }
}

SocketSetting.propTypes = {
  dispatch: React.PropTypes.func,
  name: React.PropTypes.string,
  parameters: React.PropTypes.object,
  status: React.PropTypes.string,
  webSocket: React.PropTypes.object,
};

function mapStateToProps(state) {
  const socketState = state.socketContainerReducer;
  const currentConnection = Helper.getCurrentConnection(socketState);
  return {
    name: currentConnection.name,
    parameters: currentConnection.parameters,
    status: currentConnection.status,
  };
}

export default connect(mapStateToProps)(SocketSetting);
