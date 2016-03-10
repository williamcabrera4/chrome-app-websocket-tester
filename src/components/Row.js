import 'flexboxgrid';
import React from 'react';

class Row extends React.Component {

  render() {
    const elementClassName = `row ${this.props.className || ''}`;
    return (
      <div className={elementClassName}>
        {this.props.children}
      </div>
    );
  }

}

export default Row;
