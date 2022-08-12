//search for a recipe by name or by description or by ingredient with a substring and methods es6
function searchRecipes(arr, substring) {
    if (substring.length < 3) return [];
    return arr.filter(function (recipe) {
            return recipe.name.toLocaleUpperCase().includes(substring.toLocaleUpperCase()) ||
                recipe.ingredients.find(function (ingredient) {
                    return ingredient.ingredient.toLocaleUpperCase().includes(substring.toLocaleUpperCase());
                }) ||
                recipe.description.toLocaleUpperCase().includes(substring.toLocaleUpperCase());
        }
    );
}

export default searchRecipes;