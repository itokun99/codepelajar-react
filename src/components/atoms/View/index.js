import { React, PropTypes } from 'libraries';

const View = ({ className, style, children, ...props }) => (
  <div className={className} style={style} {...props}>
    {children}
  </div>
);

View.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
  style: PropTypes.any
};

export default View;
