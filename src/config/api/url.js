import { isLocalhost } from 'utils';

const development = {
  url: {
    api: 'https://www.googleapis.com/blogger/v3',
    feed: 'https://nextcodepelajar.blogspot.com/feeds',
    asset: 'https://nextcodepelajar.blogspot.com',
    origin: 'https://nextcodepelajar.blogspot.com'
  },
  google: {
    apiKey: 'AIzaSyB2MpzH-Gq6fnWuUnoI2PH2sPMTkGIQ9b0',
    blogId: '5624631557745671504'
  }
};

const production = {
  url: {
    api: 'https://www.googleapis.com/blogger/v3',
    feed: `${window.location.origin}/feeds`,
    asset: window.location.origin,
    origin: window.location.origin
  },
  google: {
    apiKey: 'AIzaSyB2MpzH-Gq6fnWuUnoI2PH2sPMTkGIQ9b0',
    // blogId: '3190947245348881579'
    blogId: '5624631557745671504' 
  }
};

export const config = isLocalhost ? development : production;

const baseUrl = {
  summary: `${config.url.feed}/posts/summary`,
  postFeed: `${config.url.feed}/posts/default`,
  post: `${config.url.api}/blogs/${config.google.blogId}/posts`,
  page: `${config.url.api}/blogs/${config.google.blogId}/pages`
};

export default baseUrl;
