// import recipesSearchBySubstring from '../filter/recipesSearchBySubstring.js';
import recipes from '../data/recipes';
import Tag from '../constructor/tag';
import { uniqueValues } from '../utils/functions';

/**
 * @typedef {Array.<Object>} Ingredients
 * @property {string} ingredient - The name of the ingredient.
 * @property {number} [quantity] - The quantity of the ingredient.
 * @property {string} [unit] - The unit of the ingredient.
 */

/**
 * @typedef {Array.<Object>} Recipes
 * @property {number} id - The id of the recipe.
 * @property {string} name - The name of the recipe.
 * @property {number} servings - The number of servings the recipe makes.
 * @property {Ingredients} ingredients - An array of ingredients.
 * @property {number} time - The time it takes to make the recipe.
 * @property {string} description - A description of the recipe.
 * @property {string} appliance - The appliance used to make the recipe.
 * @property {string[]} utensils - An array of utensils used to make the recipe.
 */

/**
 * It takes an array of recipes and a pattern, and returns an array of recipes whose names contain the pattern
 * @param {Recipes} recipesArray - an array of objects, each of which represents a recipe.
 * @param {string} pattern - The string that we want to search for in the recipe name.
 * @returns {Recipes} An array of recipes that have a name that includes the pattern.
 */
function getRecipesByName(recipesArray, pattern) {
    return recipesArray.filter(({ name }) =>
        name.toNormalize().includes(pattern.toNormalize())
    );
}

/**
 * The function returns an array of recipes that have at least one ingredient that includes the pattern
 * @param {Recipes} recipesArray - an array of objects, each object representing a recipe
 * @param {string} pattern - the string that we want to search for
 * @returns {Recipes} An array of recipes that have an ingredient that includes the pattern.
 */
export function getRecipesByIngredient(recipesArray, pattern) {
    return recipesArray.filter(({ ingredients }) =>
        ingredients.find(({ ingredient }) =>
            ingredient.toNormalize().includes(pattern.toNormalize())
        )
    );
}

/**
 * It filters the recipes array by the appliance substring
 * @param {Recipes} recipesArray - an array of recipes
 * @param {string} substring - the string you want to search for
 * @returns {Recipes} An array of recipes that have the substring in their appliance property.
 */
export function getRecipesByAppliance(recipesArray, substring) {
    return recipesArray.filter(({ appliance }) =>
        appliance.toNormalize().includes(substring.toNormalize())
    );
}

/**
 * It filters the recipesArray to return only the recipes that have a utensil that includes the substring
 * @param {Recipes} recipesArray - an array of recipes
 * @param {string} substring - the string you want to search for
 * @returns {Recipes} An array of recipes that have a utensil that includes the substring.
 */
export function getRecipesByUtensil(recipesArray, substring) {
    return recipesArray.filter(({ utensils }) =>
        utensils.find((item) =>
            item.toNormalize().includes(substring.toNormalize())
        )
    );
}

/**
 * It takes an element as an argument, and when the user clicks on the element, it creates a tag with the text of the element, and it also filters the recipes by the text of the element.
 * @param {HTMLLIElement} elt
 */
export function tagSelect(elt) {
    const text = elt.innerText.toNormalize();
    const classElt = elt.parentElement.parentElement.classList[1];
    const listTags = Array.from(
        document.querySelectorAll('.search__tag__item')
    );
    if (!listTags.some((tag) => tag.innerText === text)) {
        new Tag(text, classElt);
        switch (classElt) {
            case 'ingredients':
                getRecipesByIngredient(recipes, text);
                break;
            case 'appliances':
                getRecipesByAppliance(recipes, text);
                break;
            case 'utensils':
                getRecipesByUtensil(recipes, text);
                break;
            default:
                break;
        }
    }
}

/**
 * It takes an array of recipes and a string pattern, and returns an array of recipes whose description includes the
 * pattern
 * @param {Recipes} recipesArray - an array of objects, each of which represents a recipe.
 * @param {string} pattern - The string to search for in the recipe description.
 * @returns {Recipes} An array of recipes that have a description that includes the pattern.
 */
function getRecipesByDescription(recipesArray, pattern) {
    return recipesArray.filter(({ description }) =>
        description.toNormalize().includes(pattern.toNormalize())
    );
}

/**
 * It returns an array of unique recipes that match the search pattern
 * @param {Recipes} recipesArray - an array of objects, each object is a recipe
 * @param {string} pattern - the search pattern
 * @returns {Recipes} An array of recipes that match the search pattern.
 */
export function getRecipesByMainSearch(recipesArray, pattern) {
    return [
        ...new Set([
            ...getRecipesByName(recipesArray, pattern),
            ...getRecipesByIngredient(recipesArray, pattern),
            ...getRecipesByDescription(recipesArray, pattern),
        ]),
    ];
}

/**
 * It takes an array of recipes, and returns an array of unique ingredients
 * @param {Recipes} recipesArray - an array of recipes
 * @returns {Array} An array of ingredients
 */
export function getIngredients(recipesArray) {
    return uniqueValues(
        recipesArray
            .map(({ ingredients }) => ingredients)
            .flatMap((arr) =>
                arr.map((obj) => obj.ingredient.toNormalize().toTitleCase())
            )
    );
}

/**
 * It takes an array of recipes and returns an array of unique appliances
 * @param {Recipes} recipesArray - an array of recipes
 * @returns {Array} An array of unique appliances.
 */
export function getAppliances(recipesArray) {
    return uniqueValues(
        recipesArray.map(({ appliance }) =>
            appliance.toNormalize().toTitleCase()
        )
    );
}

/**
 * It takes an array of recipes, and returns an array of unique utensils
 * @param {Recipes} recipesArray - an array of recipes
 * @returns {Array} An array of unique utensils
 */
export function getUtensils(recipesArray) {
    return uniqueValues(
        recipesArray
            .map(({ utensils }) => utensils)
            .flatMap((arr) => arr.map((obj) => obj.toNormalize().toTitleCase()))
    );
}

/**
 * It takes an array of recipes and returns an array of arrays, each of which contains a fieldName and an array of the
 * keywords that are associated with that fieldName
 * @param {Recipes} recipesArray - an array of recipes
 * @returns {Array} An array of arrays of advanced search field.
 */
export function setAdvancedSearchField(recipesArray) {
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
 * It returns an array of unique recipes that have the given tag in their appliances, ingredients, or utensils
 * @param {Array.<Object>} recipesArray - an array of recipes
 * @param {string} tag - the tag.innerText you want to search for
 * @returns {Array.<Object>} An array of recipes that have the tag in their appliances, ingredients, or utensils.
 */
export function getRecipesByTag(recipesArray, tag) {
    return [
        ...new Set([
            ...getRecipesByAppliance(recipesArray, tag),
            ...getRecipesByIngredient(recipesArray, tag),
            ...getRecipesByUtensil(recipesArray, tag),
        ]),
    ];
}
