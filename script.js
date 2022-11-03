$('.grid').masonry({
    columnWidth: 200,
    itemSelector: '.grid-item'
  });


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
            
        })
    }
    else {
        sidebarText.forEach(text => {
            text.classList.add("d-none");
        })

        sidebarMenu.style.width = "20px";
        document.querySelectorAll("#sidebar-menu button").forEach(button => {
            button.style.borderRadius = "100px";
        })


    }
}

function reloadItems() {
    var $cards = $('#card-container').masonry({});
}

document.getElementById("simpleEditor").addEventListener('click', () => {
    document.getElementById("simpleEditor").classList.add("d-none");
    document.getElementById("fullEditor").classList.remove("d-none");

    document.getElementById("fullEditorTextArea").focus();
    var $cards = $('#card-container').masonry({});

});

document.getElementById("fullEditor").addEventListener('focusout', (event) => {

    document.getElementById("fullEditor").classList.add("d-none");
    document.getElementById("simpleEditor").classList.remove("d-none");
})

const sidebarMenu = $("#sidebar-menu");

document.getElementById("sidebar-btn").addEventListener('click', toggleSidebar);
sidebarMenu.on('transitionend webkitTransitionEnd oTransitionEnd', reloadItems);




/*
window.addEventListener("click", (event) => {
    if (event.target.id !== "titleTextArea" || event.target.id !== "noteTextArea" || event.target.id !== "simpleEditor") {
        console.log(event.target.id);
        document.getElementById("simpleEditor").classList.remove("d-none");

        document.getElementById("fullEditor").classList.add("d-none");
    }
} )

*/