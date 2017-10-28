import React from 'react';
import ReactDOM from 'react-dom';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import { connect } from 'react-redux';
import SocketTerminalList from './SocketTerminalList';
import { ConnectionStatus } from '../constant/Constants';
import { SocketContainerAction } from '../actions/ActionsType';
import Row from './Row';
import Column from './Column';
import Helper from '../helpers/GlobalHelpers';

class SocketTerminal extends React.Component {
  componentDidUpdate() {
    const terminalComponent = this.terminalList;
    if (typeof terminalComponent !== 'undefined') {
      const terminalNode = ReactDOM.findDOMNode(terminalComponent).querySelector('.full-height');
      terminalNode.scrollTop = terminalNode.scrollHeight;
    }
  }

  sendMessage() {
    const messageInput = this.messageText.input;
    this.props.webSocket.send(messageInput.value);
    messageInput.value = '';
  }

  clearMessages() {
    this.props.dispatch({
      type: SocketContainerAction.DELETE_TERMINAL_MESSAGES,
    });
  }

  messageTextFieldListener(event) {
    if (event.keyCode === 13) {
      this.sendMessage();
    }
  }

  render() {
    const disableChanges = this.props.status === ConnectionStatus.DISCONNECTED;
    const clearDisable = this.props.terminalData.length < 1;
    const connectionType = this.props.parameters.type;
    return (
      <div>
        <Row className="relative-container">
          <Column xs={8}>
            <TextField
              ref={(input) => { this.messageText = input; }}
              disabled={disableChanges}
              int
              fullWidth
              floatingLabelText="Message"
              onKeyUp={event => this.messageTextFieldListener(event)}
            />
          </Column>
          <Column xs={4} className="form-bottom-element">
            <RaisedButton
              disabled={disableChanges}
              label="Send"
              primary
              onClick={() => this.sendMessage()}
            />
            <RaisedButton
              disabled={clearDisable}
              label="Clear"
              className="margin-left-5"
              primary
              onClick={() => this.clearMessages()}
            />
          </Column>
        </Row>
        <SocketTerminalList
          ref={(input) => { this.terminalList = input; }}
          connectionType={connectionType}
          terminalData={this.props.terminalData}
        />
      </div>
    );
  }
}

SocketTerminal.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  terminalData: React.PropTypes.array.isRequired,
  parameters: React.PropTypes.object.isRequired,
  status: React.PropTypes.string.isRequired,
  webSocket: React.PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const socketState = state.socketContainerReducer;
  const currentConnection = Helper.getCurrentConnection(socketState);
  return {
    terminalData: currentConnection.messages,
    status: currentConnection.status,
    parameters: currentConnection.parameters,
  };
}

export default connect(mapStateToProps)(SocketTerminal);
