import ApiRequest from './config';
import baseUrl from './url';

const API = {};

API.blogPost = ApiRequest.get(baseUrl.post);
API.blogSummary = ApiRequest.get(baseUrl.summary);
API.blogPostFeed = ApiRequest.get(baseUrl.postFeed);
API.blogPage = ApiRequest.get(baseUrl.page);

export default API;
