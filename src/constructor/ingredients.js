/**
 * It takes an id, and an array of ingredients, and then creates a list of ingredients for a recipe
 * @param id - the id of the recipe
 * @param ingredients - an array of objects that contain the ingredient name, quantity, and unit.
 */
export default function Ingredients(id, ingredients) {
    this.id = id;
    this.ingredients = ingredients;
    this.ul = document.querySelector('.results__list');
    this.template = document.getElementById('ingredients-template');
    this.clone = this.template.content.cloneNode(true);
    this.li = this.clone.querySelector(`#${this.id}`);
    this.item = this.li.querySelector(
        '.results__list__item__content__ingredients'
    );
    ingredients.forEach((ingredient) => {
        this.item.querySelector(
            '.ingredients__item__title'
        ).innerText = `${ingredient.ingredient}  :`;
        this.item.querySelector(
            '.ingredients__item__text'
        ).innerText = `${ingredient.quantity} ${ingredient.unit}`;
    });
    this.ul.appendChild(this.item);
}
