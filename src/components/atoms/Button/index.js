import { React, PropTypes, cx } from 'libraries';
import Anchor from '../Anchor';

const Button = ({
  onPress,
  className,
  style,
  anchor,
  href,
  title,
  children,
  target,
  variant,
  outline,
  block,
  radius,
  small,
  large,
  disabled,
  ...props
}) => {
  const btnClass = cx('a-button__element', className, {
    [`a-button__element--${variant}`]: variant,
    'a-button__element--outline': outline,
    'a-button__element--block': block,
    'a-button__element--radius': radius,
    'a-button__element--small': small,
    'a-button__element--large': large,
    'a-button__element--disabled': disabled
  });
  if (anchor)
    return (
      <Anchor
        // eslint-disable-next-line no-script-url
        href={disabled ? 'javascript:void(0)' : href}
        title={title}
        style={style}
        className={btnClass}
        onClick={onPress}
        target={target}
        {...props}
      >
        {children}
      </Anchor>
    );

  return (
    <button
      disabled={disabled}
      type="button"
      className={btnClass}
      onClick={onPress}
      {...props}
      style={style}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  onPress: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.any,
  anchor: PropTypes.bool,
  target: PropTypes.string,
  children: PropTypes.any,
  title: PropTypes.string,
  href: PropTypes.string,
  outline: PropTypes.bool,
  block: PropTypes.bool,
  radius: PropTypes.bool,
  small: PropTypes.bool,
  large: PropTypes.bool,
  variant: PropTypes.oneOf([
    'default',
    'success',
    'info',
    'warning',
    'secondary',
    'primary'
  ]),
  disabled: PropTypes.bool
};

Button.defaultProps = {
  anchor: false,
  variant: 'default'
};

export default Button;
