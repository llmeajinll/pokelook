import axios from 'axios';

if (!import.meta.env.VITE_TCG_API_KEY) {
  throw new Error(
    'VITE_TCG_API_KEY is not defined in the environment variables.',
  );
}

export const tcgSearchAxios = axios.create({
  baseURL: 'https://api.tcgpricelookup.com/v1/cards/search',
  headers: {
    'X-API-Key': import.meta.env.VITE_TCG_API_KEY,
    Accept: 'application/json',
  },
});

export const tcgSortAxios = axios.create({
  baseURL: 'https://api.tcgpricelookup.com/v1/category',
  headers: {
    'X-API-Key': import.meta.env.VITE_TCG_API_KEY,
    Accept: 'application/json',
  },
});

export const tcgCardAxios = axios.create({
  baseURL: 'https://api.tcgpricelookup.com/v1/cards',
  headers: {
    'X-API-Key': import.meta.env.VITE_TCG_API_KEY,
    Accept: 'application/json',
  },
});
