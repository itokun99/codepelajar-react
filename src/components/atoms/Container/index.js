import { React, PropTypes } from 'libraries';

const Container = ({ className, style, children, ...props }) => (
  <div className={`container ${className || ''}`} style={style} {...props}>
    {children}
  </div>
);

Container.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
  style: PropTypes.any
};

export default Container;
