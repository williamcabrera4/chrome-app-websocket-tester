import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import SocketTerminalList from '../containers/SocketTerminalList';
import { ConnectionStatus } from '../constant/Constants';
import { SocketContainerAction } from '../actions/ActionsType';
import Row from './Row';
import Column from './Column';

class SocketTerminal extends React.Component {
  componentDidUpdate() {
    const terminalComponent = this.terminalList;
    if (typeof terminalComponent !== 'undefined') {
      const terminalNode = terminalComponent.querySelector('.full-height');
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
              hint="Hello world"
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
  dispatch: PropTypes.func.isRequired,
  terminalData: PropTypes.array.isRequired,
  parameters: PropTypes.object.isRequired,
  status: PropTypes.string.isRequired,
  webSocket: PropTypes.object.isRequired,
};

export default SocketTerminal;
