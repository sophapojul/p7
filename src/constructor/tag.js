/**
 * It takes a tag, creates a new list item, adds the tag to the list item, and adds a close button to the list item
 * @param {String} tag - the tag that will be displayed in the tag list
 */
export default function Tag(tag) {
    this.tag = tag;
    this.template = document.querySelector('#tag-template');
    this.list = document.querySelector('#tag-list');
    this.item = this.template.content.cloneNode(true);
    this.item.querySelector('.search__tag__item').innerText = this.tag;
    this.list.appendChild(this.item);
    this.close = this.list.querySelectorAll('svg');
    this.close.forEach((item) =>
        item.addEventListener('click', (ev) => {
            ev.currentTarget.parentElement.remove();
        })
    );
}
