import '../css/style.scss';
import recipes from './data/recipes';
import SearchAdvancedField from './constructor/searchAdvancedField';
import Dropdown from './constructor/dropdown';
import debounce from './utils/debounce';
import observerCallback from './utils/observerCallback';
import {
    displayRecipesByMainSearch,
    displayAdvancedSearchField,
    arrayIntersection,
    uniqueArrayValues,
    getRecipesIdByTag,
    noResult,
} from './utils/functions';
import {
    tagSelect,
    getRecipesByMainSearch,
    setAdvancedSearchField,
    getUtensils,
    getIngredients,
    getAppliances,
    getRecipesByTag,
} from './filter/filter';

const mainSearchInput = document.querySelector('.search__form__input');
const tagList = document.querySelector('#tag__list');

/* Creating a new dropdown for each array in the advanced search field array. */
setAdvancedSearchField(recipes).forEach((arr) => {
    const searchAdvancedFieldItem = new SearchAdvancedField(...arr);
    const { fieldName, options } = searchAdvancedFieldItem;
    new Dropdown(fieldName, options);
});

const advancedSearchFieldInputList = document.querySelectorAll(
    '.dropdown__content__input'
);
const keywordList = document.querySelectorAll(
    '.dropdown__content__options__item'
);

const config = {
    childList: true,
    subtree: true,
};

/**
 *
 * @type {MutationObserver}
 */
const observer = new MutationObserver(observerCallback);

observer.observe(tagList, config);

/* Adding an event listener to each li element in the keywordList. */
keywordList.forEach((li) => {
    li.addEventListener('click', (ev) => {
        const { target } = ev;
        tagSelect(target);
        target.parentElement.parentElement.firstElementChild.value = '';
    });
});

// display all keywords in the advanced search field
displayAdvancedSearchField(recipes);

// get the filtered recipes from the main search term;
mainSearchInput.addEventListener(
    'input',
    debounce((ev) => {
        ev.preventDefault();
        const query = ev.target.value.toNormalize();
        const tagsList = Array.from(tagList.children);
        const resultList = document.querySelector('.results__list');
        if (query.length > 2) {
            if (tagsList.length === 0) {
                if (getRecipesByMainSearch(recipes, query).length > 0) {
                    // display the recipes filtered by the main search term;
                    displayRecipesByMainSearch(
                        getRecipesByMainSearch(recipes, query)
                    );
                    // display the options filtered by the main search term for each fieldName;
                    displayAdvancedSearchField(
                        getRecipesByMainSearch(recipes, query)
                    );
                } else {
                    noResult();
                }
            } else {
                // get recipes by intersection of getRecipesByMainSearch(recipes, query) et getRecipesByTags
                const recipesIdByMainSearch = getRecipesByMainSearch(
                    recipes,
                    query
                ).map((recipe) => recipe.id);
                const recipesIdByTag = uniqueArrayValues(
                    tagsList
                        .map((tag) => tag.innerText)
                        .reduce(
                            (acc, tag) =>
                                uniqueArrayValues(
                                    arrayIntersection(
                                        [
                                            ...getRecipesByTag(
                                                recipes,
                                                tag
                                            ).map((recipe) => recipe.id),
                                            acc,
                                        ],
                                        acc
                                    )
                                ).flat(),
                            []
                        )
                );
                const result = arrayIntersection(
                    recipesIdByTag,
                    recipesIdByMainSearch
                ).map((id) => recipes.find((recipe) => recipe.id === id));
                if (result.length > 0) {
                    displayRecipesByMainSearch(result);
                    displayAdvancedSearchField(result);
                } else {
                    noResult();
                }
            }
        } else if (tagsList.length > 0) {
            const resultId = uniqueArrayValues(
                tagsList
                    .map((tag) => tag.innerText)
                    .reduce(
                        (acc, tag) =>
                            uniqueArrayValues([
                                ...arrayIntersection(
                                    acc,
                                    getRecipesIdByTag(recipes, tag)
                                ),
                                acc,
                            ]).flat(),
                        getRecipesIdByTag(recipes, tagsList[0].innerText)
                    )
            );
            const result = resultId.map((id) =>
                recipes.find((recipe) => recipe.id === id)
            );
            if (result.length > 0) {
                displayRecipesByMainSearch(result);
                displayAdvancedSearchField(result);
            } else {
                noResult();
            }
        } else {
            resultList.innerHTML = '';
            noResult();
        }
    }, 400)
);

// get the filtered recipes from each advanced search field;
advancedSearchFieldInputList.forEach((input) => {
    input.addEventListener('input', (ev) => {
        ev.preventDefault();
        const search = document
            .querySelector('.search__form__input')
            .value.toNormalize();
        const query = ev.target.value.toNormalize();
        const fieldName = ev.target.parentElement.parentElement.id;
        const ul = document.querySelector(`#options-${fieldName}`);
        const liArray = Array.from(ul.querySelectorAll('li'));
        let liFiltered;
        switch (fieldName) {
            case 'ingredients':
                liFiltered = liArray.filter((li) =>
                    getIngredients(
                        getRecipesByMainSearch(recipes, search)
                    ).includes(li.innerText)
                );
                break;
            case 'appareils':
                liFiltered = liArray.filter((li) =>
                    getAppliances(
                        getRecipesByMainSearch(recipes, search)
                    ).includes(li.innerText)
                );
                break;
            case 'ustensiles':
                liFiltered = liArray.filter((li) =>
                    getUtensils(
                        getRecipesByMainSearch(recipes, search)
                    ).includes(li.innerText)
                );
                break;
            default:
                break;
        }
        liFiltered.forEach((li) => {
            const { innerText, style } = li;
            if (innerText.toNormalize().includes(query)) {
                style.display = 'block';
            } else {
                style.display = 'none';
            }
        });
    });
});
