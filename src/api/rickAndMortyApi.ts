import axios from 'axios';

const apiUrl = process.env.RICK_AND_MORTY_API_URL

const rickAndMortyApi = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-type': 'application/json',
  },
});

export { rickAndMortyApi };
