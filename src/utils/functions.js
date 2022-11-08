import './toNormalize';
import { setAdvancedSearchField } from '../filter/filter';
import Recipes from '../constructor/recipes';

const keywordsArray = ['ingredients', 'appareils', 'ustensiles'];
const modalContainer = document.querySelector('.modal-container');

/**
 * It takes an array as an argument, and returns a new array with all the duplicate values removed.
 * @param { Array } array - The array to be filtered.
 * @returns { Array } The filtered array.
 */
export function uniqueArrayValues(array) {
    return Array.from(new Set(array));
}

/**
 * It takes an array of values and returns an array of unique values
 * @param {Array} array
 * @returns {Array}
 */
export function uniqueValues(array) {
    return Array.from(new Set(array));
}

/**
 * @typedef {Array.<Object>} Ingredients
 * @property {string} ingredient - The name of the ingredient.
 * @property {number} [quantity] - The quantity of the ingredient.
 * @property {string} [unit] - The unit of the ingredient.
 */

/**
 * @typedef {Array.<Object>} Recipe
 * @property {number} id - The id of the recipe.
 * @property {string} name - The name of the recipe.
 * @property {number} servings - The number of servings the recipe makes.
 * @property {Ingredients} ingredients - An array of ingredients.
 * @property {number} time - The time it takes to make the recipe.
 * @property {string} description - A description of the recipe.
 * @property {string} appliance - The appliance used to make the recipe.
 * @property {Array.<string>} utensils - An array of utensils used to make the recipe.
 */

/**
 * It returns a clone of the template element with the given id
 * @param {string} id - The id of the template element.
 * @returns { DocumentFragment } A clone of the template element with the id of id.
 */
export function cloneTemplate(id) {
    return document.getElementById(id).content.cloneNode(true);
}

/**
 * It takes in an array of li elements and an array of keywords, and displays the li elements that contain the keywords
 * @param {Array} liArray - an array of all the li elements in the dropdown menu
 * @param {Array} keywordArray - an array of keywords that the user has typed in the search bar.
 */
export function displayKeywordsByMainSearch(liArray, keywordArray) {
    liArray.forEach((keyword) => {
        const { innerText, style } = keyword;
        if (keywordArray[1].includes(innerText)) {
            style.display = 'block';
        } else {
            style.display = 'none';
        }
    });
}

/**
 * It takes an array of recipes and returns an array of arrays, each of which contains a keyword and an array of the values
 * of that keyword
 * @param {Recipes} recipesArray - an array of objects that contains all the recipes
 */
export function displayAdvancedSearchField(recipesArray) {
    const advancedSearchField = setAdvancedSearchField(recipesArray);
    advancedSearchField.forEach((field) => {
        const ulKeyword = document.querySelector(`#options-${field[0]}`);
        const liArray = Array.from(ulKeyword.querySelectorAll('li'));
        displayKeywordsByMainSearch(liArray, field);
    });
}

/**
 * It takes an array of recipe objects, loops through each object, and creates a new instance of the Recipes class for each
 * object
 * @param {Recipes} recipesArray - an array of objects that contain the data for each recipe
 */
export function displayRecipesByMainSearch(recipesArray) {
    if (document.querySelector('.results__list')) {
        document.querySelector('.results__list').innerHTML = '';
    }
    recipesArray.forEach((recipe) => {
        new Recipes(recipe);
        // recipe.addEventListener('click', recipeListener);
    });
}

/**
 * Return a new array containing only the elements that are present in both arrays.
 * @param {Array.<number> || Array.<Object> } array1 - The first array to be compared.
 * @param {Array.<number> || Array.<Object> } array2 - The second array to be compared.
 * @returns {Array.<number> || Array.<Object>} An array containing the elements that are present in both arrays.
 */
export function arrayIntersection(array1, array2) {
    return array1.filter((value) => array2.includes(value));
}

/**
 * It removes the style attribute from all the list items in the unordered lists with the id options-keyword
 */
export function removeKeywords() {
    keywordsArray.forEach((keyword) => {
        const ul = document.querySelector(`#options-${keyword}`);
        const liArray = Array.from(ul.querySelectorAll('li'));
        liArray.forEach((li) => {
            li.removeAttribute('style');
        });
    });
}

export function closeModalByEscape(ev) {
    if (ev.key === 'Escape' && modalContainer.classList.toggle('active')) {
        closeModal();
    }
}

export function closeModalByEnter(ev) {
    if (ev.key === 'Enter' && modalContainer.classList.toggle('active')) {
        closeModal();
    }
}

export function closeModalByClick(ev) {
    if (
        ev.target.classList.contains('overlay') &&
        modalContainer.classList.toggle('active')
    ) {
        closeModal();
    }
}

export function closeModal() {
    modalContainer.classList.toggle('active');
    document
        .querySelector('.close-modal')
        .removeEventListener('click', closeModal);
    document.removeEventListener('keydown', closeModalByEscape);
    document.removeEventListener('keydown', closeModalByEnter);
    document.removeEventListener('click', closeModalByClick);
}

export function openModal() {
    // const modalContent = document.querySelector('.modal__content');
    modalContainer.classList.toggle('active');
    document
        .querySelector('.close-modal')
        .addEventListener('click', closeModal);
    document.addEventListener('keydown', closeModalByEscape);
    document.addEventListener('keydown', closeModalByEnter);
    document.addEventListener('click', closeModalByClick);
}

export function removeDisplayedRecipes() {
    const displayedRecipes = document.querySelectorAll('.results__list__item');
    displayedRecipes.forEach((recipe) => {
        recipe.remove();
        // removeKeywords();
    });
}

export function noResult() {
    const ul = document.querySelector('.results__list');
    if (ul.innerHTML === '') {
        ul.innerHTML = `<li class="results__list__item">Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc.</li>`;
    }
}
