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

    this.template = document.getElementById('results-template');
    this.list = document.querySelector('.results__list');
    this.item = this.template.content.cloneNode(true);
    this.item
        .querySelector('.results__list__item')
        .setAttribute('id', `${this.id}`);
    this.item.querySelector('.results__list__item__content__title').innerText =
        this.name;
    this.item.querySelector('.time__text__value').innerText = this.time;
    this.item.querySelector(
        '.results__list__item__content__description'
    ).innerText = this.description;
    this.ingredients.forEach((ingredient) => {
        this.li = document.createElement('li');
        this.li.classList.add('ingredients__item');
        this.li.setAttribute('id', `${this.id}`);
        this.li.innerHTML = `
            <h3 class="ingredients__item__title">${
                ingredient.ingredient
            }  :</h3>
            <span class="ingredients__item__text">${
                ingredient.quantity ? ingredient.quantity : ''
            } ${ingredient.unit ? ingredient.unit : ''}</span>
        `;
        this.item
            .querySelector('.results__list__item__content__ingredients')
            .appendChild(this.li);
    });
    this.list.appendChild(this.item);
}
