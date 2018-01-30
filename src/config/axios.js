import axios from 'axios';


const instance =  axios.create({
    baseURL: 'https://requestb.in',
    timeout: 5000,
    headers: {'X-Custom-Header': 'foobar'}
  });

  export default instance