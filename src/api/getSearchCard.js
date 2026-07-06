import { tcgSearchAxios } from '@/axios/axios';

export async function getSearchCard(query, limit, offset, ids) {
  try {
    const result = await tcgSearchAxios.get('', {
      params: {
        q: query || 'bulbasaur',
        ids: ids || null,
        game: 'pokemon-jp',
        limit: limit || 20,
        offset: offset || 0,
      },
    });
    console.log('Fetched data:', result);
    return result;
  } catch (error) {
    console.error('Error fetching search card:', error);
    throw error;
  }
}
