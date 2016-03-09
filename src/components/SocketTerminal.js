import React from 'react';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import { connect } from 'react-redux';
import SocketTerminalList from './SocketTerminalList';
import { ConnectionStatus } from '../constant/constant';
import Row from './Row';
import Column from './Column';
import Helper from '../helpers/GlobalHelpers';

class SocketTerminal extends React.Component {

  sendMessage() {
    let messageInput = this.refs.messageText.input;
    this.props.webSocket.send(messageInput.value);
    messageInput.value = '';
  }

  render() {
    const disableChanges = this.props.status == ConnectionStatus.DISCONNECTED;
    const connectionType = this.props.parameters.type;
    return (
      <div>
        <Row className="relative-container">
          <Column xs={9}>
            <TextField ref="messageText" disabled={disableChanges} int fullWidth={true} floatingLabelText="Message"/>
          </Column>
          <Column xs={2}>
            <RaisedButton disabled={disableChanges} className="form-bottom-element" label="Send"
                          primary={true} onClick={this.sendMessage.bind(this)}/>
          </Column>
        </Row>
        <SocketTerminalList connectionType={connectionType} terminalData={this.props.terminalData}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const socketState = state.socketContainerReducer;
  const currentConnection = Helper.getCurrentConnection(socketState);
  return {
    terminalData: currentConnection.messages,
    status: currentConnection.status,
    parameters: currentConnection.parameters
  }
}

export default connect(mapStateToProps)(SocketTerminal);
