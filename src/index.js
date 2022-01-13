// import './css/styles.css';
// import debounce from 'lodash.debounce';
// import Notiflix from 'notiflix';
// import { fetchCountries } from './fetchCountries';

// const inputEl = document.getElementById('search-box');
// const countryListEl = document.querySelector('.country-list');
// const countryInfoEl = document.querySelector('.country-info');

// const DEBOUNCE_DELAY = 300;

// inputEl.addEventListener('input', debounce(handleInput, DEBOUNCE_DELAY));

// function handleInput(e) {
//   const inputValue = e.target.value.trim();
//   if (inputValue === '') {
//     cleanList();
//     return;
//   }

//   fetchCountries(inputValue).then(data => {
//     if (data.status === 404) {
//       cleanList();
//       Notiflix.Notify.failure('"Oops, there is no country with that name"');
//     } else if (data.length > 10) {
//       cleanList();
//       Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
//     } else if (data.length >= 2 && data.length <= 10) {
//       renderCountryList(data);
//     } else if (data.length === 1) {
//       renderCountryInfo(data);
//     }
//   });
// }

// function cleanList() {
//   countryInfoEl.innerHTML = '';
//   countryListEl.innerHTML = '';
// }

// function renderCountryList(countries) {
//   countryInfoEl.innerHTML = '';
//   const markup = countries
//     .map(country => {
//       return `<li class="country-list_item">
//       <img class="country-list_img" src="${country.flags.svg}" width="30px">
//       <b>${country.name.official}</b>
//       </li>`;
//     })
//     .join('');
//   countryListEl.innerHTML = markup;
// }

// function renderCountryInfo(countries) {
//   countryListEl.innerHTML = '';
//   const markup = countries
//     .map(country => {
//       return `
//   <img src="${country.flags.svg}" width="30px">
//   <b>${country.name.official}</b>
//   <p><b>Capital</b>: ${country.capital}</p>
//   <p><b>Population</b>: ${country.population}</p>
//   <p><b>Languages</b>: ${Object.values(country.languages)}</p>
// `;
//     })
//     .join('');

//   countryInfoEl.innerHTML = markup;
// }
