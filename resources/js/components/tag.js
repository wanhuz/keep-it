import { refreshCardContainerLayout } from "./card";
import { refreshSidebar } from "./sidebar";
import { createTagListModal } from "../ui/tag";
import { createTag } from "../ui/tag";

export function updateTag(updateModalTag) {
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
                currentTagListContainer.append(createTagListModal(tag.name, tag.id));
            });
        }
    })
}

export function initClickSubmitTag() {
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
}

export function initClickOpenTagManager() {
    $("#manageTagBtn").on('click', function(e) {
        e.preventDefault();
    
        updateManageTagModal();
        $('#tagManagerModal').modal('show');
    })
}

export function initClickCloseTagManager() {
    $('#closeManageTagBtn').on('click', function(e) {
        e.preventDefault();
        $('#tagManagerModal').modal('hide');
    })
}


export function initClickDeleteTagBtn() {
    $('body').on('click', '.deletetag-btn', function(e) {
        e.preventDefault();
    
        let formData = $("#tagEditForm").serializeArray();
        let formToken = formData.find(data => data.name == "_token").value;
        let tagId = e.currentTarget.parentNode.parentNode.getAttribute("data-id");
    
        $.ajax({
            url: '/delete-tag',
            type: 'POST',
            data: {
                '_token' : formToken,
                'id' : tagId
            },
            success: function() {
                refreshSidebar();
                updateManageTagModal();
                updateTag();
            }
        })
    });
}

export function initClickEditTagBtn() {
    $('body').on('click', '.edittag-btn', function(e) {
        e.preventDefault();
    
        let tagName =  e.currentTarget.parentNode.parentNode.getAttribute("data-name");
        let tagInput = document.getElementById(tagName + "TagInput");
        
        tagInput.readOnly = false;
        tagInput.focus();
    });
}


export function initBlurEditTagInput() {
    $('body').on('blur', '.edittag-input', function(e) {
        e.preventDefault();
    
        let formData = $("#tagEditForm").serializeArray();
        let formToken = formData.find(data => data.name == "_token").value;
        let tagId = e.currentTarget.parentNode.getAttribute("data-id");
        let currentTagName = e.currentTarget.parentNode.getAttribute("data-name");
        let newTagName = document.getElementById(currentTagName + "TagInput").value;
        
        if (!newTagName || newTagName == currentTagName) return;
    
        $.ajax({
            url: '/update-tag',
            type: 'POST',
            data: {
                '_token' : formToken,
                'id' : tagId,
                'name' : newTagName,
            },
            success: function() {
                refreshSidebar();
                updateManageTagModal();
                updateTag();
            }
        })
    })
}

export function initKeypressEditTagBtn() {
    $('body').on('keypress', '.edittag-input', function(e) {
        if (e.which == '13') {
            e.preventDefault();
            e.currentTarget.blur();
        }
    })
}

export function initClickAddTagBtn() {
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
}
