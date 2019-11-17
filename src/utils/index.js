/* eslint-disable no-useless-escape */
import _ from 'lodash';
import dummyFeaturePost from './featuredPost';

export const blogId = `${_.get(window, '__BLOG_ID__', '5624631557745671504')}`;
export const elementId = name => document.getElementById(name);
export const isLocalhost = window.location.origin.indexOf('localhost') !== -1;

export const resizeImage = (image, width = 400, height = 400, crop = true) => {
  const target = /\/s[0-9]+\-c/g;
  const result = `/w${width}-h${height}-${crop ? 'c' : ''}`;
  return image.replace(target, result);
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

export const createSearchUrl = (value = '') => `/search/label/${value}`;
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

export { dummyFeaturePost };
