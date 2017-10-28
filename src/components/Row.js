import 'flexboxgrid.css';
import React from 'react';

const Row = ({ className, children }) => {
  const elementClassName = `row ${className || ''}`;
  return (
    <div className={elementClassName}>
      {children}
    </div>
  );
};

Row.propTypes = {
  className: React.PropTypes.string.isRequired,
  children: React.PropTypes.node.isRequired,
};

export default Row;
