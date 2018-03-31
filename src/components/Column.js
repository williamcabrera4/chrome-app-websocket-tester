import 'flexboxgrid'; // eslint-disable-line
import React from 'react';
import PropTypes from 'prop-types';

class Column extends React.Component {
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
      return `${className} col-${type}-${this.props[type]}`;
    }
    return className;
  }

  render() {
    const className = this.generateClass();
    return (
      <div className={className} style={this.props.style}>
        {this.props.children}
      </div>
    );
  }
}

Column.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
};

Column.defaultProps = {
  className: '',
  style: {},
};

export default Column;
