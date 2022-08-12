import '/src/utils/toNormalize.js';

export function KeywordElt(keyword, options) {
    this.keyword = keyword;
    this.options = options;
    this.ul = document.querySelector('#keyword');
    this.ul.innerHTML += `
        <li class="keyword__item ${this.keyword.toNormalize()}">
            <ul id="tag-${this.keyword.toNormalize()}" class="tag"></ul>
            <div id="dropdown-${this.keyword.toNormalize()}" class="dropdown" >
                <div class="dropdown__btn" data-name="${this.keyword.toNormalize()}">${this.keyword}</div>
                <div class="dropdown__content" data-active="false">
                    <input class="dropdown__content__input" type="text" placeholder="Rechercher un ${this.keyword.toLocaleLowerCase().slice(0, -1)}">
                    <ul class="dropdown__content__options"></ul>
                </div>
            </div>
        </li>
    `;
    this.btn = this.ul.querySelector(`div[data-name=${this.keyword.toNormalize()}]`);
    this.content = this.btn.nextElementSibling;
    this.btn.addEventListener('click', function () {
       this.content.dataset.active === 'false' ? this.openDropdown() : this.closeDropdown();
    });
    this.content.addEventListener('keyup', function (e) {
        if (e.keyCode === 13) {
            this.closeDropdown();
        }
    });

    this.openDropdown = function () {
        this.content.dataset.active = 'true';
    };

    this.closeDropdown = function () {
        this.content.dataset.active = 'false';
    };

    this.render = function () {
        if (this.options) {
            this.options.forEach(option => {
                    this.option = document.createElement('li');
                this.option.classList.add('dropdown__content__options__item');
                    this.option.dataset.value = `${option}`;
                    this.option.dataset.selected = 'false';
                    this.option.innerHTML = `${option}`;
                    this.content.querySelector('ul').appendChild(this.option);
                    // this.option.addEventListener('click', () => {
                    //     this.option.dataset.selected = 'true';
                    // this.option.dataset.selected === 'false' ? this.option.dataset.selected = 'true' : this.option.dataset.selected = 'false';
                    // this.option.classList.toggle('search__dropdown__content__options__tag__item--selected');
                    // })
                }
            );
        }
    }

    this.renderOptions = function (array) {

        document.querySelector(`#dropdown-${this.keyword.toNormalize()} .dropdown__content__options`).innerHTML = '';
        array.forEach(elt => {
                this.elt = document.createElement('li');
                this.elt.classList.add('dropdown__content__options__item');
                this.elt.dataset.value = `${elt}`;
                this.elt.dataset.selected = 'false';
                this.elt.innerHTML = `${elt}`;
                this.content.querySelector('ul').appendChild(this.option);
                this.elt.addEventListener('click', () => {
                    this.elt.dataset.selected = 'true';
                    // this.option.dataset.selected === 'false' ? this.option.dataset.selected = 'true' : this.option.dataset.selected = 'false';
                    // this.option.classList.toggle('search__dropdown__content__options__tag__item--selected');
                })
            }
        );
    }
}