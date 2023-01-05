function toggleSidebar() {
    var sidebar = document.querySelector("#sidebar")
    var container = document.querySelector(".main-container")

    sidebar.classList.toggle("active-nav")
    container.classList.toggle("active-cont")
}

function createSidebarBtn(tagText) {
    let sidebarBtn = document.createElement("button");
    sidebarBtn.classList.add("btn");
    sidebarBtn.classList.add("btn-light");
    sidebarBtn.classList.add("ms-1");
    sidebarBtn.classList.add("text-start");

    let icon = document.createElement("i");
    icon.classList.add("bi");
    icon.classList.add("bi-bookmark");

    let text = document.createElement("span");
    text.classList.add("ps-4");
    text.textContent = tagText;

    
    sidebarBtn.append(icon);
    sidebarBtn.append(text);
    
    return sidebarBtn;
}

function refreshSidebar() {
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

$("#tagAddBtn").on('click', function(e) {
    e.preventDefault();

    $('#tagAddModal').modal('show');
})

$(document).on('click', '#addTagBtn', function(e) {
    e.preventDefault();

    let formData = $("#tagAddForm").serializeArray();
    let formToken = formData.find(data => data.name == "_token").value;
    let newTagName = formData.find(data => data.name == "tagName").value;

    $.ajax({
        type: "POST",
        url: "/post-tag",
        data: {
            "_token" : formToken,
            'name' : newTagName
        },
        success: function() {
            $("#tagAddForm")[0].reset();
            refreshSidebar();
        }
    })
})

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
sidebarMenu.on('transitionend webkitTransitionEnd oTransitionEnd', refreshCardContainerLayout);