import { updateCardContainer, updateCardContainerBySearch, updateCardContainerByTag, refreshCardContainerLayout } from "./card";

let currentPageTag = null;
let currentSearchTerm = null; 

export function initCardContainer() {
    $('#card-container').masonry( {
        itemSelector: '.card',
        isFitWidth: true,
        transitionDuration: '0.4s'
    });
}

export function get() {
    return $('#card-container');
}

export function updatePage() {
    let currentPageTag = null;

    if (currentPageTag)
        updateCardContainerByTag(currentPageTag, false);
    else if (currentSearchTerm) 
        updateCardContainerBySearch(currentSearchTerm, false);
    else 
        updateCardContainer();

    refreshCardContainerLayout();
}

export function updateSearchTerm(searchTerm) {
    currentSearchTerm = searchTerm;
}

export function updatePageTag(tag) {
    currentPageTag = tag;
}