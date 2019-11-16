import { React, PropTypes } from 'libraries';

const Section = ({ className, style, children, ...props }) => (
  <section className={className} style={style} {...props}>
    {children}
  </section>
);

Section.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
  style: PropTypes.any
};

export default Section;
