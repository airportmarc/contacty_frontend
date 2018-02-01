import axios from 'axios';

//const url = 'http://localhost:3000'
const url = 'https://rocky-hollows-82201.herokuapp.com/'
const instance =  axios.create({
    baseURL: url,
    timeout: 10000,
    headers: {'X-Custom-Header': 'foobar'}
  });

  export default instance