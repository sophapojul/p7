import './toNormalize';
import { getRecipesByTag, setAdvancedSearchField } from '../filter/filter';
import Recipes from '../constructor/recipes';
import Ingredients from '../constructor/ingredients';
import recipes from '../data/recipes';
import RecipeInModal from '../constructor/recipeInModal';

const keywordsArray = ['ingredients', 'appareils', 'ustensiles'];
const modalContainer = document.querySelector('.modal-container');

/**
 * It takes an array of values and returns an array of unique values
 * @param {Array} array
 * @returns {Array}
 */
export function uniqueArrayValues(array) {
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
 * Given an array of recipes and a tag, return an array of the ids of the recipes that have that tag.
 * @param {Recipes} recipesArray - an array of recipes
 * @param {string} tagInnerText - the tag you want to search for
 * @returns An array of recipe ids.
 */
export function getRecipesIdByTag(recipesArray, tagInnerText) {
    return getRecipesByTag(recipesArray, tagInnerText).map(
        (recipe) => recipe.id
    );
}

/**
 * It takes in an array of li elements and an array of keywords, and displays the li elements that contain the keywords
 * @param {Array.<HTMLLIElement>} liArray - an array of all the li elements in the dropdown menu
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
 * It takes a recipe object and an element, creates a new Recipes object, appends it to the element, opens the modal, and
 * creates a new Ingredients object
 * @param {Recipe} recipe - the recipe object
 * @param {HTMLElement} element - The element that the recipe will be appended to.
 */
export function displayRecipe(recipe, element) {
    const recipeItem = new Recipes(recipe);
    recipeItem.appendTo(element);
    recipeItem.openModal();
    const ul = element.querySelector(
        `#${recipeItem.item.id} .results__list__item__content__ingredients`
    );
    new Ingredients(recipeItem.ingredients, ul);
}

/**
 * It takes an array of recipe objects, loops through each object, and creates a new instance of the Recipes class for each
 * object
 * @param {Recipes} recipesArray - an array of objects that contain the data for each recipe
 */
export function displayRecipesByMainSearch(recipesArray) {
    const resultsList = document.querySelector('.results__list');
    if (resultsList) {
        resultsList.innerHTML = '';
    }
    recipesArray.forEach((recipe) => {
        displayRecipe(recipe, resultsList);
    });
}

/**
 * Return a new array containing only the elements that are present in both arrays.
 * @param {Array.<number>} array1 - The first array to be compared.
 * @param {Array.<number>} array2 - The second array to be compared.
 * @returns {Array.<number>} An array containing the elements that are present in both arrays.
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

/**
 * If the key pressed is the escape key and the modal is open, close the modal
 * @param {KeyboardEvent} ev - the event object
 */
export function closeModalByEscape(ev) {
    if (ev.key === 'Escape' && modalContainer.classList.toggle('active')) {
        closeModal();
    }
}

/**
 * If the user presses the Enter key and the modal is open, close the modal
 * @param {KeyboardEvent} ev - the event object
 */
export function closeModalByEnter(ev) {
    if (ev.key === 'Enter' && modalContainer.classList.toggle('active')) {
        closeModal();
    }
}

/**
 * If the target of the click event is the overlay and the modal is active, close the modal
 * @param {PointerEvent} ev - the event object
 */
export function closeModalByClick(ev) {
    if (
        ev.target.classList.contains('overlay') &&
        modalContainer.classList.toggle('active')
    ) {
        closeModal();
    }
}

/**
 * It removes the active class from the modal container, removes the event listeners that were added to the close button,
 * the document, and the modal container, and then returns undefined
 */
export function closeModal() {
    modalContainer.classList.toggle('active');
    document
        .querySelector('.close-modal')
        .removeEventListener('click', closeModal);
    document.removeEventListener('keydown', closeModalByEscape);
    document.removeEventListener('keydown', closeModalByEnter);
    document.removeEventListener('click', closeModalByClick);
}

/**
 * It opens a modal window with a recipe
 * @param {PointerEvent} ev - the event object
 */
export function openModal(ev) {
    const modalContent = document.querySelector('.modal__content');
    const recipeId = ev.currentTarget.id.split('-')[1];
    const recipe = recipes.find((item) => item.id === Number(recipeId));
    const recipeItem = new RecipeInModal(recipe);
    modalContent.innerHTML = '';
    recipeItem.appendTo(modalContent);
    const { ingredients, item } = recipeItem;
    const ul = modalContent.querySelector(
        `#${item.id} .results__list__item__content__ingredients`
    );
    new Ingredients(ingredients, ul);

    modalContainer.classList.toggle('active');
    document
        .querySelector('.close-modal')
        .addEventListener('click', closeModal);
    document.addEventListener('keydown', closeModalByEscape);
    document.addEventListener('keydown', closeModalByEnter);
    document.addEventListener('click', closeModalByClick);
}

export function noResult() {
    const ul = document.querySelector('.results__list');
    ul.innerHTML = '';
    ul.insertAdjacentHTML(
        'afterbegin',
        `<p class="results__list__item__no-result">Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc.</p>`
    );
}
