import React from 'react';
import AppBar from 'material-ui/lib/app-bar'
import Paper from 'material-ui/lib/paper'
import HistoryList from './HistoryList'
import SocketTestContainer from './SocketTestContainer';
import Row from './Row';
import Column from './Column';

class AppComponent extends React.Component {

  render() {
    return (
      <Paper zDepth={3}>
        <AppBar title="WebSocket Tester"/>
          <Row>
            <Column xs={3}>
             <HistoryList />
            </Column>
            <Column xs={9}>
                <SocketTestContainer />
            </Column>
          </Row>
      </Paper>
    );
  }
}

AppComponent.defaultProps = {};

export default AppComponent;
