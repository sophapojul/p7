import { getRecipesByMainSearch, getRecipesByTag } from '../filter/filter';
import recipes from '../data/recipes';
import {
    arrayIntersection,
    displayAdvancedSearchField,
    displayRecipe,
    getRecipesIdByTag,
} from './functions';

/**
 *
 * @param {NodeList} mutations
 */

export default function observerCallback(mutations) {
    let recipesListByTags = [];

    mutations.forEach((mutation) => {
        const { addedNodes, removedNodes } = mutation;
        // get the list of tag(s) selected;
        const selectedTagsInnerText = Array.from(
            mutation.target.children
        ).flatMap((child) => child.innerText);
        const mainSearchInputValue = document
            .querySelector('.search__form__input')
            .value.toNormalize();
        const ul = document.querySelector('.results__list');
        // get the list of displayed recipes id;
        const recipesIdList = Array.from(
            ul.querySelectorAll('.results__list__item')
        ).map((recipe) => parseInt(recipe.id.split('-')[1], 10));
        ul.innerHTML = '';
        if (addedNodes.length > 0) {
            const lastTagInnerText = addedNodes[1].firstElementChild.innerText;
            // get the list of recipes id that match the tags list
            if (recipesListByTags.length === 0) {
                recipesListByTags = getRecipesByTag(recipes, lastTagInnerText);
            } else {
                recipesListByTags = getRecipesByTag(
                    recipesListByTags,
                    lastTagInnerText
                );
            }
            if (mainSearchInputValue === '') {
                if (selectedTagsInnerText.length === 1) {
                    // display the recipes that match the tags list;
                    recipesListByTags.forEach((recipe) => {
                        displayRecipe(recipe, ul);
                    });
                    // get the list of ingredients, appliances and utensils that match the search term and the tags
                    displayAdvancedSearchField(recipesListByTags);
                } else {
                    const recipesIdListByTags = recipesListByTags.map(
                        (recipe) => recipe.id
                    );
                    const filteredRecipes = arrayIntersection(
                        recipesIdList,
                        recipesIdListByTags
                    ).flatMap((id) =>
                        recipes.find((recipe) => recipe.id === id)
                    );
                    filteredRecipes.forEach((recipe) => {
                        displayRecipe(recipe, ul);
                    });
                    displayAdvancedSearchField(filteredRecipes);
                }
            } else {
                const recipesIdListByTags = recipesListByTags.map(
                    (recipe) => recipe.id
                );
                // intersection of the two lists of recipes id;
                const filteredIdRecipes = arrayIntersection(
                    recipesIdList,
                    recipesIdListByTags
                );
                // get the list of recipes that match the search term and the tags
                const filteredRecipes = filteredIdRecipes.flatMap((id) =>
                    recipes.filter((recipe) => recipe.id === id)
                );
                // display the recipes
                filteredRecipes.forEach((recipe) => {
                    displayRecipe(recipe, ul);
                });
                if (
                    mainSearchInputValue !== '' ||
                    selectedTagsInnerText.length > 1
                ) {
                    // get the list of ingredients, appliances and utensils that match the search term and the tags
                    displayAdvancedSearchField(filteredRecipes);
                }
            }
        } else if (removedNodes.length > 0) {
            if (selectedTagsInnerText.length !== 0) {
                // get the list of recipes id that match the tags list and the search term
                const recipesByTags = selectedTagsInnerText
                    .reduce(
                        (acc, tagInnerText) =>
                            arrayIntersection(
                                acc,
                                getRecipesIdByTag(recipes, tagInnerText)
                            ),
                        getRecipesIdByTag(recipes, selectedTagsInnerText[0])
                    )
                    .flatMap((id) =>
                        recipes.filter((recipe) => recipe.id === id)
                    );
                if (ul.querySelector('.results__list__item__no-result')) {
                    ul.removeChild(
                        ul.querySelector('.results__list__item__no-result')
                    );
                }

                recipesByTags.forEach((recipe) => {
                    displayRecipe(recipe, ul);
                });
                // get the list of ingredients, appliances and utensils that match the search term and the tags
                displayAdvancedSearchField(recipesByTags);
            } else if (mainSearchInputValue.length > 2) {
                getRecipesByMainSearch(recipes, mainSearchInputValue).forEach(
                    (recipe) => {
                        displayRecipe(recipe, ul);
                    }
                );
                // get the list of ingredients, appliances and utensils that match the search term
                displayAdvancedSearchField(
                    getRecipesByMainSearch(recipes, mainSearchInputValue)
                );
            } else {
                displayAdvancedSearchField(recipes);
                ul.querySelector('.results__list__item__no-result')?.remove();
            }
        }
    });
}
