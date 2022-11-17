var mediaItemContainer = $( '#card-container' );

const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))

let intervalRefresh = window.setInterval(updatePage, 5000)

updateNoteTag();
function updatePage() {
    updateCardContainer();
    //refreshSidebar();
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

$("#sidebar-btn2").on('click', updateNoteTag);

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

function createTagSidebarBtn(tagText) {
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
                sidebarBtnContainer.append(createTagSidebarBtn(tag.name));
            });

            
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
            $("#postform")[0].reset();
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
    let clickedNoteTitle = document.querySelector(`.card.note[data-id="${clickId}"] .card-title`).outerText;
    let clickedNoteBody = document.querySelector(`.card.note[data-id="${clickId}"] .card-text`).outerText;
    let clickedNoteTags = document.querySelector(`.card.note[data-id="${clickId}"]`).dataset.tags;
    clickedNoteTags = String(clickedNoteTags).split(",");

    document.getElementById('titleEditor').value = clickedNoteTitle;
    document.getElementById('bodyEditor').value = clickedNoteBody;
    let tagEditor = document.getElementById("editorTags");

    tagEditor.innerHTML = "";
    clickedNoteTags.forEach(tag => {
        tagEditor.append(createNoteTag(tag));
    });

})

$('#fullNoteEditor').on('hidden.bs.modal', function () {
    document.querySelector("#fullNoteEditor").setAttribute('data-id', -1);
})

$("#tagEditorBtn").on('click', function(e) {
    e.preventDefault();

    $('#tagEditorModal').modal('show');
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

$("#tagNoteBtn").on('click', function(e) {
    e.preventDefault();

})



$("#editorTagList").on('click', function (e) {

    function createEditorTagCheckBox(name) {
        let tag = `
        <label class="dropdown-item"> <input type="checkbox" name="${name}" value="${name}">
            <span class="ps-2">${name}</span>
        </label>
        `;

        let labelTag = document.createElement("label");
        labelTag.classList.add("dropdown-item");
        let inputTag = document.createElement("input");
        inputTag.type = "checkbox";
        inputTag.name = name;
        inputTag.value = name;
        let textTag = document.createElement("span");
        textTag.classList.add("ps-2");
        textTag.textContent = name;

        labelTag.append(inputTag);
        labelTag.append(textTag);

        return labelTag;
    }

    $.ajax({
        url: "/load-tag",
        type: 'GET',
        success: function(data) {
            let allTag = data;
            let tagEditorContainer = document.getElementById("tagEditorCheckbox");
            tagEditorContainer.innerHTML = "";

            allTag.forEach(tag => {
                tagEditorContainer.append(createEditorTagCheckBox(tag.name));
            });
        }
    })
});

$(".dropdown-menu").on('click', function (e) {
    e.stopPropagation();
})

function createNoteTag(tagName) {
    `<button class="card-tag btn  bg-light rounded-pill text-center pt-0 ms-2 my-2 "><p class="mb-5">text</p></button>`

    let btn = document.createElement("button");
    btn.classList.add("card-tag", "btn", "btn-light", "rounded-pill", "text-center", "pt-0", "ms-2", "my-2");
    let text = document.createElement("p");
    text.classList.add("mb-5");
    text.textContent = tagName;
    btn.append(text);

    return btn;
}

function updateNoteTag() {

    function getUpdatedTag(newTag) {
        let oldTag = document.query
    }

    $.ajax({
        url: "/load-note-tag",
        type: 'GET',
        success: function(noteTags) {
            let noteId = Array();


            
            noteTags.forEach(noteTag => { (!(noteId.includes(noteTag.notes_id))) ? noteId.push(noteTag.notes_id) : 0}); // Get unique id
            
            noteId.forEach(id => {
                let cardById = document.querySelector(`[data-id = "${id}"]`);
                let cardTags = Array();
                let noteTagContainer = document.querySelector(`[data-id = "${id}"] .card-tags`);
                let noteTagById = noteTags.filter(note => note.notes_id == id);
                


                noteTagContainer.innerHTML = ""
                noteTagById.forEach(tag => {
                    noteTagContainer.append(createNoteTag(tag.name));
                    cardTags.push(tag.name);
                })

                cardById.setAttribute("data-tags", cardTags);
            })

        }
    })
}