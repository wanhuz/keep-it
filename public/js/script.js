var mediaItemContainer = $( '#card-container' );

mediaItemContainer.masonry( {
    columnWidth:  100,
    itemSelector: '.card'
} );


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

function refreshCardContainerLayout() {
    $(mediaItemContainer).masonry('reloadItems');
    $(mediaItemContainer).masonry('layout');
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
sidebarMenu.on('transitionend webkitTransitionEnd oTransitionEnd', refreshCardContainerLayout);


function getNewNoteId(currentNoteData, newNoteData) {
    let tempCurrentNoteId = new Array();
    let tempNewNoteId = new Array();

    for (let i = 0; i < currentNoteData.length; i++) {
        tempCurrentNoteId.push(currentNoteData[i].id);
    }

    for (let i = 0; i < newNoteData.length; i++) {
        tempNewNoteId.push(newNoteData[i].id);
    }

    return tempNewNoteId.filter(newId => !tempCurrentNoteId.includes(newId));
}

function updateNote(updatedNoteId, newNoteData) {
    let updatedNoteData = Array.from(newNoteData).filter(newNote => updatedNoteId.includes(newNote.id));
    
    updatedNoteData.forEach(noteData => {
        document.querySelector(`[data-id = "${noteData.id}"] .card-title`).textContent = noteData.title;
        document.querySelector(`[data-id = "${noteData.id}"] .card-text`).textContent = noteData.body;
        document.querySelector(`[data-id = "${noteData.id}"]`).setAttribute("data-revision-count", noteData.revision_count);
    })

}

function getRemovedNoteId(currentNoteData, newNoteData) {
    let tempCurrentNoteId = new Array();
    let tempNewNoteId = new Array();

    for (let i = 0; i < currentNoteData.length; i++) {
        tempCurrentNoteId.push(currentNoteData[i].id);
    }

    for (let i = 0; i < newNoteData.length; i++) {
        tempNewNoteId.push(newNoteData[i].id);
    }

    return tempCurrentNoteId.filter(oldId => !tempNewNoteId.includes(oldId));
}

function createCard(title, text, id, lastupdated) {
    let card = document.createElement("div");
    let innerdiv = document.createElement("div");;
    let cardtitle = document.createElement("h5");
    let cardtext = document.createElement("p");
    let titleNode = document.createTextNode(title);
    let textNode = document.createTextNode(text);
    card.dataset.id = id;
    card.dataset.lastupdated = lastupdated;

    card.classList.add("card");
    card.classList.add("note");
    card.style.width = "18rem";

    innerdiv.classList.add("card-body");
    innerdiv.classList.add("text-start");
    card.append(innerdiv);

    cardtitle.classList.add("card-title");
    cardtitle.append(titleNode);
    innerdiv.append(cardtitle);
    cardtext.classList.add("card-text");
    cardtext.append(textNode);
    innerdiv.append(cardtext);

    return card;
}

function addNote(newNoteId, newNotesData) {
    let newCardData = newNotesData.filter(note => note.id == newNoteId);

    newCardData.forEach(function(card) {
        $(mediaItemContainer).prepend(createCard(card.title, card.body, card.id, card.lastupdated));
    })

    return;
}

function removeNote(removedNotesId) {
    let currentNoteNode = document.querySelectorAll(".note");

    if (removedNotesId.length < 1) return;

    currentNoteNode.forEach((node) => {
        if (node.getAttribute('data-id').includes(removedNotesId)) {
            $(mediaItemContainer).masonry('remove', node).masonry();
        }
    })

    refreshCardContainerLayout();
}


function getUpdatedNoteId(currentNoteData, newNoteData) {
    let updatedNoteId = new Array();


    for (let i = 0; i < currentNoteData.length; i++) {
        for (let j = 0; j < newNoteData.length; j++) {
            if ((currentNoteData[i].id == newNoteData[j].id) && (newNoteData[j].revision_count > currentNoteData[i].revisionCount)) {
                updatedNoteId.push(currentNoteData[i].id);
                break;
            }
        }
    }

    return updatedNoteId;
}

$("#sidebar-btn2").on('click', updateCardContainer);

function updateCardContainer() {
    //Get current view data
    let currentNotesDataHtml = document.getElementsByClassName("note");
    let currentNoteData = new Array();

    for (let i = 0; i < currentNotesDataHtml.length; i++) {

        const note = {
            id: parseInt(currentNotesDataHtml[i].getAttribute('data-id')),
            revisionCount: currentNotesDataHtml[i].getAttribute('data-revision-count')
        };

        currentNoteData.push(note);
    }


    //Get new data
    $.ajax({
        url: "/load",
        type: 'GET',
        success: function(data) {
            let newNoteData = JSON.parse(data);

            newNotesId = getNewNoteId(currentNoteData ,newNoteData);
            removedNotesId = getRemovedNoteId(currentNoteData, newNoteData);
            updatedNotesId = getUpdatedNoteId(currentNoteData, newNoteData);

            addNote(newNotesId, newNoteData);
            removeNote(removedNotesId);
            updateNote(updatedNotesId, newNoteData);
            refreshCardContainerLayout();
        }
    })

}


$(document).on('click', '#submitBtn', function() {
    let formData = $("#postform").serializeArray();
    let noteTitle = formData.find(data => data.name == "title").value;
    let noteBody = formData.find(data => data.name == "body").value;
    let formToken = formData.find(data => data.name == "_token").value;

    $.ajax({
        type: "POST",
        url: "/post",
        data: {
            "_token" : formToken,
            'title' : noteTitle,
            'body' : noteBody
        },
        success: function() {
            updateCardContainer();
        }
    })
})

$(document).on('click', '#closeEditorBtn', function(e) {
    e.preventDefault();
    let formData = $("#editorForm").serializeArray();
    let formToken = formData.find(data => data.name == "_token").value;
    let newNoteId = document.querySelector("#fullNoteEditor").dataset.id;
    let newNoteTitle = formData.find(data => data.name == "title").value;
    let newNoteBody = formData.find(data => data.name == "body").value;


    $.ajax({
        type: "POST",
        url: "/update",
        data: {
            "_token" : formToken,
            'title' : newNoteTitle,
            'body' : newNoteBody,
            'id' : newNoteId
        },
        success: function() {
            updateCardContainer();
            $('#fullNoteEditor').modal('hide');
        }
    })
})

$(document).on('click', '#removeBtn', function(e) {
    e.preventDefault();

    let formData = $("#editorForm").serializeArray();
    let formToken = formData.find(data => data.name == "_token").value;
    let removedNoteId = document.querySelector("#fullNoteEditor").dataset.id;

    $.ajax({
        type: "POST",
        url: "/delete",
        data: {
            "_token" : formToken,
            'id' : removedNoteId
        },
        success: function() {
            updateCardContainer();
            $('#fullNoteEditor').modal('hide');
        }
    })
})

$(document).on('click', '.note', function(e) {

    $('#fullNoteEditor').modal('show');
    let clickId = $(this).data('id');

    document.querySelector("#fullNoteEditor").setAttribute('data-id', clickId);
    let clickedNoteTitle = document.querySelector(`[data-id = "${clickId}"] .card-title`).outerText;
    let clickedNoteBody = document.querySelector(`[data-id = "${clickId}"] .card-text`).outerText;

    document.getElementById('titleEditor').value = clickedNoteTitle;
    document.getElementById('bodyEditor').value = clickedNoteBody;
})

$('#fullNoteEditor').on('hidden.bs.modal', function () {
    
})