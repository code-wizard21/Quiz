const baseUrl: string = 'https://api.quizmobb.com';
const localBaseUrl: string = 'http://localhost:4000';

const v1localApiUrl: string = `${localBaseUrl}/v1`;
const v1ApiUrl: string = `${baseUrl}/v1`;

export const env: string = 'dev';

export const apiBaseUrl: string = env === 'prod' ? v1ApiUrl : v1localApiUrl;
export const serverUrl: string = env === 'prod' ? baseUrl : localBaseUrl;
