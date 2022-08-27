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
