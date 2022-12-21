var mediaItemContainer = $('#card-container');
let currentPageTag = null;
let currentSearchTerm = null; 

//Init popover for dropdown tag note
const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))

mediaItemContainer.masonry( {
    columnWidth:  100,
    itemSelector: '.card'
});

let contentRefresh = window.setInterval(updatePage, 5000);

updatePage();

function updatePage() {
    if (currentPageTag)
        updateCardContainerByTag(currentPageTag, false);
    else if (currentSearchTerm) 
        updateCardContainerBySearch(currentSearchTerm, false);
    else 
        updateCardContainer();

    refreshCardContainerLayout();
}

