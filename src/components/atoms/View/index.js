import { React, PropTypes } from 'libraries';

const View = ({ className, style, children, tag, ...props }) => {
  const Tag = tag;
  return (
    <Tag className={className} style={style} {...props}>
      {children}
    </Tag>
  );
};

View.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
  style: PropTypes.any,
  tag: PropTypes.string
};

View.defaultProps = {
  tag: 'div'
};

export default View;
