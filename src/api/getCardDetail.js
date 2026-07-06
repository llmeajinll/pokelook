import { tcgCardAxios } from '@/axios/axios';

export async function getCardDetail(id) {
  try {
    const result = await tcgCardAxios.get(`/${id}`);
    return result;
  } catch (error) {
    console.error('Error fetching card detail:', error);
    throw error;
  }
}
