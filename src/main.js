import { getImages } from './js/pixabay-api';
import { renderGalleryList, clearGalleryList } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const input = document.querySelector('.inputText');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more');

let query = '';
let page = 1;
const perPage = 15;

form.addEventListener('submit', async event => {
  event.preventDefault();

  query = input.value.trim();
  if (!query) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search query!',
    });
    return;
  }

  clearGalleryList();
  page = 1;
  loadMoreBtn.style.display = 'none';
  loader.style.display = 'block';

  try {
    const data = await getImages(query, page, perPage);
    
    if (data.hits.length === 0) {
      iziToast.error({
        title: 'Error',
        message: 'Sorry, no images found. Try another search.',
      });
    } else {
      renderGalleryList(data.hits);
      if (data.totalHits > perPage) {
        loadMoreBtn.style.display = 'block';
      }
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
    });
  } finally {
    loader.style.display = 'none';
  }

  form.reset();
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  loadMoreBtn.style.display = 'none';
  loader.style.display = 'block';

  try {
    const data = await getImages(query, page, perPage);
    
    renderGalleryList(data.hits);
    
    if (page * perPage >= data.totalHits) {
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
      });
      loadMoreBtn.style.display = 'none';
    } else {
      loadMoreBtn.style.display = 'block';
    }

    const { height: cardHeight } = document.querySelector('.gallery li').getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });

  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
    });
  } finally {
    loader.style.display = 'none';
  }
});
