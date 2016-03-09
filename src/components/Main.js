import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import Paper from 'material-ui/lib/paper';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/lib/menus/menu-item';
import HistoryList from './HistoryList';
import SocketPlayground from './SocketPlayground';
import SocketPlaygroundBar from './SocketPlaygroundBar';
import Row from './Row';
import Column from './Column';

const appBarHeight = 70;

class AppComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {listHeight: window.innerHeight - appBarHeight}
  }

  listHeight() {
    const height = window.innerHeight - appBarHeight;
    this.setState({listHeight: height});
  }

  componentDidMount() {
    window.addEventListener('resize', this.forceUpdate.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.listHeight.bind(this));
  }

  render() {
    return (
      <div>
        <SocketPlaygroundBar />
        <Row>
          <Column sm={3} className="no-padding">
            <HistoryList height={this.state.listHeight}/>
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
