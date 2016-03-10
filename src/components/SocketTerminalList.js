import React from 'react';
import { connect } from 'react-redux';
import Row from './Row';
import Column from './Column';
import TerminalListItem from './TerminalListItem';
import { ConnectionType } from '../constant/constant';
import Helper from '../helpers/GlobalHelpers';

class SocketTerminalList extends React.Component {

  componentDidMount() {
    window.addEventListener('resize', () => this.forceUpdate());
  }

  componentWillUnmount() {
    window.removeEventListener('resize', () => this.forceUpdate());
  }

  render() {
    const offset = this.props.connectionType == ConnectionType.ws ? 305 : 377;
    const terminalHeight = window.innerHeight - offset;
    const terminalStyle = {height: terminalHeight};
    const terminalItems = this.props.terminalData.map(messageItem => this.createRow(messageItem));
    return (
      <div>
        <Row className="margin-top-15">
          <Column xs={3}>
            <b>Date:</b>
          </Column>
          <Column xs={8}>
            <b>Message:</b>
          </Column>
        </Row>
        <div className="full-height"
             style={terminalStyle}>
          {terminalItems}
        </div>
      </div>
    );
  }

  createRow(messageItem) {
    return (
      <TerminalListItem key={messageItem.key} messageItem={messageItem}/>
    )
  }
}

function mapStateToProps(state) {
  const socketState = state.socketContainerReducer;
  const currentConnection = Helper.getCurrentConnection(socketState);
  return {
    connectionType: currentConnection.parameters.type
  }
}

export default connect(mapStateToProps)(SocketTerminalList);
