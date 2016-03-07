import React from 'react';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import SocketTerminalList from './SocketTerminalList';
import Row from './Row';
import Column from './Column';

const terminalData = [
  {
    date: new Date(),
    message: 'You: This is an example message'
  },
  {
    date: new Date(),
    message: 'Server: This is an example message'
  },
  {
    date: new Date(),
    message: 'Server: This is an example message'
  },
  {
    date: new Date(),
    message: 'Server: This is an example message Server: This is an example message Server: This is an example message Server: This is an example message'
  }
];

class SocketTerminal extends React.Component {

  render() {
    return (
      <div>
        <Row className="relative-container">
          <Column xs={10}>
            <TextField int fullWidth={true} floatingLabelText="Message"/>
          </Column>
          <RaisedButton className="margin-left-15 form-bottom-element" label="Send" primary={true}/>
        </Row>
        <SocketTerminalList terminalData={terminalData} />
      </div>
    );
  }
}

export default SocketTerminal;
