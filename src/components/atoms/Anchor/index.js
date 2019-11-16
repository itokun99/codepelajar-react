import { React, PropTypes } from 'libraries';

const Anchor = ({
  href,
  title,
  target,
  children,
  className,
  style,
  ...props
}) => (
  <a
    href={href}
    title={title}
    target={target}
    {...props}
    className={className}
    style={style}
  >
    {children}
  </a>
);

Anchor.propTypes = {
  href: PropTypes.string,
  title: PropTypes.string,
  target: PropTypes.string,
  children: PropTypes.any,
  className: PropTypes.any,
  style: PropTypes.any
};

Anchor.defaultProps = {
  href: '#'
};

export default Anchor;
