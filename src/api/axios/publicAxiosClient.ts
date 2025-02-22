import axios from 'axios';

const publicAxiosClient = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
});





export default publicAxiosClient;