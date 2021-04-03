import API from './api-service.js';
// import string from './templ-pokemon.js';
import countrieTempl from './templ-countrie.js';
import countriesTempl from './to-ten.js';

import getRefs from '/get-refs.js';

const template = Handlebars.compile(countrieTempl.trim());
const templateTen = Handlebars.compile(countriesTempl.trim());
// console.log(template);
// console.log(templateTen);

const refs = getRefs();
refs.searchForm.addEventListener('submit', onSearch);
// ================================
// const inputRef = document.querySelector('.js-input');
const outputRef = document.querySelector('.js-output');
let inputCbInvocationCounter = 0;

refs.searchForm.addEventListener('input', _.debounce(onInputChange, 300));

function onInputChange(event) {
  inputCbInvocationCounter += 1;

  //   outputRef.textContent = `
  //     Кол-во вызовов onInputChange: ${inputCbInvocationCounter},
  //     Значение: ${event.target.value}
  //   `;
  API.fetchCountries(event.target.value)
    .then(res => {
      console.table('curren number Count:', res.length);
      if (res.length > 10)
        return (refs.cardContainer.innerHTML =
          'Too many matches found. Please enter a more specific query!');

      if (res.length > 1) return renderCountrieTen(res);
      return renderCountrie(res[0]);
    })
    .catch(onFetchError);
  // .finally(() => form.reset());
}
// ================================

// function onSearch(evt) {
function onSearch(evt) {
  evt.preventDefault();
  const form = evt.currentTarget;
  const searchQuery = form.elements.query.value;

  //   API.fetchPokemon(searchQuery)
  //     .then(renderPokemonCard)
  //     .catch(onFetchError)
  //     .finally(() => form.reset());

  API.fetchCountries(searchQuery)
    .then(res => {
      console.table(res);
      return renderCountrie(res[0]);
    })
    .catch(onFetchError)
    .finally(() => form.reset());
}

function onFetchError(error) {
  console.log(error);
  alert('alarm!!!!!!!!!!');
}
// function renderPokemonCard(pokemon) {
//   refs.cardContainer.innerHTML = template(pokemon);
// }
function renderCountrie(countrie) {
  //   console.log(countrie);
  const arrayLang = countrie.languages;
  const pureLangs = arrayLang.map(arrayLang => {
    return arrayLang.name;
  });

  const { name, capital, population, langus = pureLangs, flag } = countrie;

  refs.cardContainer.innerHTML = template({
    name,
    capital,
    population,
    langus,
    flag,
  });
}

function renderCountrieTen(countries) {
  const arrayNames = countries.map(countries => {
    return countries.name;
  });
  // console.log(arrayNames);
  refs.cardContainer.innerHTML = templateTen(arrayNames);
}
