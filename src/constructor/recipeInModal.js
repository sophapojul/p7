import Recipes from './recipes';

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
 * We're creating a new function called RecipeInModal that inherits from the Recipes function
 * @param {Recipe} recipe - The recipe object that is passed in from the Recipe class.
 */
export default function RecipeInModal(recipe) {
    Recipes.call(this, recipe);
}
