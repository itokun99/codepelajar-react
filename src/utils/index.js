/* eslint-disable no-useless-escape */
import _ from 'lodash';

export const elementId = name => document.getElementById(name);

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
    image: resized
  };
};
