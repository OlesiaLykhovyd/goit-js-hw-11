import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchQuery } from './fetchImages';
import cardTemplate from './templates/card.hbs';

const lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionType: 'attr',
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});

const formEl = document.getElementById('search-form');
const searchInputEl = document.querySelector('[name="searchQuery"]');
const galleryEl = document.querySelector('.gallery');
const loadMoreEl = document.querySelector('[class="load-more"]');

loadMoreEl.style.display = 'none';

let pageNumber = 1;

formEl.addEventListener('submit', handleSubmit);
loadMoreEl.addEventListener('click', handleClick);

function handleSubmit(e) {
  e.preventDefault();

  pageNumber = 1;

  const form = e.currentTarget;
  const searchQuery = form.elements.searchQuery.value.trim();

  if (searchQuery === '') {
    galleryEl.innerHTML = '';
    return;
  }

  fetchQuery(searchQuery, pageNumber)
    .then(data => {
      if (data.totalHits === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.',
        );
        galleryEl.innerHTML = '';
        loadMoreEl.style.display = 'none';
      } else {
        Notiflix.Notify.info(`Hooray! We found ${data.totalHits} images.`);
        renderCards(data);
        loadMoreEl.style.display = 'block';
      }
    })
    .catch(error => console.log(error));
}

function handleClick() {
  const searchQuery = searchInputEl.value;
  pageNumber += 1;
  fetchQuery(searchQuery, pageNumber)
    .then(data => {
      if (data.hits.length === 0) {
        loadMoreEl.style.display = 'none';
        Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
      }
      renderMoreCards(data);
    })
    .catch(error => console.log(error));
}

function renderCards(cards) {
  const markup = cards.hits
    .map(card => {
      return cardTemplate(card);
    })
    .join('');

  galleryEl.innerHTML = markup;
}

function renderMoreCards(cards) {
  const markup = cards.hits
    .map(card => {
      return cardTemplate(card);
    })
    .join('');

  galleryEl.insertAdjacentHTML('beforeend', markup);
}

// function markup(datas) {
//   return (markup = datas.hits
//     .map(data => {
//       return cardTemplate(data);
//     })
//     .join(''));
// }
