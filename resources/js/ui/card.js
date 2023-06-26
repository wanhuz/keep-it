export function createCard(title, content, id) {
    const cardHtml = `
    <div class="card note" data-revision-count="1"  data-id="${id}" >
        
        <div class="card-body note-body text-start">
            <h5 class="card-title mb-3">${title}</h5>
            <div class="card-content note-content">${content}</div>
        </div>
    
        <div class="card-tags d-flex flex-row flex-wrap ms-2"></div>
    </div>
    `

    const card = document.createElement("div");
    card.innerHTML = cardHtml;

    return card;
}