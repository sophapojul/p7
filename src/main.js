import '/src/assets/css/style.scss';
import '/src/utils/toNormalize.js';
import '/src/utils/toCapitalize.js';
import recipes from './data/recipes.js';
import Recipes from './constructor/recipes.js';
import Tag from './constructor/tag.js';
import searchRecipes from './filter/searchRecipes.js';
import Keyword from './constructor/keyword.js';
import Dropdown from './constructor/dropdown.js';

// filter unique values in array
function uniqueValues(array) {
    return Array.from(new Set(array));
}

const keywords = ['ingredients', 'appareils', 'ustensiles'];
const tagList = document.querySelector('#tag-list');

const ingredients = uniqueValues(
    { recipes }.recipes
        .map((recipe) =>
            recipe.ingredients.map((ingredient) => ingredient.ingredient)
        )
        .flat()
        .map((ingredient) => ingredient.toCapitalize())
);
const appliances = uniqueValues(
    { recipes }.recipes
        .map((recipe) => recipe.appliance)
        .flat()
        .map((appliance) => appliance.toCapitalize())
);
const utensils = uniqueValues(
    { recipes }.recipes
        .map((recipe) => recipe.utensils)
        .flat()
        .map((obj) => obj.toCapitalize())
);
const keywordArray = [
    ['Ingrédients', ingredients],
    ['Appareils', appliances],
    ['Ustensiles', utensils],
];
const keywordObject = {
    ingredients: [],
    appliances: [],
    utensils: [],
};

function dispatch(keyword) {
    // TODO construct array of keywords and array of elements
    for (let key in keywordObject) {
        keywordObject[key] = keywordArray.filter((item) => item[0] === keyword);
    }
}

dispatch('ingredients');

function getIngredients(recipesArray) {
    const ingredients = uniqueValues(
        recipesArray
            .map((recipe) => recipe.ingredients)
            .map((arr) =>
                arr.map((obj) => obj.ingredient.toNormalize().toCapitalize())
            )
            .flat()
    );
    return ingredients;
}

function getAppliances(recipesArray) {
    const appliances = uniqueValues(
        recipesArray
            .map((recipe) => recipe.appliance.toNormalize().toCapitalize())
            .flat()
    );
    return appliances;
}

function getUtensils(recipesArray) {
    const utensils = uniqueValues(
        recipesArray
            .map((recipe) => recipe.utensils)
            .map((arr) => arr.map((obj) => obj.toNormalize().toCapitalize()))
            .flat()
    );
    return utensils;
}

function filteredRecipesDisplay(recipesArray, search) {
    let result;
    search.length > 2
        ? (result = searchRecipes(recipesArray, search))
        : (result = []);
    const ul = document.querySelector('.results__list');
    ul.innerHTML = '';
    search.length > 2 ? result.forEach((recipe) => new Recipes(recipe)) : '';
    // calculate number of recipes
    const recipesNumber = document.querySelectorAll(
        '.results__list__item'
    ).length;
    console.log('recipesNumber: ', recipesNumber);
}

function displayOptions(obj, string) {
    const ul = document.querySelector(`#options-${obj.key}`);
    if (obj.value.includes(string)) {
        ul.querySelector(`#${obj.value}`).style.display = 'block';
    } else {
        ul.querySelector(`#${obj.value}`).style.display = 'none';
    }
}

function renderRecipesBySearch(keywordArray) {
    document
        .querySelector('.search__form__input')
        .addEventListener('input', function (ev) {
            ev.preventDefault();
            if (ev.target.value.length < 3) {
                keywords.forEach((keyword) => {
                    const ul = document.querySelector(`#options-${keyword}`);
                    ul.querySelectorAll(
                        '.dropdown__content__options__item'
                    ).forEach((item) => {
                        item.style.display = 'block';
                    });
                });
                return filteredRecipesDisplay(recipes, ev.target.value);
            }
            filteredRecipesDisplay(recipes, ev.target.value);
            const ingredients = getIngredients(
                searchRecipes(recipes, ev.target.value),
                ev.target.value
            );
            const appliances = getAppliances(
                searchRecipes(recipes, ev.target.value),
                ev.target.value
            );
            const utensils = getUtensils(
                searchRecipes(recipes, ev.target.value),
                ev.target.value
            );
            keywordArray = [
                ['ingredients', ingredients],
                ['appareils', appliances],
                ['ustensiles', utensils],
            ];
            // TODO invisible the dropdown items
            keywordArray.forEach((keyword) => {
                const ul = document.querySelector(`#options-${keyword[0]}`);
                ul.querySelectorAll('li').forEach((item) => {
                    if (keyword[1].includes(item.innerText)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
                // ul.innerHTML = '';
                // new Dropdown(keyword[0], keyword[1]);
            });
        });
}

const optionsListObj = {};
const optionsArray = ['ingredients', 'appareils', 'ustensiles'];
console.log('ingredients: ', ingredients);
console.log('appliances: ', appliances);
console.log('utensils: ', utensils);
const optionsListArray = [ingredients, appliances, utensils];
Object.assign(optionsListObj, optionsListArray);
// keywords.forEach((keyword, index) => {
//     optionsListObj[keyword] = optionsListArray[index];
// });
console.log('optionsListObject: ', optionsListObj);

const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        console.log('mutation: ', mutation);
        if (mutation.addedNodes.length > 0) {
            console.log(
                'mutation.addedNodes: ',
                mutation.addedNodes[1].childNodes[1].textContent
            );
            const addedTag = mutation.addedNodes[1].childNodes[1].textContent;
            console.log('addedTag: ', addedTag);
        }
        if (mutation.removedNodes.length > 0) {
            console.log(
                'mutation.removedNodes: ',
                mutation.removedNodes[0].childNodes[1].textContent
            );
            const removedTag =
                mutation.removedNodes[0].childNodes[1].textContent;
            console.log('removedTag: ', removedTag);
        }
        console.log('mutation.target: ', mutation.target);
        // searchRecipes(recipes, mutation.addedNodes[1]);
    });
});

observer.observe(tagList, {
    childList: true,
    subtree: true,
});

function tagSelect(elt) {
    const text = elt.innerText;
    const listTags = Array.from(
        document.querySelectorAll('.search__tag__item')
    );
    if (listTags.length > 0) {
        listTags.some((tag) => tag.innerText === text) ? null : new Tag(text);
    } else {
        new Tag(text);
    }
    const tags = Array.from(
        document.querySelectorAll('.search__tag__item')
    ).map((tag) => tag.innerText);
    if (tags.length > 0) {
        const results = [];
        tags.map((tag) => {
            const result = searchRecipes(recipes, tag);
            results.push(result);
            const resultRecipes = results.reduce((a, b) =>
                a.filter((x) => b.includes(x))
            );
        });
    }
    let tagList = document.querySelector('#tag-list');
    console.log('tagList: ', tagList);
    // observer.observe(tagList, {
    //     childList: true,
    // });
    filteredRecipesDisplay(recipes, text); // filter all keywords
}

renderRecipesBySearch();

keywordArray.forEach((arr) => {
    const keywordItem = new Keyword(...arr);
    const { keyword, options } = keywordItem;
    new Dropdown(keyword, options);
});

document.querySelectorAll('.dropdown__content__options__item').forEach((li) => {
    li.addEventListener('click', function () {
        tagSelect(this);
    });
});

function getRecipesByIngredient(ingredient, recipesArray) {
    const recipes = recipesArray.filter((recipe) =>
        recipe.ingredients.some(
            (ingredient) => ingredient.ingredient === ingredient
        )
    );
    return recipes;
}

console.log(
    'getRecipesByIngredient(ingredients[0]): ',
    getRecipesByIngredient('sucre', recipes)
);

console.log(typeof recipes[0]);