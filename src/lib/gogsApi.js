import GogsClient from 'gogs-client';

export default {
  checkLogged: () => {
    const url = localStorage.getItem('url');
    const token = localStorage.getItem('token');

    return url && token;
  },
  getApi: () => {
    const url = localStorage.getItem('url');

    return new GogsClient(url);
  },
  getUser: () => {
    const token = localStorage.getItem('token');

    return {
      token,
      auth_method: 'query_string'
    }
  },
  loginWithUrlAndToken: async (url, token) => {
    const api = new GogsClient(url);

    const result = await api.getCurrentUser({
      token,
      auth_method: 'query_string'
    });

    localStorage.setItem('url', url);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(result));

    return true;
  },
  logout: () => {
    localStorage.removeItem('url');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}
