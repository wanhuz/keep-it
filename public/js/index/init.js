var mediaItemContainer = $('#card-container');

//Init popover for dropdown tag note
const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))

let contentRefresh = window.setInterval(updatePage, 5000)

updateCardContainer();

function updatePage() {
    updateCardContainer();
}

mediaItemContainer.masonry( {
    columnWidth:  100,
    itemSelector: '.card'
} );