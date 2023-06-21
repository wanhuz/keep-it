import { updateCardContainer, updateCardContainerBySearch, updateCardContainerByTag, refreshCardContainerLayout } from "./card";
import { refreshSidebar } from "./sidebar";

let currentPageTag = null;
let currentSearchTerm = null; 

export function initCardContainer() {
    $('#card-container').masonry( {
        itemSelector: '.card',
        isFitWidth: true,
        transitionDuration: '0.4s'
    });
}

export function getCardContainer() {
    return $('#card-container');
}

export function updatePage() {
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

export function resetPageTag() {
    currentPageTag = null;
}

export function resetSearchTerm() {
    currentSearchTerm = null;
}

export function initPage() {
    window.setInterval(updatePage, 5000);
    window.setInterval(refreshSidebar, 5000);
    
    updatePage();
    refreshSidebar();
}