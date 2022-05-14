import './css/styles.css';
import Notiflix, { Notify } from 'notiflix';
import {fetchCountries} from './fetchCountries';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
const refs = {
input: document.querySelector('#search-box'),
countryList:document.querySelector('.country-list'),
countryInfo:document.querySelector('.country-info'),
};

refs.input.addEventListener("input", debounce(onSearch, DEBOUNCE_DELAY));

function clearData() {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
}

function renderCountriesList(countries) {
  clearData()
  const markup = countries.map(({flags, name}) => {
    return `<div class="country-title"><img src="${flags.svg}" width="50px" alt = Flag of ${name.official}>
    <h1 class="item-name">${name.official}</h1></div>`;
}).join('');
refs.countryList.insertAdjacentHTML("beforeend", markup);
}

function renderCountryCard(country){
   refs.countryInfo.innerHTML = `
      <div class="country-title">
      <img src="${country.flags.svg}" width="50px" alt = Flag of ${country.name.official}>
      <h1 class="country-name">${country.name.official}</h1>
      </div>
      <div class="country-info">
      <p><span class="bold">Capital:</span> ${country.capital}</p>
      <p><span class="bold">Population:</span> ${country.population}</p>
      <p><span class="bold">Languages:</span> ${Object.values(country.languages).join(', ')}</p>
      </div>`;
}

function onSearch(e) {
  const inputValue = e.target.value.trim();
  if (inputValue === '') {
    clearData();
    return;
  }
  fetchCountries(inputValue)
    .then(countries => {
      if (countries.length > 10) {
        refs.countryList.innerHTML = '';
        Notiflix.Notify.info('Too many matches found. Please enter a more specific query!');
        return;
      } else if (countries.length >= 2 && countries.length <= 10){
          renderCountriesList(countries);
        } else if (countries.length === 1) {
            clearData();
            renderCountryCard(countries[0]);
            return;
          }
    }).catch(error => {
      refs.countryInfo.innerHTML = '';
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}