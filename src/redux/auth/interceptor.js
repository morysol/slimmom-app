import axios from 'axios';

export const interceptorAxios = () => {
  return axios.interceptors.response.use(
    function (response) {
      return response;
    },
    async function (error) {
      const {
        response: { status },
      } = error;

      if (status === 401) {
        const res = await axios.post('/auth/refreshToken', {
          withCredentials: true,
        });
        const token = res.data.result.token;

        axios.defaults.headers.common.Authorization = `Bearer ${token}`;

        error.config.headers['Authorization'] = 'Bearer ' + token;
        error.config.baseURL = undefined;
        return axios.request(error.config);
      }

      return Promise.reject(error);
    }
  );
};
