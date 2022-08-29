// search for a recipe by ingredient with a regex
import recipes from '../data/recipes';

/**
 * It loops through all the recipes, and for each recipe, it loops through all the ingredients, and if the ingredient
 * matches the regex, it adds the recipe to the result array
 * @param {RegExp} regex - a regular expression that will be used to search for recipes.
 * @returns {Array} An array of recipes that contain the ingredient that matches the regex.
 */
export default function searchRecipeByIngredientRegex(regex) {
    const result = [];
    for (let i = 0; i < recipes.length; i++) {
        for (let j = 0; j < recipes[i].ingredients.length; j++) {
            if (
                recipes[i].ingredients[j].ingredient.toLowerCase().match(regex)
            ) {
                result.push(recipes[i]);
            }
        }
    }
    return result;
}
