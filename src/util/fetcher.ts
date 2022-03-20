import axios from 'axios';

const fetcher = axios.create({
  baseURL: 'https://scoresaber.com/api',
});

export default fetcher;
