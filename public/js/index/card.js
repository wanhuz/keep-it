

//Note utility function
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

//Note UI manipulation
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

function updateNote(updatedNoteId, newNoteData) {
    let updatedNoteData = Array.from(newNoteData).filter(newNote => updatedNoteId.includes(newNote.id));
    
    updatedNoteData.forEach(noteData => {
        document.querySelector(`[data-id = "${noteData.id}"] .card-title`).textContent = noteData.title;
        document.querySelector(`[data-id = "${noteData.id}"] .card-text`).textContent = noteData.body;
        document.querySelector(`[data-id = "${noteData.id}"]`).setAttribute("data-revision-count", noteData.revision_count);
    })

}

function createCard(title, text, id, lastupdated) {
    let card = document.createElement("div");
    let innerdiv = document.createElement("div");;
    let cardtitle = document.createElement("h5");
    let cardtext = document.createElement("p");
    let titleNode = document.createTextNode(title);
    let textNode = document.createTextNode(text);
    card.dataset.id = id;

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
            updateTag();
            refreshCardContainerLayout();
        }
    })
}

function clearCardContainer() {
    document.querySelector("#card-container").innerHTML = "";
}

function updateCardContainerBasedOnTag(noteData) {

    function addNote(noteData) {
        noteData.forEach(function(note) {
            $(mediaItemContainer).prepend(createCard(note.title, note.body, note.id, note.lastupdated));
        })
    }

    let noteIdByTag = Array();
    
    noteData.forEach(note => {
        noteIdByTag.push(note.id);
    })

    clearCardContainer();
    addNote(noteData);
    refreshCardContainerLayout();
}

function refreshCardContainerLayout() {
    $(mediaItemContainer).masonry('reloadItems');
    $(mediaItemContainer).masonry('layout');
}

$(document).on('click', '.note', function(e) {

    $('#fullNoteEditor').modal('show');
    let clickId = $(this).data('id');

    document.querySelector("#fullNoteEditor").setAttribute('data-id', clickId);
    let tagEditor = document.getElementById("editorTags");
    let clickedNoteTitle = document.querySelector(`.card.note[data-id="${clickId}"] .card-title`).outerText;
    let clickedNoteBody = document.querySelector(`.card.note[data-id="${clickId}"] .card-text`).outerText;
    let clickedNoteTags = document.querySelector(`.card.note[data-id="${clickId}"]`).dataset.tags;

    document.getElementById('titleEditor').value = clickedNoteTitle;
    document.getElementById('bodyEditor').value = clickedNoteBody;

    if (clickedNoteTags === undefined)  {
        tagEditor.innerHTML = "";
        return;
    }

    clickedNoteTags = String(clickedNoteTags).split(",");
    
    tagEditor.innerHTML = "";
    clickedNoteTags.forEach(tag => {
        tagEditor.append(createTag(tag));
    });

})