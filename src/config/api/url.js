import { isLocalhost, blogId } from 'utils';

const blogConfig = window.__CODEPELAJAR_CONFIG__;
const development = {
  url: {
    api: 'https://www.googleapis.com/blogger/v3',
    feed: 'https://nextcodepelajar.blogspot.com/feeds',
    asset: 'https://nextcodepelajar.blogspot.com',
    origin: 'https://nextcodepelajar.blogspot.com'
  },
  google: {
    apiKey: 'AIzaSyB2MpzH-Gq6fnWuUnoI2PH2sPMTkGIQ9b0',
    blogId
  },
  disqus: {
    shortName: 'codepelajar'
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
    blogId: blogConfig.blogId || blogId
  },
  disqus: {
    shortName: blogConfig.disqus || null
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
