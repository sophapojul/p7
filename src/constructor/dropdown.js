/**
 * It creates a dropdown menu with the given name and options
 * @param {String} name - The name of the dropdown.
 * @param {Array} options - an array of strings that will be the options of the dropdown
 */
export default function Dropdown(name, options) {
    this.name = name.toNormalize();
    this.options = options;
    this.div = document.querySelector(`.${this.name}`);
    this.ul = document.querySelector(`#options-${this.name}`);
    this.options.forEach((option) => {
        this.li = document.createElement('li');
        this.li.classList.add('dropdown__content__options__item');
        this.li.dataset.selected = 'false';
        this.li.innerText = `${option}`;
        this.ul.appendChild(this.li);
    });
    this.li = this.ul.querySelectorAll('.dropdown__content__options__item');
    this.input = this.ul.parentElement.firstElementChild;
}
