export function createCard(title, content, id) {
    const cardHtml = `
    <div class="card note p-0" data-revision-count="1"  data-id="${id}" >
        <div class="card-img"></div>

        <div class="card-body note-body text-start">
            <h5 class="card-title">${title}</h5>
            <div class="card-content note-content">${content}</div>
        </div>

        <div class="card-tags d-flex flex-row flex-wrap ms-2"></div>
    </div>
    `

    const card = document.createElement("div");
    card.innerHTML = cardHtml;

    return card.children[0];
} 

export function createCardImageContainer() {
    const cardImageContainerHTML = `
        <span class='card-img-container'>
            <ul></ul>
        </span>
    `
    const cardImageTemp = document.createElement('span');
    cardImageTemp.innerHTML = cardImageContainerHTML;

    return cardImageTemp.children[0];
}