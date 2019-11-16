import { React, PropTypes } from 'libraries';

const Skeleton = ({ style, className, children, ...props }) => (
  <div style={style} className={`a-skeleton ${className || ''}`} {...props}>
    {children}
  </div>
);

Skeleton.propTypes = {
  style: PropTypes.any,
  className: PropTypes.string,
  children: PropTypes.any
};

export default Skeleton;
