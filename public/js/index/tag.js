function createTag(tagName) {
    `<button class="card-tag btn  bg-light rounded-pill text-center pt-0 ms-2 my-2 "><p class="mb-5">text</p></button>`

    let btn = document.createElement("button");
    btn.classList.add("card-tag", "btn", "btn-light", "rounded-pill", "text-center", "pt-0", "ms-2", "my-2");
    let text = document.createElement("p");
    text.classList.add("mb-5");
    text.textContent = tagName;
    btn.append(text);

    return btn;
}

function updateTag(updateModalTag) {
    $.ajax({
        url: "/load-note-tag",
        type: 'GET',
        success: function(noteTags) {
            let noteId = [];
            let allNoteId = Array();

            document.querySelectorAll(".note").forEach(note => {
                allNoteId.push(note.dataset.id);
            });

            noteTags.forEach(noteTag => { (!(noteId.includes(noteTag.notes_id))) ? noteId.push(noteTag.notes_id) : false}); // Get unique id
            
            allNoteId.forEach(id => {
                let cardById = document.querySelector(`.card.note[data-id="${id}"]`);
                let cardTags = Array();
                let noteTagContainer = document.querySelector(`[data-id = "${id}"] .card-tags`);
                let noteTagById = noteTags.filter(note => note.notes_id == id);
                
                if (noteTagContainer === null)
                    return;

                noteTagContainer.innerHTML = ""

                if (noteTagById.length < 1) {
                    cardById.removeAttribute("data-tags");
                    return;
                }

                noteTagById.forEach(tag => {
                    noteTagContainer.append(createTag(tag.name));
                    cardTags.push(tag.name);
                })

                cardById.setAttribute("data-tags", cardTags);
            })

            refreshCardContainerLayout();
            if (typeof(updateModalTag) === 'function') updateModalTag(noteTags);
        }
    })
}

function updateModalTag(noteTag) {
    
    let id = document.querySelector("#fullNoteEditor").dataset.id;
    let newTag = Array();

    noteTag.forEach(note => {
        if (note.notes_id == id) 
            newTag.push(note.name);
    })

    let tagEditor = document.getElementById("editorTags");

    if (newTag === undefined)  {
        tagEditor.innerHTML = "";
        return;
    }
    
    tagEditor.innerHTML = "";
    newTag.forEach(tag => {
        tagEditor.append(createTag(tag));
    });
}

function updateManageTagModal() {
    $.ajax({
        url: "/load-tag",
        type: 'GET',
        success: function(data) {
            let allTag = data;

            let currentTagListContainer = document.getElementById("currentTagList");
            currentTagListContainer.innerHTML = "";

            allTag.forEach(tag => {
                currentTagListContainer.append(createTagListElement(tag.name, tag.id));
            });
        }
    })
}

function createTagListElement(tagName, tagId) {
    let taglistexample = `<li class="list-group-item list-group-item-action border border-0 me-auto d-flex justify-content-between align-items-start"><button type="button" class="btn-close" aria-label="Close"><i class="bi bi-x-lg"></i></button></li>`;

    let taglist = document.createElement("li");
    taglist.classList.add("list-group-item", "list-group-item-action", "border", "border-0", "d-flex", "justify-content-between", "align-items-start");
    taglist.textContent = tagName;
    taglist.dataset.id = tagId;
    let deletebtn = document.createElement("button");
    deletebtn.type = "button";
    deletebtn.classList.add("deletetag-btn");
    deletebtn.classList.add("btn-close");
    taglist.append(deletebtn);

    return taglist
}

$("#submitTag").on('click', function(e) {
    e.stopPropagation();

    let formData = $("#editorForm").serializeArray();
    let formToken = formData.find(data => data.name == "_token").value;
    let noteId = document.querySelector("#fullNoteEditor").dataset.id;
    let formUpdateTag = Array();
    
    document.querySelectorAll(".tag-checkbox input:checked").forEach((tagChecked) => {
        formUpdateTag.push(tagChecked.value);
    });

    if (formUpdateTag < 1) formUpdateTag.push(0); //Laravel breaks if empty array is posted, 0 is placeholder for if no checkbox is checked

    $.ajax({
        url: "/add-tag",
        type: 'POST',
        data: {
            "_token" : formToken,
            "notes_id" : noteId,
            "tag_id" : formUpdateTag
        },
        success: function() {
            updateTag(updateModalTag);
        }
    })
});

$("#manageTagBtn").on('click', function(e) {
    e.preventDefault();

    updateManageTagModal();
    $('#tagManagerModal').modal('show');
})

$('#closeManageTagBtn').on('click', function(e) {
    e.preventDefault();
    $('#tagManagerModal').modal('hide');
})

$('body').on('click', '.deletetag-btn', function(e) {
    e.preventDefault();

    let formData = $("#tagEditForm").serializeArray();
    let formToken = formData.find(data => data.name == "_token").value;
    let tagId = e.currentTarget.parentNode.getAttribute("data-id");

    $.ajax({
        url: '/delete-tag',
        type: 'POST',
        data: {
            '_token' : formToken,
            'tagid' : tagId
        },
        success: function() {
            refreshSidebar();
            updateManageTagModal();
            updateTag();
        }
    })
});

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
            updateManageTagModal();
            updateTag();
        }
    })
})