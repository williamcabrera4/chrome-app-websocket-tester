import 'flexboxgrid';
import React from 'react';

class Column extends React.Component {

  render() {
    const className = this.generateClass();
    return (
      <div className={className} style={this.props.style}>
        {this.props.children}
      </div>
    );
  }

  generateClass() {
    let className = this.props.className || '';
    className = this.generateClassName(className, 'xs');
    className = this.generateClassName(className, 'sm');
    className = this.generateClassName(className, 'md');
    className = this.generateClassName(className, 'lg');
    return className;
  }

  generateClassName(className, type) {
    if (this.props[type]) {
      return `${className} col-${type}-${this.props[type]}`
    }
    return className;
  }
}

export default Column;
