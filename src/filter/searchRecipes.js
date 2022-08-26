function searchRecipes(arr, substring) {
    return arr.filter(function (recipe) {
        return (
            recipe.name
                .toLocaleUpperCase()
                .includes(substring.toLocaleUpperCase()) ||
            recipe.ingredients.find(function (ingredient) {
                return ingredient.ingredient
                    .toLocaleUpperCase()
                    .includes(substring.toLocaleUpperCase());
            }) ||
            recipe.description
                .toLocaleUpperCase()
                .includes(substring.toLocaleUpperCase())
        );
    });
}

export default searchRecipes;
