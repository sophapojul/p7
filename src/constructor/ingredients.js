/**
 * It takes a ul element and an array of ingredients as arguments, and then renders the ingredients to the ul element
 * @param {HTMLUListElement} ul - the ul element that will contain the ingredients
 * @param {{ingredient: String, quantity: Number, unit: String }[]} ingredients - an array of objects containing the ingredients
 */

export default function Ingredients(id, ingredients) {
    this.id = id;
    this.ingredients = ingredients;
    this.ul = document.querySelector('.results__list');
    this.template = document.getElementById('ingredients-template');
    this.clone = this.template.content.cloneNode(true);
    this.li = this.clone.querySelector(`#${this.id}`);
    this.item = this.li.querySelector('.results__list__item__content__ingredients');
    ingredients.forEach((ingredient) => {
        this.item.querySelector('.ingredients__item__title').innerText = `${this.ingredient.ingredient}  :`;
        this.item.querySelector('.ingredients__item__text').innerText = `${this.ingredient.quantity} ${this.ingredient.unit}`;
    });
    this.ul.appendChild(this.item);
}
// export default function Ingredients(ul, ingredients) {
//     this.ingredients = ingredients;
//     this.ul = ul;
//     this.render = function () {
//         this.ingredients.forEach((ingredient) => {
//             this.quantity = ingredient.quantity ? ingredient.quantity : '';
//             this.unit = ingredient.unit ? ingredient.unit : '';
//             this.ul.innerHTML += `
//                 <li class="results__list__item__content__ingredients__item">
//                     <h3 class="results__list__item__content__ingredients__item__title">${ingredient.ingredient}  :</h3>
//                     <span class="results__list__item__content__ingredients__item__text">${this.quantity} ${this.unit}</span>
//                     </span>
//                 </li>`;
//         });
//     };
// }
