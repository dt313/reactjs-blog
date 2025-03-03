const API_URL = `${process.env.REACT_APP_API_URL_BASE}/oauth2/authorization`;

export const GOOGLE_OAUTH_URL = API_URL + '/google?to=/login';
export const GITHUB_OAUTH_URL = API_URL + '/github';
export const FACEBOOK_OAUTH_URL = API_URL + '/facebook';
