export default function Tag(tag) {
    this.tag = tag;
    this.tagElement = document.createElement('li');
    this.tagElement.classList.add('search__tag');
    this.tagElement.innerHTML = `
        <span class="search__tag__item">${ this.tag }</span><span class="search__tag__close">&times;</span>
    `;
    this.target = document.querySelector('#tag-ingredients')
    this.target.appendChild(this.tagElement);
    this.tagElement.lastElementChild.addEventListener('click', () => {
        this.tagElement.remove();
    })

}
