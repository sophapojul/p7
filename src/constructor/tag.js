import { cloneTemplate } from '../utils/functions.js';

/**
 * It takes a tag, creates a new list fragment, adds the tag to the list fragment, and adds a close button to the list fragment
 * @param {String} tag - the tag that will be displayed in the tag list
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
