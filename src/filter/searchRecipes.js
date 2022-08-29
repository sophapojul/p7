/**
 * It returns an array of recipes that have a name, ingredient, or description that includes the substring
 * @param arr - an array of objects
 * @param substring - the string that we want to search for
 * @returns An array of recipes that match the search criteria.
 */
function searchRecipes(arr, substring) {
    return arr.filter(
        (recipe) =>
            recipe.name.toNormalize().includes(substring.toNormalize()) ||
            recipe.ingredients.find((ingredient) =>
                ingredient.ingredient
                    .toNormalize()
                    .includes(substring.toNormalize())
            ) ||
            recipe.description.toNormalize().includes(substring.toNormalize())
    );
}

export default searchRecipes;
