import { env } from '../../config/env';
import axios from 'axios';

export default class HttpRequest {

    constructor(opts) {
      this.ajax = axios.create({
        baseURL: env.apiEndpoint,
        timeout: env.timeout
      });
    }
    
    async get(url, params, options) {
      return await this.ajax({
        method: 'get',
        url,
        params,
        ...options
      });
    }
    
    async post(url, data, options) {
      return await this.ajax(url, {
        method: 'post',
        url,
        data,
        ...options
      });
    }
  
    async put(url, data, options) {
      return await this.ajax(url,  {
        method: 'put',
        url,
        data,
        ...options
      });
    }
  
    async delete(url, params, options) {
      return await this.ajax(url,  {
        method: 'delete',
        url,
        params,
        ...options
      });
    }
}