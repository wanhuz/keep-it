
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

function reloadItems() {
    $('#card-container').masonry({});
}

document.getElementById("simpleEditor").addEventListener('click', () => {
    document.getElementById("simpleEditor").classList.add("d-none");
    document.getElementById("fullEditor").classList.remove("d-none");

    document.getElementById("fullEditorTextArea").focus();


});

document.getElementById("cancelBtn").addEventListener('click', () => {

    document.getElementById("fullEditor").classList.add("d-none");
    document.getElementById("simpleEditor").classList.remove("d-none");
})

const sidebarMenu = $("#sidebar-menu");

document.getElementById("sidebar-btn").addEventListener('click', toggleSidebar);
sidebarMenu.on('transitionend webkitTransitionEnd oTransitionEnd', reloadItems);

