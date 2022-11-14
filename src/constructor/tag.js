import { cloneTemplate } from '../utils/functions';

/**
 * It takes a tag and a type, creates a new tag element, and appends it to the DOM
 * @param {string} tag - the tag that will be displayed
 * @param {string} type - the type of tag, either 'ingredients' or 'appareils' or 'ustensiles'
 */
export default function Tag(tag, type) {
    this.tag = tag;
    this.type = type;
    this.fragment = cloneTemplate('tag-template');
    this.list = document.querySelector('#tag__list');
    this.fragment.querySelector('.search__tag').classList.add(this.type);
    this.fragment.querySelector('.search__tag__item').innerText = this.tag;
    this.list.appendChild(this.fragment);
    this.close = this.list.querySelectorAll('svg');
    this.close.forEach((item) =>
        item.addEventListener('click', (ev) => {
            ev.currentTarget.parentElement.remove();
        })
    );
}
