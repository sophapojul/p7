export default function Recipes(recipe) {
    this.recipe = recipe;
    this.list = document.querySelector('.results__list');
    this.item = document.createElement('li');
    this.item.classList.add('results__list__item');
    this.item.setAttribute('id', `${this.recipe.id}`);
    this.item.innerHTML = `
            <div class="results__list__item__image">
              <img src="" alt="" width="380" height="178">
            </div>
            <div class="results__list__item__content">
              <h2 class="results__list__item__content__title">${this.recipe.name}</h2>
              <div class="results__list__item__content_time">
                <span class="results__list__item__content__time__text">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 0C4.5 0 0 4.5 0 10C0 15.5 4.5 20 10 20C15.5 20 20 15.5 20 10C20 4.5 15.5 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18ZM10.5 5H9V11L14.2 14.2L15 12.9L10.5 10.2V5Z" fill="black"/>
                    </svg> ${this.recipe.time} min</span>
                </span>
              </div>
              <ul class="results__list__item__content__ingredients"></ul>
            </ul>
                <p class="results__list__item__content__description">
                ${this.recipe.description}
                </p>
             </div>
        `;
    this.list.appendChild(this.item)
}