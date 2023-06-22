import {getCardContainer, resetPageTag, resetSearchTerm, updatePageTag} from './container'
import { updateCardContainerByTag, updateCardContainer, clearCardContainer } from './card'
import { createSidebarBtn } from '../ui/sidebar'

function toggleSidebar() {
    var sidebar = document.querySelector("#sidebar")
    var container = document.querySelector(".main-container")

    sidebar.classList.toggle("active-nav")
    container.classList.toggle("active-cont")
}

export function refreshSidebar() {
    $.ajax({
        url: "/load-tag",
        type: 'GET',
        success: function(data) {
            let allTag = data;

            let sidebarBtnContainer = document.getElementById("tagList");
            sidebarBtnContainer.innerHTML = "";

            allTag.forEach(tag => {
                sidebarBtnContainer.append(createSidebarBtn(tag.name));
            });
        }
    })
}

export function initSidebar() {
    let mediaItemContainer = getCardContainer();

    $(document).on('click', '.sidebar-btn', function(e) {
        e.preventDefault();
    
        let clickedTag = e.target.value;
    
        if (clickedTag === undefined) { //If user clicked the icon, return the parent button's value
            clickedTag = e.target.parentElement.value;
        }

        updatePageTag(clickedTag);
        updateCardContainerByTag(clickedTag, true);
    })
    
    $("#all-note-sidebar-btn").on('click', function(e) {
        e.preventDefault();
    
        clearCardContainer();
        resetPageTag();
        resetSearchTerm();
        updateCardContainer();
    })
    
    const sidebarMenu = $("#sidebar");
    
    document.getElementById("menu-btn").addEventListener('click', toggleSidebar);
    sidebarMenu.on('transitionend webkitTransitionEnd oTransitionEnd', () => {$(mediaItemContainer).masonry('layout');});
}