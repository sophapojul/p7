/**
 * It takes a recipe object as an argument, and then creates a new DOM element for each recipe, and appends it to the DOM
 * @param {Object} recipe - This is the object that contains all the data for the recipe.
 */
import Ingredients from './ingredients';
import {
    cloneTemplate,
    closeModalByEscape,
    openModal,
} from '../utils/functions';

export default function Recipes(recipe) {
    const { id, name, time, description, ingredients, appliance, utensils } =
        recipe;

    // const [{ quantity, unit, ingredient }] = ingredients;
    this.id = id;
    this.name = name;
    this.description = description;
    this.ingredients = ingredients;
    this.ingredientsByRecipes = { id, ingredients };
    this.time = time;
    this.appliance = appliance;
    this.utensils = utensils;
    this.list = document.querySelector('.results__list');
    this.item = cloneTemplate('results-template').firstElementChild;
    this.item.setAttribute('id', `recipe-${this.id}`);
    this.item.querySelector('.results__list__item__content__title').innerText =
        this.name;
    this.item.querySelector('.time__text__value').innerText = this.time;
    this.item.querySelector(
        '.results__list__item__content__description'
    ).innerText = this.description;
    this.ingredientsListTemplate = document.getElementById(
        'ingredients-template'
    );
    this.ul = this.list.querySelector(
        '.results__list__item__content__ingredients'
    );
    this.list.appendChild(this.item);
    this.item.addEventListener('click', () => openModal(this.item));
    new Ingredients(this.ingredientsByRecipes);
}
