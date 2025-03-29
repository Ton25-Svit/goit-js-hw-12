import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export const gallery = document.querySelector('.gallery');

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function renderGalleryList(images) {
  const markup = images
    .map(
      image => `
      <li class="image">
        <a class="gallery-link" href="${image.largeImageURL}">
          <img src="${image.webformatURL}" alt="${image.tags}" class="gallery-image" width="360" height="200">
          <div class="imageStats">
            <p><span>Likes</span> ${image.likes}</p>
            <p><span>Views</span> ${image.views}</p>
            <p><span>Comments</span> ${image.comments}</p>
            <p><span>Downloads</span> ${image.downloads}</p>
          </div>
        </a>
      </li>`
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGalleryList() {
  gallery.innerHTML = '';
}
