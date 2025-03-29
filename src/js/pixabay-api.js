import axios from 'axios';

const API_KEY = '48639504-554e542bc8495b3a6c3499497';
const BASE_URL = 'https://pixabay.com/api/';

export async function getImages(query, page = 1, perPage = 15) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page,
        per_page: perPage,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Помилка при отриманні даних з API:', error);
    throw error;
  }
}
