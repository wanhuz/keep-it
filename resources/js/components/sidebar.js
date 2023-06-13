import {get as getCardContainer} from './container'

function toggleSidebar() {
    var sidebar = document.querySelector("#sidebar")
    var container = document.querySelector(".main-container")

    sidebar.classList.toggle("active-nav")
    container.classList.toggle("active-cont")
}

function createSidebarBtn(tagText) {
    `<button type="button" class="btn tag-btn ms-1 text-start sidebar-btn" value="{{ $value }}"><i class="bi bi-bookmark"></i><span class="ps-4">{{ $slot }}</span></button>`

    let sidebarBtn = document.createElement("button");
    sidebarBtn.classList.add("btn", "tag-btn", "ms-1", "text-start", "sidebar-btn");
    sidebarBtn.value = tagText;
    sidebarBtn.type = "button";

    let sidebarIcon = document.createElement("icon");
    sidebarIcon.classList.add("bi", "bi-bookmark");

    let spanText = document.createElement("span");
    spanText.classList.add("ps-4");
    spanText.textContent = tagText;

    sidebarBtn.append(sidebarIcon);
    sidebarBtn.append(spanText);
    
    return sidebarBtn;
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
        currentSearchTerm = null;
        currentPageTag = clickedTag;
        updateCardContainerByTag(clickedTag, true);
    })
    
    $("#all-note-sidebar-btn").on('click', function(e) {
        e.preventDefault();
    
        currentSearchTerm = null;
        currentPageTag = null;
        updateCardContainer();
    })
    
    const sidebarMenu = $("#sidebar");
    
    document.getElementById("menu-btn").addEventListener('click', toggleSidebar);
    sidebarMenu.on('transitionend webkitTransitionEnd oTransitionEnd', () => {$(mediaItemContainer).masonry('layout');});
}