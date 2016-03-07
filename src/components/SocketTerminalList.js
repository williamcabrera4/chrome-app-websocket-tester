import React from 'react';
import Row from './Row';
import Column from './Column';
import TerminalListItem from './TerminalListItem';

class SocketTerminalList extends React.Component {

  render() {
    const terminalItems = this.props.terminalData.map(messageItem => this.createRow(messageItem));
    return (
      <div>
        <Row className="margin-top-15">
          <Column xs={3}>
            <b>Date:</b>
          </Column>
          <Column xs={9}>
            <b>Message:</b>
          </Column>
        </Row>
        {terminalItems}
      </div>
    );
  }

  createRow(messageItem) {
    return (
      <TerminalListItem key={messageItem.key} messageItem={messageItem} />
    )
  }
}

export default SocketTerminalList;
