export default function Dropdown(name, options) {
    this.name = name.toNormalize();
    this.options = options;
    this.div = document.querySelector(`.${this.name}`);
    this.ul = document.querySelector(`#options-${this.name}`);
    this.options.forEach((option) => {
        this.li = document.createElement('li');
        this.li.classList.add('dropdown__content__options__item');
        this.li.innerText = `${option}`;
        this.ul.appendChild(this.li);
    });
    this.li = this.ul.querySelectorAll('.dropdown__content__options__item');
    this.input = this.ul.parentElement.firstElementChild;
    this.input.addEventListener('input', (ev) => {
        this.li.forEach((item) => {
            const { style, innerText } = item;
            if (innerText.toNormalize().includes(ev.target.value)) {
                style.display = 'block';
            } else {
                style.display = 'none';
            }
        });
    });
}
