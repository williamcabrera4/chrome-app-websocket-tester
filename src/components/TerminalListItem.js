import React from 'react';
import PropTypes from 'prop-types';
import Row from './Row';
import Column from './Column';

const TerminalListItem = ({ messageItem }) => {
  const messageStyle = `selectable-text ${messageItem.type}`;
  const dateString = new Date(messageItem.date).toTimeString();
  return (
    <Row className="margin-top-15">
      <Column xs={3}>{dateString}</Column>
      <Column xs={9} className={messageStyle}>{messageItem.message}</Column>
    </Row>
  );
};

TerminalListItem.propTypes = {
  messageItem: PropTypes.object.isRequired,
};

export default TerminalListItem;
