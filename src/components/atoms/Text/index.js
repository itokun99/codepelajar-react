import { React, PropTypes } from 'libraries';

const Text = ({ className, style, children, tag, ...props }) => {
  const Tag = tag || 'p';
  return (
    <Tag className={className} style={style} {...props}>
      {children}
    </Tag>
  );
};

Text.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
  style: PropTypes.any,
  tag: PropTypes.string
};

export default Text;
