function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    const sidebarText = document.querySelectorAll("#sidebar span");
    const sidebarMenu = document.getElementById("sidebar-menu");

    if (sidebarText.item(0).classList.contains("d-none")) {
        sidebarText.forEach(text => {
            text.classList.remove("d-none");
        })

        sidebarMenu.style.width = "230px";

        document.querySelectorAll("#sidebar-menu button").forEach(button => {
            button.style.borderRadius = "70px;";
            button.style.paddingRight = "50px";
        })
    }
    else {
        sidebarText.forEach(text => {
            text.classList.add("d-none");
        })

        sidebarMenu.style.width = "50px";
        document.querySelectorAll("#sidebar-menu button").forEach(button => {
            button.style.borderRadius = "100px";
            button.style.paddingRight = "10px";
        })


    }
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

const sidebarMenu = $("#sidebar-menu");

document.getElementById("sidebar-btn").addEventListener('click', toggleSidebar);
sidebarMenu.on('transitionend webkitTransitionEnd oTransitionEnd', refreshCardContainerLayout);