import { cloneTemplate } from '../utils/functions';

/**
 * @typedef {Array.<Object>} Ingredients
 * @property {string} ingredient - The name of the ingredient.
 * @property {number} [quantity] - The quantity of the ingredient.
 * @property {string} [unit] - The unit of the ingredient.
 */

/**
 * It takes an array of ingredients and a DOM element, and then it creates a list item for each ingredient and appends it
 * to the DOM element
 * @param {Ingredients} ingredients - an array of objects that contain the ingredient name and quantity
 * @param {HTMLElement} element - The element that the ingredients will be appended to.
 */
export default function Ingredients(ingredients, element) {
    this.ingredients = ingredients;
    this.element = element;
    this.ingredients.forEach((ingredient) => {
        this.ingredient = ingredient;
        this.li = cloneTemplate('ingredients-template').firstElementChild;
        this.title = this.li.querySelector('#title');
        this.title.innerText = `${this.ingredient.ingredient}: `;
        this.content = this.li.querySelector('#content');
        this.content.innerText = `${this.ingredient?.quantity ?? ''} ${
            this.ingredient?.unit ?? ''
        }`;
        this.element.appendChild(this.li);
    });
}
