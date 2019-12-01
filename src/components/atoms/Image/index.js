import { React, PropTypes } from 'libraries';

const Image = ({
  source,
  width,
  height,
  resizeMode,
  backgroundImage,
  title,
  alt,
  className,
  style,
  children,
  ...props
}) => {
  if (backgroundImage) {
    return (
      <div
        title={title}
        alt={alt}
        className={className}
        style={{
          ...(source && { backgroundImage: `url(${source})` }),
          ...(width && width),
          ...(height && height),
          ...(resizeMode && { backgroundSize: resizeMode }),
          ...style
        }}
        {...props}
      >
        {children}
      </div>
    );
  }

  return (
    <img
      src={source}
      alt={alt}
      title={title}
      className={className}
      style={style}
      width={width}
      height={height}
      {...props}
    />
  );
};

Image.propTypes = {
  source: PropTypes.any,
  width: PropTypes.any,
  height: PropTypes.any,
  resizeMode: PropTypes.string,
  backgroundImage: PropTypes.bool,
  title: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.any,
  children: PropTypes.any
};

Image.defaultProps = {
  backgroundImage: false,
  alt: 'image',
  title: 'image'
};

export default Image;
