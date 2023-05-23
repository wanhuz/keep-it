var mediaItemContainer = $('#card-container');
var $mediaItemContainer = mediaItemContainer;
let currentPageTag = null;
let currentSearchTerm = null; 


//Init popover for dropdown tag note
const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))


//Init masonry
mediaItemContainer.masonry( {
    itemSelector: '.card',
    isFitWidth: true,
    transitionDuration: '0.4s'
});

initTextAreaToResizable()
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

