import '../css/style.scss';
import './utils/toNormalize';
import recipes from './data/recipes';
import Recipes from './constructor/recipes';
import Tag from './constructor/tag';
import Keyword from './constructor/keyword';
import Dropdown from './constructor/dropdown';
import searchRecipes from './filter/searchRecipes';
import debounce from './utils/debounce';

/**
 * It takes an array of values and returns an array of unique values
 * @param {Array} array
 * @returns {Array}
 */
function uniqueValues(array) {
    return Array.from(new Set(array));
}

/**
 * It takes an array of recipes, and returns an array of unique ingredients
 * @param {Array} recipesArray - an array of recipes
 * @returns {Array} An array of ingredients
 */
function getIngredients(recipesArray) {
    return uniqueValues(
        recipesArray
            .map((recipe) => recipe.ingredients)
            .map((arr) =>
                arr.map((obj) => obj.ingredient.toNormalize().toCapitalize())
            )
            .flat()
    );
}

/**
 * It takes an array of recipes and returns an array of unique appliances
 * @param {Array} recipesArray - an array of recipes
 * @returns {Array} An array of unique appliances.
 */
function getAppliances(recipesArray) {
    return uniqueValues(
        recipesArray
            .map((recipe) => recipe.appliance.toNormalize().toCapitalize())
            .flat()
    );
}

/**
 * It takes an array of recipes, and returns an array of unique utensils
 * @param {Array} recipesArray - an array of recipes
 * @returns {Array} An array of unique utensils
 */
function getUtensils(recipesArray) {
    return uniqueValues(
        recipesArray
            .map((recipe) => recipe.utensils)
            .map((arr) => arr.map((obj) => obj.toNormalize().toCapitalize()))
            .flat()
    );
}

const tagList = document.querySelector('#tag-list');

const keywords = ['ingredients', 'appareils', 'ustensiles'];

/**
 * It takes an array of recipes and returns an array of arrays, each of which contains a keyword and an array of the
 * keywords that are associated with that keyword
 * @param {Array} recipesArray - an array of recipes
 * @returns {Array} An array of arrays.
 */
function getKeywordArray(recipesArray) {
    const ingredients = getIngredients(recipesArray);
    const appliances = getAppliances(recipesArray);
    const utensils = getUtensils(recipesArray);
    return [
        ['ingredients', ingredients],
        ['appareils', appliances],
        ['ustensiles', utensils],
    ];
}

/**
 * It takes in an array of recipes and a search term, and then displays the recipes that match the search term
 * @param {Array} recipesArray - an array of objects that contains all the recipes
 * @param {String} search - the search term
 * @returns {Array} An array of recipes that match the search term.
 */
function filteredRecipesDisplay(recipesArray, search) {
    const { length } = search;
    const ul = document.querySelector('.results__list');
    ul.innerHTML = '';
    let result;
    if (length > 2) {
        result = searchRecipes(recipesArray, search);
        return result.forEach((recipe) => new Recipes(recipe));
    }
    return [];
    // const recipesNumber = document.querySelectorAll(
    //     '.results__list__item'
    // ).length;
    // console.log('recipesNumber: ', recipesNumber);
}

/**
 * It takes the input from the search bar and filters the recipes based on the input
 * @returns {Array} An array of recipes that match the input.
 */
function renderRecipesBySearch() {
    document.querySelector('.search__form__input').addEventListener(
        'input',
        debounce((ev) => {
            ev.preventDefault();
            const query = ev.target.value;
            if (ev.target.length < 3) {
                keywords.forEach((keyword) => {
                    const ul = document.querySelector(`#options-${keyword}`);
                    ul.querySelectorAll(
                        '.dropdown__content__options__item'
                    ).forEach((item) => {
                        const { style } = item;
                        style.display = 'block';
                    });
                });
                return filteredRecipesDisplay(recipes, query);
            }
            filteredRecipesDisplay(recipes, query);
            // TODO set invisible the dropdown items
            return getKeywordArray(searchRecipes(recipes, query)).forEach(
                (keyword) => {
                    const ul = document.querySelector(`#options-${keyword[0]}`);
                    ul.querySelectorAll('li').forEach((item) => {
                        const { innerText, style } = item;
                        if (keyword[1].includes(innerText)) {
                            style.display = 'block';
                        } else {
                            style.display = 'none';
                        }
                    });
                }
            );
        }, 400)
    );
}

// return an array of recipes that match the tags list
/**
 * It takes an array of tags and an array of recipes, and returns an array of recipes that match the tags
 * @param {Array} tags - an array of tags that the user has selected
 * @param {Array} recipesArray - an array of objects that contain the recipes
 */
function getRecipesByTags(tags, recipesArray) {
    let results = [];
    let filteredRecipes = [];
    tags.map((tag) => {
        const result = searchRecipes(recipesArray, tag).map(
            (recipe) => recipe.id
        );
        if (results.length === 0) {
            filteredRecipes = result;
        } else {
            results.concat(result);
            filteredRecipes = result.filter((id) =>
                filteredRecipes.includes(id)
            );
        }
        results = uniqueValues([...results, ...result]);
        return results;
    });
    return filteredRecipes;
}

/**
 *
 * @type {MutationObserver}
 */
const observer = new MutationObserver(() => {
    const ul = document.querySelector('.results__list');
    const tags = Array.from(
        document.querySelectorAll('.search__tag__item')
    ).map((item) => item.textContent);
    ul.innerHTML = '';
    const filteredRecipesByTag = getRecipesByTags(tags, recipes).map((id) =>
        recipes.find((item) => item.id === id)
    );
    filteredRecipesByTag.forEach((recipe) => new Recipes(recipe));
    getKeywordArray(filteredRecipesByTag).forEach((keyword) => {
        const opt = document.querySelector(`#options-${keyword[0]}`);
        opt.querySelectorAll('li').forEach((item) => {
            const { innerText, style } = item;
            if (filteredRecipesByTag.length > 0) {
                if (keyword[1].includes(innerText)) {
                    style.display = 'block';
                } else {
                    style.display = 'none';
                }
            } else {
                style.display = 'block';
            }
        });
    });
});

/**
 * It takes an element as an argument, and when the user clicks on the element, it creates a tag with the text of the element, and it also filters the recipes by the text of the element.
 * @param {HTMLLIElement} elt
 */
function tagSelect(elt) {
    const text = elt.innerText;
    const listTags = Array.from(
        document.querySelectorAll('.search__tag__item')
    );
    if (!listTags.some((tag) => tag.innerText === text)) {
        new Tag(text);
    }
}

observer.observe(tagList, {
    childList: true,
});

renderRecipesBySearch();

/* Creating a new dropdown for each array in the keywordArray. */
getKeywordArray(recipes).forEach((arr) => {
    const keywordItem = new Keyword(...arr);
    const { keyword, options } = keywordItem;
    new Dropdown(keyword, options);
});

/* Adding an event listener to each dropdown item. */
document.querySelectorAll('.dropdown__content__options__item').forEach((li) => {
    li.addEventListener('click', (ev) => {
        tagSelect(ev.target);
    });
});
