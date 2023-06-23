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
                sidebarBtnContainer.append(createSidebarBtn(tag.name, tag.id, 'bi-bookmark', 'tag-btn'));
            });
        }
    })
}

export function initSidebar() {
    let mediaItemContainer = getCardContainer();
    const sidebarMenu = $("#sidebar");

    $(document).on('click', '.sidebar-btn', function(e) {
        e.preventDefault();
        initSidebarBtn(e);
    });
    
    $("#all-note-sidebar-btn").on('click', function(e) {
        e.preventDefault();
        initAllNoteSidebarBtn();
    });
    
    document.getElementById("menu-btn").addEventListener('click', toggleSidebar);
    sidebarMenu.on('transitionend webkitTransitionEnd oTransitionEnd', () => {$(mediaItemContainer).masonry('layout');});
}

function initAllNoteSidebarBtn() {
    clearCardContainer();
    resetPageTag();
    resetSearchTerm();
    updateCardContainer();
}

function initSidebarBtn(e) {
    let clickedTag = e.target.value;
    
    // If user clicked the icon, return the parent button's value
    if (clickedTag === undefined)
        clickedTag = e.target.parentElement.value;

    updatePageTag(clickedTag);
    updateCardContainerByTag(clickedTag, true);
}
