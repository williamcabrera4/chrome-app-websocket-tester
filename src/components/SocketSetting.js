import React from 'react';
import SelectField from 'material-ui/lib/select-field';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Row from './Row';

const ConnectionType = {
  ws: 'websocket',
  io: 'socket.io'
};

class SocketSetting extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: ConnectionType.ws};
  }

  handleSelectChange(event, index, value) {
    this.setState({value: value});
  }

  render() {
    return (
      <div>
        <Row>
          <h2 className="margin-bottom-0">Websocket Settings</h2>
        </Row>
        <Row className="relative-container">
          <SelectField
            value={this.state.value}
            onChange={this.handleSelectChange.bind(this)}
            floatingLabelText="Connection Type">
            <MenuItem key={1} value={ConnectionType.ws} primaryText="Standard WS"/>
            <MenuItem key={2} value={ConnectionType.io} primaryText="Socket.io"/>
          </SelectField>
          <TextField className="margin-left-15" hint floatingLabelText="Location"/>
          <RaisedButton className="margin-left-15 form-bottom-element" label="Connect" primary={true}/>
        </Row>
      </div>
    );
  }

}

export default SocketSetting;
