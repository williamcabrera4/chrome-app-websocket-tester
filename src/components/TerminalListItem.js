import React from 'react';
import Row from './Row';
import Column from './Column';

class TerminalListItem extends React.Component {

  render() {
    const messageItem = this.props.messageItem;
    const messageStyle = `selectable-text ${messageItem.type}`;
    const dateString = messageItem.date.toTimeString();
    return (
      <Row className="margin-top-15">
        <Column xs={3}>{dateString}</Column>
        <Column xs={9} className={messageStyle}>{messageItem.message}</Column>
      </Row>
    )
  }
}

export default TerminalListItem;
