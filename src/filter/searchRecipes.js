function searchRecipes(arr, substring) {
    return arr.filter(function (recipe) {
        return (
            recipe.name
                .toNormalize()
                .includes(substring.toNormalize()) ||
            recipe.ingredients.find(function (ingredient) {
                return ingredient.ingredient
                    .toNormalize()
                    .includes(substring.toNormalize());
            }) ||
            recipe.description
                .toNormalize()
                .includes(substring.toNormalize())
        );
    });
}

export default searchRecipes;
