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
const target = document.querySelector('.target');

let pageNumber = null;

formEl.addEventListener('submit', handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  observer.unobserve(target);
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
      } else {
        Notiflix.Notify.info(`Hooray! We found ${data.totalHits} images.`);
        renderCards(data);
        observer.observe(target);
      }
    })
    .catch(error => console.log(error));
}

/////////////////////// render cards
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

/////////////////infinitive scroll

const options = {
  root: null,
  rootMargin: '300px',
  threshold: 0.25,
};

function updateList(entries) {
  const searchQuery = searchInputEl.value;
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      pageNumber += 1;
      fetchQuery(searchQuery, pageNumber)
        .then(data => {
          if (data.hits.length === 0) {
            Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
          }
          renderMoreCards(data);
          lightbox.refresh();
        })
        .catch(error => console.log(error));
    }
  });
}

const observer = new IntersectionObserver(updateList, options);
