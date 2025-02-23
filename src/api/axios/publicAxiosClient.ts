import axios from 'axios';

const publicAxiosClient = axios.create({
  baseURL: 'http://13.233.199.220/api/v1',
});





export default publicAxiosClient;