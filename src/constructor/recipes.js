import { cloneTemplate, openModal } from '../utils/functions';

/**
 * @typedef {Array.<Object>} Recipe
 * @property {number} id - The id of the recipe.
 * @property {string} name - The name of the recipe.
 * @property {number} servings - The number of servings the recipe makes.
 * @property {Ingredients} ingredients - An array of ingredients.
 * @property {number} time - The time it takes to make the recipe.
 * @property {string} description - A description of the recipe.
 * @property {string} appliance - The appliance used to make the recipe.
 * @property {Array.<string>} utensils - An array of utensils used to make the recipe.
 */

/**
 * It takes a recipe object as an argument, and then creates a new DOM element for each recipe, and appends it to the DOM
 * @param {Recipe} recipe - This is the object that contains all the data for the recipe.
 */
export default function Recipes(recipe) {
    const { id, name, time, description, ingredients, appliance, utensils } =
        recipe;
    this.id = id;
    this.name = name;
    this.description = description;
    this.ingredients = ingredients;
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
    this.ul = this.list.querySelector(
        '.results__list__item__content__ingredients'
    );
    this.appendTo = function (element) {
        element.append(this.item);
    };
    this.openModal = function () {
        this.item.addEventListener('click', openModal);
    };
}
