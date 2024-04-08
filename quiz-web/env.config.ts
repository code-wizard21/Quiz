const baseUrl: string = 'https://api.quizmobb.com';
const localBaseUrl: string = 'http://localhost:4000';

const v1localApiUrl: string = `${baseUrl}/v1`;
 const v1ApiUrl: string = `${localBaseUrl}/v1`;

export const env: string = 'dev';

export const apiBaseUrl: string = env === 'prod' ? v1localApiUrl : v1ApiUrl;
export const serverUrl: string = env === 'prod' ? v1localApiUrl : v1ApiUrl;