import '../css/style.scss';
import './utils/toNormalize.js';
import './utils/toCapitalize.js';
import recipes from './data/recipes.js';
import Recipes from './constructor/recipes.js';
import Tag from './constructor/tag.js';
import Keyword from './constructor/keyword.js';
import Dropdown from './constructor/dropdown.js';
import searchRecipes from './filter/searchRecipes.js';

/**
 * It takes an array of values and returns an array of unique values
 * @param {Array} array
 * @returns {any[]}
 */
function uniqueValues(array) {
    return Array.from(new Set(array));
}

/**
 * It takes an array of recipes, and returns an array of unique ingredients
 * @param recipesArray - an array of recipes
 * @returns An array of ingredients
 */
function getIngredients(recipesArray) {
    const ingredients = uniqueValues(
        recipesArray
            .map((recipe) => recipe.ingredients)
            .map((arr) =>
                arr.map((obj) => obj.ingredient.toNormalize().toCapitalize())
            )
            .flat()
    );
    return ingredients;
}

/**
 * It takes an array of recipes and returns an array of unique appliances
 * @param recipesArray - an array of recipes
 * @returns An array of unique appliances.
 */
function getAppliances(recipesArray) {
    const appliances = uniqueValues(
        recipesArray
            .map((recipe) => recipe.appliance.toNormalize().toCapitalize())
            .flat()
    );
    return appliances;
}

/**
 * It takes an array of recipes, and returns an array of unique utensils
 * @param recipesArray - an array of recipes
 * @returns An array of unique utensils
 */
function getUtensils(recipesArray) {
    const utensils = uniqueValues(
        recipesArray
            .map((recipe) => recipe.utensils)
            .map((arr) => arr.map((obj) => obj.toNormalize().toCapitalize()))
            .flat()
    );
    return utensils;
}

const tagList = document.querySelector('#tag-list');

const keywords = ['ingredients', 'appareils', 'ustensiles'];

const keywordArray = [
    ['Ingrédients', getIngredients(recipes)],
    ['Appareils', getAppliances(recipes)],
    ['Ustensiles', getUtensils(recipes)],
];

const optionsListObj = {};
const optionsListArray = [getIngredients(recipes), getAppliances(recipes), getUtensils(recipes)];
const keywordObject = Object.assign(optionsListObj, optionsListArray);

/**
 * It takes in an array of recipes and a search term, and then displays the recipes that match the search term
 * @param recipesArray - an array of objects that contains all the recipes
 * @param search - the search term
 */
function filteredRecipesDisplay(recipesArray, search) {
    let result;
    search.length > 2
        ? (result = searchRecipes(recipesArray, search))
        : (result = []);
    const ul = document.querySelector('.results__list');
    ul.innerHTML = '';
    search.length > 2 ? result.forEach((recipe) => new Recipes(recipe)) : '';
    // calculate number of recipes
    const recipesNumber = document.querySelectorAll(
        '.results__list__item'
    ).length;
    console.log('recipesNumber: ', recipesNumber);
}
/**
 * It takes an array of keywords, and when the user types in the search bar, it filters the recipes and displays them, and
 * it also filters the dropdown items
 * @param keywordArray - an array of arrays, each containing a keyword and an array of values
 * @returns the filtered recipes.
 */
function renderRecipesBySearch(keywordArray) {
    document
        .querySelector('.search__form__input')
        .addEventListener('input', function (ev) {
            ev.preventDefault();
            if (ev.target.value.length < 3) {
                keywords.forEach((keyword) => {
                    const ul = document.querySelector(`#options-${keyword}`);
                    ul.querySelectorAll(
                        '.dropdown__content__options__item'
                    ).forEach((item) => {
                        item.style.display = 'block';
                    });
                });
                return filteredRecipesDisplay(recipes, ev.target.value);
            }
            filteredRecipesDisplay(recipes, ev.target.value);
            const ingredients = getIngredients(
                searchRecipes(recipes, ev.target.value),
                ev.target.value
            );
            const appliances = getAppliances(
                searchRecipes(recipes, ev.target.value),
                ev.target.value
            );
            const utensils = getUtensils(
                searchRecipes(recipes, ev.target.value),
                ev.target.value
            );
            keywordArray = [
                ['ingredients', ingredients],
                ['appareils', appliances],
                ['ustensiles', utensils],
            ];
            // TODO set invisible the dropdown items
            keywordArray.forEach((keyword) => {
                const ul = document.querySelector(`#options-${keyword[0]}`);
                ul.querySelectorAll('li').forEach((item) => {
                    if (keyword[1].includes(item.innerText)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
}

/**
 *
 * @type {MutationObserver}
 */
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        console.log('mutation: ', mutation);
        if (mutation.addedNodes.length > 0) {
            console.log(
                'mutation.addedNodes: ',
                mutation.addedNodes[1].childNodes[1].textContent
            );
            const addedTag = mutation.addedNodes[1].childNodes[1].textContent;
            console.log('addedTag: ', addedTag);
        }
        if (mutation.removedNodes.length > 0) {
            console.log(
                'mutation.removedNodes: ',
                mutation.removedNodes[0].childNodes[1].textContent
            );
            const removedTag =
                mutation.removedNodes[0].childNodes[1].textContent;
            console.log('removedTag: ', removedTag);
        }
    });
});

observer.observe(tagList, {
    childList: true,
    subtree: true,
});

/**
 * It takes an element as an argument, and when the user clicks on the element, it creates a tag with the text of the element, and it also filters the recipes by the text of the element.
 * @param elt
 */
function tagSelect(elt) {
    const text = elt.innerText;
    const listTags = Array.from(
        document.querySelectorAll('.search__tag__item')
    );
    if (listTags.length > 0) {
        listTags.some((tag) => tag.innerText === text) ? null : new Tag(text);
    } else {
        new Tag(text);
    }
    const tags = listTags.map((tag) => tag.innerText);
    if (tags.length > 0) {
        const results = [];
        tags.map((tag) => {
            const result = searchRecipes(recipes, tag);
            results.push(result);
            console.log('result: ', result);
            const resultRecipes = results.reduce((a, b) =>
                a.filter((x) => b.includes(x))
            );
            console.log('resultRecipes: ', resultRecipes);
        });
    }
    let tagList = document.querySelector('#tag-list');
    console.log('tagList: ', tagList);
    // observer.observe(tagList, {
    //     childList: true,
    // });
    filteredRecipesDisplay(recipes, text); // filter all keywords
}

renderRecipesBySearch();

/* Creating a new dropdown for each array in the keywordArray. */
keywordArray.forEach((arr) => {
    const keywordItem = new Keyword(...arr);
    const { keyword, options } = keywordItem;
    new Dropdown(keyword, options);
});

/* Adding an event listener to each dropdown item. */
document.querySelectorAll('.dropdown__content__options__item').forEach((li) => {
    li.addEventListener('click', function () {
        tagSelect(this);
    });
});

/**
 * Return an array of recipes that contain the ingredient passed in.
 * @param {String} ingredient - the ingredient you want to search for
 * @param {Array} recipesArray - an array of recipes
 * @returns {Array} An array of recipes that contain the ingredient.
 */
function getRecipesByIngredient(ingredient, recipesArray) {
    const recipes = recipesArray.filter((recipe) =>
        recipe.ingredients.some(
            (ingredient) => ingredient.ingredient === ingredient
        )
    );
    return recipes;
}
