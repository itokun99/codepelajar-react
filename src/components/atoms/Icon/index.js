import { React, PropTypes } from 'libraries';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaLinkedin,
  FaGithub,
  FaHome
} from 'react-icons/fa';

const Icon = ({ name, ...props }) => {
  switch (name) {
    case 'facebook':
      return <FaFacebookF {...props} />;
    case 'twitter':
      return <FaTwitter {...props} />;
    case 'instagram':
      return <FaInstagram {...props} />;
    case 'github':
      return <FaGithub {...props} />;
    case 'linkedin':
      return <FaLinkedin {...props} />;
    case 'youtube':
      return <FaYoutube {...props} />;
    case 'home':
      return <FaHome {...props} />;
    default:
      return null;
  }
};

Icon.propTypes = {
  name: PropTypes.string
};

export default Icon;
