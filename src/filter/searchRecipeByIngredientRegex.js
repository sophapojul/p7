//search for a recipe by ingredient with a regex
import recipes from '../data/recipes.js';

function searchRecipeByIngredientRegex(regex) {
    let result = [];
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
