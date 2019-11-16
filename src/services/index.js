import { API } from 'config';

/**
 * GET FEATURED POST DATA
 */
export const callFeaturedPost = (payload = {}) => {
  const sendPayload = {
    ...payload,
    params: {
      'max-results': 1,
      ...(payload.params && payload.params)
    }
  };
  return API.blogSummary(sendPayload)
    .then(response => response)
    .catch(err => {
      throw err;
    });
};
