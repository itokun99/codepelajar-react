import { API } from 'config';
import { mapFeedToFeatureData } from 'utils';

/**
 * GET FEATURED POST DATA
 */
export const callFeaturedPost = (payload = {}) => {
  const sendPayload = {
    ...payload,
    params: {
      alt: 'json',
      'max-results': 1,
      ...(payload.params && payload.params)
    }
  };
  return API.blogSummary(sendPayload)
    .then(res => {
      if (res.status && res.status === 200) {
        const { data } = res;
        const featuredPostData = mapFeedToFeatureData(data);

        return featuredPostData;
      }
      throw new Error({
        message: 'no response data'
      });
    })
    .catch(err => {
      throw err;
    });
};
