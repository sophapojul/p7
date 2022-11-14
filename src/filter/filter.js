// import recipesSearchBySubstring from '../filter/recipesSearchBySubstring.js';
import recipes from '../data/recipes';
import Tag from '../constructor/tag';
import { uniqueArrayValues } from '../utils/functions';

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

/*
/!**
 * It takes an array of recipes and a string pattern, and returns an array of recipes whose description includes the
 * pattern
 * @param {Recipes} recipesArray - an array of objects, each of which represents a recipe.
 * @param {string} pattern - The string to search for in the recipe description.
 * @returns {Recipes} An array of recipes that have a description that includes the pattern.
 *!/
export function getRecipesByDescriptionByLoop(recipesArray, pattern) {
    const patternNormalize = pattern.toNormalize();
    const results = [];
    for (let i = 0; i < recipesArray.length; i += 1) {
        const recipe = recipesArray[i];
        const descriptionNormalize = recipe.description.toNormalize();
        if (descriptionNormalize.includes(patternNormalize)) {
            results.push(recipe);
        }
    }
    return results;
}
*/

/**
 * The function returns an array of recipes that have at least one ingredient that includes the pattern
 * @param {Recipes} recipesArray - an array of objects, each object representing a recipe
 * @param {string} pattern - the string that we want to search for
 * @returns {Recipes} An array of recipes that have an ingredient that includes the pattern.
 */
export function getRecipesByIngredientByLoop(recipesArray, pattern) {
    const patternNormalize = pattern.toNormalize();
    const results = [];
    for (let i = 0; i < recipesArray.length; i += 1) {
        const recipe = recipesArray[i];
        const { ingredients } = recipe;
        for (let j = 0; j < ingredients.length; j += 1) {
            const ingredient = ingredients[j];
            const ingredientNormalize = ingredient.ingredient.toNormalize();
            if (ingredientNormalize.includes(patternNormalize)) {
                results.push(recipe);
                break;
            }
        }
    }
    return results;
}

/*
/!**
 * It takes an array of recipes and a pattern, and returns an array of recipes whose names contain the pattern
 * @param {Recipes} recipesArray - an array of objects, each of which represents a recipe.
 * @param {string} pattern - The string that we want to search for in the recipe name.
 * @returns {Recipes} An array of recipes that have a name that includes the pattern.
 *!/
export function getRecipesByNameByLoop(recipesArray, pattern) {
    const patternNormalize = pattern.toNormalize();
    const results = [];
    for (let i = 0; i < recipesArray.length; i += 1) {
        const recipe = recipesArray[i];
        const nameNormalize = recipe.name.toNormalize();
        if (nameNormalize.includes(patternNormalize)) {
            results.push(recipe);
        }
    }
    return results;
}
*/

/**
 * It filters the recipes array by the appliance substring
 * @param {Recipes} recipesArray - an array of recipes
 * @param {string} pattern - the string you want to search for
 * @returns {Recipes} An array of recipes that have the substring in their appliance property.
 */
export function getRecipesByApplianceByLoop(recipesArray, pattern) {
    const patternNormalize = pattern.toNormalize();
    const results = [];
    for (let i = 0; i < recipesArray.length; i += 1) {
        const recipe = recipesArray[i];
        const applianceNormalize = recipe.appliance.toNormalize();
        if (applianceNormalize.includes(patternNormalize)) {
            results.push(recipe);
        }
    }
    return results;
}

/**
 * It loops through the recipes, and for each recipe, it loops through the utensils, and if the utensil contains the
 * pattern, it adds the recipe to the results
 * @param recipesArray - an array of recipes
 * @param pattern - the pattern to search for
 * @returns An array of recipes that have at least one utensil that matches the pattern.
 */
export function getRecipesByUtensilByLoop(recipesArray, pattern) {
    const patternNormalize = pattern.toNormalize();
    const results = [];
    for (let i = 0; i < recipesArray.length; i += 1) {
        const recipe = recipesArray[i];
        const { utensils } = recipe;
        for (let j = 0; j < utensils.length; j += 1) {
            const utensil = utensils[j];
            const utensilNormalize = utensil.toNormalize();
            if (utensilNormalize.includes(patternNormalize)) {
                results.push(recipe);
                break;
            }
        }
    }
    return results;
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
                getRecipesByIngredientByLoop(recipes, text);
                break;
            case 'appliances':
                getRecipesByApplianceByLoop(recipes, text);
                break;
            case 'utensils':
                getRecipesByUtensilByLoop(recipes, text);
                break;
            default:
                break;
        }
    }
}

/**
 * It returns an array of unique recipes that match the search pattern
 * @param {Recipes} recipesArray - an array of objects, each object is a recipe
 * @param {string} search - the search pattern
 * @returns {Recipes} An array of recipes that match the search pattern.
 */
export function getRecipesByMainSearch(recipesArray, search) {
    const searchNormalize = search.toNormalize();
    const results = [];

    for (let i = 0; i < recipesArray.length; i += 1) {
        const recipe = recipesArray[i];
        const descriptionNormalize = recipe.description.toNormalize();
        const nameNormalize = recipe.name.toNormalize();

        if (
            descriptionNormalize.includes(searchNormalize) ||
            recipe.ingredients.find((ingredient) =>
                ingredient.ingredient.toNormalize().includes(searchNormalize)
            ) ||
            nameNormalize.includes(searchNormalize)
        ) {
            results.push(recipe);
        }
    }
    return results;
}

// export function getRecipesByMainSearch(recipesArray, pattern) {
//     return (
//         getRecipesByDescriptionByLoop(recipesArray, pattern) ||
//         getRecipesByIngredientByLoop(recipesArray, pattern) ||
//         getRecipesByNameByLoop(recipesArray, pattern)
//     );
// }

/**
 * It takes an array of recipes, and returns an array of unique ingredients
 * @param {Recipes} recipesArray - an array of recipes
 * @returns {Array.<string>} An array of ingredients
 */
export function getIngredients(recipesArray) {
    return uniqueArrayValues(
        recipesArray
            .map(({ ingredients }) => ingredients)
            .flatMap((arr) =>
                arr.map((obj) => obj.ingredient.toNormalize().toTitleCase())
            )
    ).sort((a, b) => a.localeCompare(b));
}

/**
 * It takes an array of recipes and returns an array of unique appliances
 * @param {Recipes} recipesArray - an array of recipes
 * @returns {Array.<string>} An array of unique appliances.
 */
export function getAppliances(recipesArray) {
    return uniqueArrayValues(
        recipesArray.map(({ appliance }) =>
            appliance.toNormalize().toTitleCase()
        )
    ).sort((a, b) => a.localeCompare(b));
}

/**
 * It takes an array of recipes, and returns an array of unique utensils
 * @param {Recipes} recipesArray - an array of recipes
 * @returns {Array.<string>} An array of unique utensils
 */
export function getUtensils(recipesArray) {
    return uniqueArrayValues(
        recipesArray
            .map(({ utensils }) => utensils)
            .flatMap((arr) => arr.map((obj) => obj.toNormalize().toTitleCase()))
    ).sort((a, b) => a.localeCompare(b));
}

/**
 * It takes an array of recipes and returns an array of arrays, each of which contains a fieldName and an array of the
 * keywords that are associated with that fieldName
 * @param {Recipes} recipesArray - an array of recipes
 * @returns {Array.<Array>} An array of arrays of advanced search field.
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
 * @param {Recipes} recipesArray - an array of recipes
 * @param {string} tag - the tag.innerText you want to search for
 * @returns {Recipes} An array of recipes that have the tag in their appliances, ingredients, or utensils.
 */
export function getRecipesByTag(recipesArray, tag) {
    return uniqueArrayValues([
        ...getRecipesByApplianceByLoop(recipesArray, tag),
        ...getRecipesByIngredientByLoop(recipesArray, tag),
        ...getRecipesByUtensilByLoop(recipesArray, tag),
    ]);
}
