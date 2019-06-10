import Request from './HttpRequest';
import { env } from '../../config/env';

const request = new Request({ baseUrl: env.apiEndpoint });

export default request;