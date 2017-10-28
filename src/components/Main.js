import React from 'react';
import HistoryList from './HistoryList';
import SocketPlayground from './SocketPlayground';
import SocketPlaygroundBar from './SocketPlaygroundBar';
import Row from './Row';
import Column from './Column';

const appBarHeight = 70;

class AppComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listHeight: window.innerHeight - appBarHeight,
    };
  }

  componentDidMount() {
    window.addEventListener('resize', () => this.listHeight());
  }

  componentWillUnmount() {
    window.removeEventListener('resize', () => this.listHeight());
  }

  listHeight() {
    const height = window.innerHeight - appBarHeight;
    this.setState({
      listHeight: height,
    });
  }

  render() {
    return (
      <div>
        <SocketPlaygroundBar />
        <Row>
          <Column sm={3} className="no-padding">
            <HistoryList height={this.state.listHeight} />
          </Column>
          <Column sm={9} className="no-padding">
            <SocketPlayground />
          </Column>
        </Row>
      </div>
    );
  }
}

export default AppComponent;
