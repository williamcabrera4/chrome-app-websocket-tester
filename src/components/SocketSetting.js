import React from 'react';
import SelectField from 'material-ui/lib/select-field';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import MenuItem from 'material-ui/lib/menus/menu-item';
import { connect } from 'react-redux';
import { ConnectionType } from '../constant/constant';
import { SocketContainerAction } from '../actions/actions';
import Helper from '../helpers/GlobalHelpers';
import Row from './Row';

class SocketSetting extends React.Component {

  handleSelectChange(event, index, value) {
    this.props.dispatch({
      type: SocketContainerAction.CHANGE_CONNECTION_TYPE,
      value: value
    });
  }

  handleHostChange(event) {
    this.props.dispatch({
      type: SocketContainerAction.CHANGE_HOST,
      value: event.target.value
    });
  }

  render() {
    const connectionTypeValue = this.props.connection.parameters.type;
    const hostValue = this.props.connection.parameters.host;
    return (
      <div>
        <Row>
          <h2 className="margin-bottom-0">Websocket Settings</h2>
        </Row>
        <Row className="relative-container">
          <SelectField
            value={connectionTypeValue}
            onChange={this.handleSelectChange.bind(this)}
            floatingLabelText="Connection Type">
            <MenuItem key={1} value={ConnectionType.ws} primaryText="Standard WS"/>
            <MenuItem key={2} value={ConnectionType.io} primaryText="Socket.IO"/>
          </SelectField>
          <TextField value={hostValue} className="margin-left-15" hint floatingLabelText="Location"
                     onChange={this.handleHostChange.bind(this)}/>
          <RaisedButton className="margin-left-15 form-bottom-element" label="Connect" primary={true}/>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const socketState = state.socketContainerReducer;
  const currentConnection = Helper.getCurrentConnection(socketState);
  return {
    connection: currentConnection
  }
}

export default connect(mapStateToProps)(SocketSetting);
