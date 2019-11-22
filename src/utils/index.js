/* eslint-disable no-useless-escape */
import _ from 'lodash';
import dummyFeaturePost from './featuredPost';

// INITIALIZE BLOG ID
export const blogId = `${_.get(window, '__BLOG_ID__', '5624631557745671504')}`;

// SHORTCUT DOCUMENT SCRIPT
export const elementId = name => document.getElementById(name);

// DETECT IS LOCALHOST or DEVELOPMENT ENV
export const isLocalhost = window.location.origin.indexOf('localhost') !== -1;

// CREATE URL FOR SEARCH ON LABEL
export const createSearchUrl = (value = '', customPath = null) =>
  `${customPath || '/search/label/'}${value}`;

// RESIZE IMAGE FOR POST IMAGE
export const resizeImage = (image, width = 400, height = 400, crop = true) => {
  const target = /\/s[0-9]+\-c/g;
  const result = `/w${width}-h${height}-${crop ? 'c' : ''}`;
  return image.replace(target, result);
};

// GET SOCIAL DATA
export const getSocial = type => {
  switch (type) {
    case 'footer':
      return _.get(window, '__FOOTER_SOCIAL_ICON__', []);
    default:
      return [];
  }
};

// GET IMAGE
export const getImage = (image = '') => {
  const defaultImage = _.get(
    window,
    '__CODEPELAJAR_CONFIG__.defaultImage',
    'https://1.bp.blogspot.com/-QYP55lDT3y8/XdEL28HRsfI/AAAAAAAACqw/My15c96Og8022Jc6HVfPFf1gBku8PmA_wCLcBGAsYHQ/s1600/no-image-codepelajar.png'
  );
  if (image) return image;
  return defaultImage;
};

// MAPING DATA FROM RESPONSE FEED;
export const mapFeedToFeatureData = obj => {
  const data = _.get(obj, 'feed.entry[0]', null);

  if (!data) return data;
  const image = _.get(data, 'media$thumbnail.url', '');
  const resized = resizeImage(image, 640, 480);
  return {
    title: _.get(data, 'title.$t', ''),
    description: _.get(data, 'summary.$t', ''),
    image: resized,
    url: _.get(data, `link[${data.link.length - 1}].href`, '')
  };
};

// CREATE OBJECT AUTHOR DATA
export const createAuthor = (obj = {}) => {
  const image = _.get(obj, 'image.url', '');
  const name = _.get(obj, 'displayName', '');
  const id = _.get(obj, 'id', '');
  return {
    id,
    name,
    image
  };
};

// CONVER JSON TO OBJECT DATA

export const parseJSON = json => {
  try {
    const data = JSON.parse(json);
    return data;
  } catch (err) {
    throw err;
  }
};

export { dummyFeaturePost };
