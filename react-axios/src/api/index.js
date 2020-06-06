import axios from 'axios';

export default {
    GET: (url, param) => (!param) ? axios.get(url) : axios.get(url, {params: param}),
    POST: (url, data) => axios.post(url, data),
    // UPDATE: `${BASE_URL}`,
    // DELETE: `${BASE_URL}`
};