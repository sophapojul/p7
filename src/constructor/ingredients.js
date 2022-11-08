import { cloneTemplate } from '../utils/functions';

/**
 * It takes an object with an array of ingredients, and for each ingredient, it creates a list item with the ingredient
 * name and quantity
 * @param {Object} ingredients - the ingredients object from the API
 */
export default function Ingredients(ingredients) {
    this.ingredients = ingredients;
    this.id = this.ingredients.id;
    this.ingredients.ingredients.forEach((ingredient) => {
        this.ingredient = ingredient;
        this.li = cloneTemplate('ingredients-template').firstElementChild;
        this.title = this.li.querySelector('#title');
        this.title.innerText = `${this.ingredient.ingredient}: `;
        this.content = this.li.querySelector('#content');
        this.content.innerText = `${this.ingredient?.quantity ?? ''} ${
            this.ingredient?.unit ?? ''
        }`;
        this.ul = document
            .getElementById(`recipe-${this.id}`)
            .querySelector('.results__list__item__content__ingredients');
        this.ul.appendChild(this.li);
    });
}
