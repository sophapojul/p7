export default function Dropdown(name,options) {
    this.name = name;
    this.options = options;
    this.list = document.querySelector('#keyword');
    this.listItem = document.createElement('li');
    this.listItem.classList.add(`keyword__item, ${this.name}`);
    this.listItem.innerHTML = `
        <div class="dropdown">
            <div class="dropdown__btn" data-name="${this.name}">${this.name}</div>
            <div class="dropdown__content" data-active="false">
                <input class="dropdown__content__input" type="text" placeholder="Rechercher un ${this.name.toLowerCase().slice(0, -1)}">
                <ul class="dropdown__content__options"></ul>
            </div>
        </div>
    `;
    this.list.appendChild(this.listItem);
    this.btn = this.listItem.querySelector(`div[data-name=${this.name}]`);
    this.content = this.listItem.querySelector('.dropdown__content');

    this.openDropdown = function () {
        this.content.dataset.active = 'true';
    };

    this.closeDropdown = function () {
        this.content.dataset.active = 'false';
    };

    this.btn.addEventListener('click', () => {
        this.content.dataset.active === 'false' ? this.openDropdown() : this.closeDropdown();
        // this.content.dataset.active ? this.closeDropdown() : this.openDropdown();
    });

    this.render = function () {
        this.options.forEach(option => {
            this.option = document.createElement('li');
            this.option.dataset.value = `${option}`;
            this.option.dataset.selected = 'false';
            this.option.innerHTML = `${option}`;
            this.listItem.querySelector('ul').appendChild(this.option);
                this.option.addEventListener('click', () => {
                    this.option.dataset.selected = 'true';
                // this.option.dataset.selected === 'false' ? this.option.dataset.selected = 'true' : this.option.dataset.selected = 'false';
                    // this.option.classList.toggle('search__dropdown__content__options__tag__item--selected');
            })
        }
        );
    }
}
