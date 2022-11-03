var mediaItemContainer = $( '#card-container' );

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

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

function getUpdatedNoteId(oldNote, newNote) {

}

function getNewNoteId(oldNotesDataId,newNotesDataId) {
    return newNotesDataId.filter(x => !oldNotesDataId.includes(x));
}

function updateNote(oldNotesDataId,newNotesDataId, newNoteData) {
    let matchingNote = newNotesDataId.filter(x => oldNotesDataId.includes(x));


}

function getRemovedNoteId(oldNotesDataId,newNotesDataId) {
    return oldNotesDataId.filter(x => !newNotesDataId.includes(x));
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

function addNotes(newNoteId, newNotesData) {
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

function updateCardContainer() {
    //Get current view data
    let currentNotesDataHtml = document.getElementsByClassName("note");
    let currentNoteData = new Array();

    for (let i = 0; i < currentNotesDataHtml.length; i++) {

        const note = {
            id: parseInt(currentNotesDataHtml[i].getAttribute('data-id')),
            lastupdated: new Date(currentNotesDataHtml[i].getAttribute('data-last-updated'))
        };

        currentNoteData.push(note);
    }

    //Get new data
    $.ajax({
        url: "/load",
        type: 'GET',
        success: function(data) {
            let newNotesData = JSON.parse(data);
            let newNotesId, removedNotesId;
            let newNotesDataId = new Array();
            let oldNotesDataId = new Array();

            for (let i = 0; i < newNotesData.length; i++) {
                newNotesDataId.push(newNotesData[i].id);
            }
            for (let i = 0; i < currentNoteData.length; i++) {
                oldNotesDataId.push(currentNoteData[i].id);
            }

            newNotesId = getNewNoteId(oldNotesDataId ,newNotesDataId);
            removedNotesId = getRemovedNoteId(oldNotesDataId ,newNotesDataId);
           // updatedNotesId = getUpdatedNoteId(oldNotesDataId ,newNotesDataId, )
            //return;
            addNotes(newNotesId, newNotesData);
            removeNote(removedNotesId);
            refreshCardContainerLayout();
            return;
            //updateNotes(updateNoteId, newNotesData);
            //removeNotes(removedNoteId, newNotesData);

            let updatedNoteId = getUpdatedNoteId(currentNoteData, newNotesDataJson);
            let newNoteId = getNewNoteId();

            updateNote(newNoteId, updatedNoteId, newNotesData);
        }
    })

    //If last accessed of new card higher than current card, update its body and title


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