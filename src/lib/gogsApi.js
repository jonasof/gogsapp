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
        
        return { token, auth_method: 'query_string' }
    }
}