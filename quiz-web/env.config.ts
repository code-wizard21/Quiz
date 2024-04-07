const baseUrl: string = 'https://api.quizmobb.com';
//  const localBaseUrl: string = 'http://localhost:4000';

const v1localApiUrl: string = `${baseUrl}/v1`;
// const v1ApiUrl: string = `${baseUrl}/v1`;

export const env: string = 'prod';

export const apiBaseUrl: string = env === 'prod' ? v1localApiUrl : v1localApiUrl;
export const serverUrl: string = env === 'prod' ? v1localApiUrl : v1localApiUrl;