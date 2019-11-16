/* eslint-disable import/no-cycle */
import { axios } from 'libraries';
// eslint-disable-next-line import/no-cycle

export const apiInstance = axios.create({
  baseURL: '',
  timeout: 10000,
  validateStatus: status => status >= 200 && status < 300
});

class ApiRequest {
  static get(route, token = false) {
    return payload => this.request('GET', route, payload, token);
  }

  static put(route, token = false) {
    return payload => this.request('PUT', route, payload, token);
  }

  static post(route, token = false) {
    return payload => this.request('POST', route, payload, token);
  }

  static delete(route, token = false) {
    return payload => this.request('DELETE', route, payload, token);
  }

  static patch(route, token = false) {
    return payload => this.request('PATCH', route, payload, token);
  }

  static resolveParams(params) {
    const paramsResult = [];
    Object.keys(params).map(e => paramsResult.push(`${e}=${params[e]}`));
    return paramsResult.join('&');
  }

  static request(method, route, payload = {}, token) {
    return new Promise((resolve, reject) => {
      const path = payload.path ? `/${payload.path}` : '';
      const params = payload.params
        ? `?${this.resolveParams(payload.params)}`
        : '';
      const customUrl = payload.url ? payload.url : '';
      const baseHeaders = {
        'Content-Type':
          payload.type === 'form-data'
            ? 'multipart/form-data'
            : 'application/json'
      };
      apiInstance
        .request({
          url: customUrl.length > 0 ? customUrl : route + path + params,
          method,
          headers: payload.headers
            ? { ...baseHeaders, ...payload.headers }
            : baseHeaders,
          data: payload.body ? payload.body : {}
        })
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          if (err && err.response) {
            reject(err.response);
          } else if (err) {
            reject(err);
          }
        });
    });
  }
}

export default ApiRequest;
