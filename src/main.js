import '/src/assets/css/style.scss';
import '/src/utils/toNormalize.js';
import recipes from "./data/recipes.js";
import Recipes from './constructor/recipes.js';
import {KeywordElt} from './constructor/keywordElt.js';
import Tag from './constructor/tag.js';
import searchRecipes from "./filter/searchRecipes.js";
import Ingredients from "./constructor/ingredients.js";

const ingredientsUniqueList = Array.from( new Set({ recipes }.recipes.map(recipe => recipe.ingredients.map(ingredient => ingredient.ingredient)).flat()));
const applianceArray = { recipes }.recipes.map(recipe => recipe.appliance).flat()
const appliancesUniqueList = applianceArray.filter((item, index) => applianceArray.indexOf(item) === index);
// const appliancesUniqueList = Array.from( new Set( { recipes }.recipes.map(recipe => recipe.appliance).flat() ) );
const Utensils = Array.from( new Set({ recipes }.recipes.map(recipe => recipe.utensils).flat()));

function filteredRecipesDisplay (recipesArray, search) {
    // const search = ev.target.innerText;
    const result = searchRecipes(recipesArray, search);
    const ul = document.querySelector('.results__list');
    if (search.length > 2) {
        ul.innerHTML = '';
        result.forEach(recipe => {
            new Recipes(recipe);
            const recipesList = document.getElementById(`${recipe.id}`);
            const ingredientsElement = recipesList.querySelector(`.results__list__item__content__ingredients`);
            new Ingredients(ingredientsElement, recipe.ingredients).render();
        });
    } else {
        ul.innerHTML = '';}
    // calculate number of recipes
    const recipesNumber = document.querySelectorAll('.results__list__item').length;
    console.log("recipesNumber: ", recipesNumber);
}

function renderRecipesBySearch() {
    document.querySelector('.search__form__input').addEventListener('input', function (ev) {
        ev.preventDefault();
        filteredRecipesDisplay(recipes, ev.target.value);
    });
}

function tagSelect(elt) {
    const ul = document.querySelector(`${elt.tagName}.dropdown__content__options__item`).parentElement;
    const text = elt.innerText;
    const node = document.querySelectorAll('.search__tag__item');
    const list = Array.from( node ).some(tag => tag.innerText === text);
    if (!list) {
        new Tag(text);
    }
    filteredRecipesDisplay(recipes, text);
    ul.parentElement.dataset.active = 'false';
    // ul.innerHTML = '';
}

renderRecipesBySearch();

const keywordArray = [['Ingrédients',ingredientsUniqueList],['Appareils',appliancesUniqueList],['Ustensiles',Utensils]];//['Ingrédients', 'Appareils', 'Ustensiles'];
keywordArray.forEach(keyword => {
    const keywordElt = new KeywordElt(...keyword);
    keywordElt.render();
    document.querySelectorAll('.dropdown__btn').forEach(btn => {
        btn.addEventListener('click', function () {
            this.nextElementSibling.dataset.active = this.nextElementSibling.dataset.active === 'false' ? 'true' : 'false';
        });
        btn.parentElement.querySelector('.dropdown__content').addEventListener('click', function (ev) {
            this.dataset.active = 'false';
        });
        document.body.addEventListener('keyup', function (ev) {
            if (ev.key === 'Escape') {
                btn.nextElementSibling.dataset.active = 'false';
                btn.parentElement.querySelector('.dropdown__content__input').value = '';
            }
        });
        document.querySelectorAll('li[data-selected]').forEach(li => {
            li.addEventListener('click', function () {
                this.dataset.selected = 'true';
                tagSelect(this);
            });
        });
        btn.parentElement.querySelector('.dropdown__content__input').addEventListener('input', function (ev) {
            filteredRecipesDisplay(recipes, ev.target.value);
            Array.from(ev.target.nextElementSibling.querySelectorAll('li[data-value]')).forEach(item => {
                if (item.innerText.toNormalize().includes(ev.target.value)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            })
        })
    })
});
