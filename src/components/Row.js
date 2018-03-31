import 'flexboxgrid'; // eslint-disable-line
import React from 'react';
import PropTypes from 'prop-types';

const Row = ({ className, children }) => {
  const elementClassName = `row ${className || ''}`;
  return (
    <div className={elementClassName}>
      {children}
    </div>
  );
};

Row.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Row.defaultProps = {
  className: '',
};

export default Row;
