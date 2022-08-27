export default function Keyword(keyword, options) {
    this.keyword = keyword;
    this.options = options;
    this.template = document.getElementById('dropdown-keyword-template');
    this.clone = document.importNode(this.template.content, true);
    this.list = document.getElementById('dropdown-keyword');
    this.item = this.template.content.cloneNode(true);
    this.item
        .querySelector('.dropdown__keyword__item')
        .setAttribute('id', `${this.keyword.toNormalize()}`);
    this.item
        .querySelector('.dropdown__btn')
        .classList.add(this.keyword.toNormalize());
    this.item
        .querySelector('.dropdown__btn')
        .setAttribute('id', `btn-${this.keyword.toNormalize()}`);
    this.item
        .querySelector('.dropdown__btn')
        .setAttribute('aria-label', this.keyword.toNormalize());
    this.item.querySelector('#dropdown-btn-value').innerHTML = this.keyword;
    this.item
        .querySelector('.dropdown__content')
        .setAttribute('id', `content-${this.keyword.toNormalize()}`);
    this.item
        .querySelector('.dropdown__content')
        .setAttribute('aria-labelledby', `btn-${this.keyword.toNormalize()}`);
    this.item
        .querySelector('.dropdown__content')
        .setAttribute('aria-expanded', 'false');
    this.item
        .querySelector('.dropdown__content')
        .classList.add(this.keyword.toNormalize());
    this.item.querySelector(
        '.dropdown__content__input'
    ).placeholder = `Rechercher un ${this.keyword
        .toLocaleLowerCase()
        .slice(0, -1)}`;
    this.item
        .querySelector('.dropdown__content__input')
        .setAttribute('id', `input-${this.keyword.toNormalize()}`);
    this.item
        .querySelector('.dropdown__content svg')
        .setAttribute('id', `close-${this.keyword.toNormalize()}`);
    this.item
        .querySelector('.dropdown__content__options')
        .setAttribute('id', `options-${this.keyword.toNormalize()}`);
    this.list.appendChild(this.item);
    this.btn = document.getElementById(`btn-${this.keyword.toNormalize()}`);
    this.content = document.querySelector(
        `#content-${this.keyword.toNormalize()}`
    );
    this.close = this.content.querySelector(
        `#close-${this.keyword.toNormalize()}`
    );
    this.btn.addEventListener('click', () => {
        document.querySelectorAll('.dropdown__content').forEach((item) => {
            item.dataset.active === 'true'
                ? ((item.dataset.active = 'false'),
                  (item.previousElementSibling.firstElementChild.style.display =
                      'flex'))
                : null;
        });
        this.content.dataset.active === 'false'
            ? this.openDropdown()
            : this.closeDropdown();
    });
    // this.btn.addEventListener('click', (ev) => {
    //     console.log(ev.currentTarget);
    //     this.btn.classList.toggle('dropdown__btn--active');
    //     this.content = this.clone.querySelector('.dropdown__content');
    //     this.content.classList.toggle('dropdown__content--active');
    //     this.content.setAttribute('aria-expanded', 'true');
    //     this.input = this.clone.querySelector('.dropdown__content__input');
    //     this.input.addEventListener('input', (ev) => {
    //         this.options.forEach(option => {
    //             if (option.toNormalize().includes(ev.target.value)) {
    //                 this.li = document.createElement('li');
    //                 this.li.classList.add('dropdown__content__options__item');
    //                 this.li.innerText = `${option}`;
    //                 this.ul.appendChild(this.li);
    //             }
    //         });
    //     });
    // });
    this.input = this.content.querySelector(
        `#input-${this.keyword.toNormalize()}`
    );
    this.close.addEventListener('click', () => {
        this.content.dataset.active === 'false'
            ? this.openDropdown()
            : this.closeDropdown();
    });

    this.input.addEventListener('keyup', (ev) => {
        if (ev.keyCode === 27) {
            this.closeDropdown();
        }
    });

    this.openDropdown = () => {
        this.content.dataset.active = 'true';
        this.btn.style.display = 'none';
        this.input.focus();
    };

    this.closeDropdown = () => {
        this.content.dataset.active = 'false';
        this.btn.style.display = 'flex';
        this.input.value = '';
    };
}
