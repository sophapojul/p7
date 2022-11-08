import { cloneTemplate } from '../utils/functions.js';

/**
 * It creates a dropdown menu with a search bar
 * @param {String} keyword - the keyword that will be displayed in the dropdown button
 * @param {Array} options - an array of strings
 */
export default function Keyword(keyword, options) {
    this.keyword = keyword;
    this.options = options;
    this.list = document.getElementById('dropdown-keyword');
    this.fragment = cloneTemplate('dropdown-keyword-template');
    this.li = this.fragment.firstElementChild;
    this.li.setAttribute('id', `${this.keyword.toNormalize()}`);
    this.li
        .querySelector('.dropdown__btn')
        .classList.add(this.keyword.toNormalize());
    this.btn = this.li.querySelector('.dropdown__btn');
    this.btn.setAttribute('id', `btn-${this.keyword.toNormalize()}`);
    this.btn.setAttribute('aria-label', this.keyword.toNormalize());
    this.li.querySelector('#dropdown-btn-value').innerHTML = this.keyword;
    this.content = this.li.querySelector('.dropdown__content');
    this.content.setAttribute('id', `content-${this.keyword.toNormalize()}`);
    this.content.setAttribute(
        'aria-labelledby',
        `btn-${this.keyword.toNormalize()}`
    );
    this.content.setAttribute('aria-expanded', 'false');
    this.content.classList.add(this.keyword.toNormalize());
    this.ul = this.content.querySelector('.dropdown__content__options');
    this.inputClass = this.content.querySelector('.dropdown__content__input');
    this.inputClass.placeholder = `Rechercher un ${this.keyword
        .toLocaleLowerCase()
        .slice(0, -1)}`;
    this.inputClass.setAttribute('id', `input-${this.keyword.toNormalize()}`);
    this.li
        .querySelector('.dropdown__content svg')
        .setAttribute('id', `close-${this.keyword.toNormalize()}`);
    this.ul.setAttribute('id', `options-${this.keyword.toNormalize()}`);
    this.list.appendChild(this.fragment);
    this.btn = document.getElementById(`btn-${this.keyword.toNormalize()}`);
    this.contentKeyword = document.querySelector(
        `#content-${this.keyword.toNormalize()}`
    );
    this.close = this.contentKeyword.querySelector(
        `#close-${this.keyword.toNormalize()}`
    );
    this.btn.addEventListener('click', () => {
        document.querySelectorAll('.dropdown__content').forEach((elt) => {
            if (elt.dataset.active === 'true') {
                elt.dataset.active = 'false';
                elt.previousElementSibling.firstElementChild.style.display =
                    'flex';
            }
            // elt.dataset.active === 'true' &&
            //     (elt.dataset.active =
            //         'false' &&
            //         (elt.previousElementSibling.firstElementChild.style.display =
            //             'flex'));
        });
        this.content.dataset.active === 'false'
            ? this.openDropdown()
            : this.closeDropdown();
    });
    this.inputId = this.content.querySelector(
        `#input-${this.keyword.toNormalize()}`
    );
    this.close.addEventListener('click', () => {
        this.content.dataset.active === 'false'
            ? this.openDropdown()
            : this.closeDropdown();
    });

    this.inputId.addEventListener('keyup', (ev) => {
        if (ev.keyCode === 27) {
            this.closeDropdown();
        }
    });

    this.openDropdown = () => {
        this.content.dataset.active = 'true';
        this.btn.style.display = 'none';
        this.inputId.focus();
    };

    this.closeDropdown = () => {
        this.content.dataset.active = 'false';
        this.btn.style.display = 'flex';
        this.inputId.value = '';
    };
}
