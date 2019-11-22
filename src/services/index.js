import { API } from 'config';
import { config } from 'config/api/url';
import { mapFeedToFeatureData } from 'utils';

const isSuccess = (status = false) => {
  if (status && status === 200) {
    return true;
  }
  return status;
};

const sendError = (error = {}, message = 'error response') =>
  new Error({ message, error });

const postConfig = (option = {}) => ({
  maxResults: 6,
  orderBy: 'published',
  key: config.google.apiKey,
  fetchBodies: true,
  fetchImages: true,
  // view: 'READER',
  ...option
});

const singlePostConfig = (option = {}) => ({
  key: config.google.apiKey,
  // view: 'READER'
  ...option
});

const featurePostConfig = (option = {}) => ({
  alt: 'json',
  'max-results': 1,
  ...option
});

/**
 * GET FEATURED POST DATA
 */
export const callFeaturedPost = (payload = {}) => {
  const sendPayload = {
    ...payload,
    params: {
      alt: 'json',
      'max-results': 1,
      ...featurePostConfig(payload.params || {})
    }
  };
  return API.blogSummary(sendPayload)
    .then(res => {
      if (isSuccess(res.status)) {
        const { data } = res;
        const featuredPostData = mapFeedToFeatureData(data);
        return featuredPostData;
      }
      throw new Error(sendError(res));
    })
    .catch(err => {
      throw err;
    });
};

export const callPosts = (payload = {}) => {
  const sendPayload = {
    ...payload,
    params: {
      ...postConfig(payload.params || {})
    }
  };

  return API.blogPost(sendPayload)
    .then(res => {
      if (isSuccess(res.status)) {
        return res.data;
      }

      throw new Error(sendError(res));
    })
    .catch(err => {
      throw err;
    });
};

export const callPostById = (id, payload = {}) => {
  const sendPayload = {
    ...payload,
    params: {
      ...singlePostConfig(payload.params || {})
    },
    path: id
  };

  return API.blogPost(sendPayload)
    .then(res => {
      if (isSuccess(res.status)) {
        return res.data;
      }
      throw new Error(sendError(res));
    })
    .catch(err => {
      throw err;
    });
};

export const getPopularPostData = () => {
  try {
    const json = window.__POPULAR_POST__;
    const data = JSON.parse(json);
    return data;
  } catch (err) {
    return null;
  }
};
