import axios from 'axios';

export const apiAxios = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: false,
  timeout: 1 * 60 * 1000, // 1 мин
  // https://github.com/axios/axios/issues/5058#issuecomment-1272107602
  // indexes: null => https://path/to/api?foo=5&foo=2,
  // by default indexes: false => https://path/to/api?foo[]=5&foo[]=2
  paramsSerializer: {
    indexes: null,
  },
});
