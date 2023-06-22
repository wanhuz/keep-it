import { updateTag } from "./card";
import { createTag } from "../../ui/tag";

function updateEditorTagContainer() {
    $.ajax({
        url: "/load-note-tag",
        type: 'GET',
        success: function(noteTag) {
            // Get current opened card in editor's id
            let currentlyOpenedNoteId = document.querySelector("#editEditor").dataset.id;
            let newTag = [];
        
            // From all tag data, extract note tags that match note id
            noteTag.forEach(note => {
                if (note.notes_id == currentlyOpenedNoteId) 
                    newTag.push(note.name);
            })
        
            // Get editor container for tags
            let tagEditor = document.getElementById("editorTags");
        
            // If there is no tag, returns
            if (newTag === undefined)  {
                tagEditor.innerHTML = "";
                return;
            }
            
            updateEditorTagsContainer('editorTags', newTag);
        }
    })
}

function updateEditorTagsContainer(editorContainerId, tagsNameArray) {
    let tagEditorContainer = document.getElementById(editorContainerId);

    tagEditorContainer.innerHTML = "";

    tagsNameArray.forEach(tag => {
        tagEditorContainer.append(createTag(tag));
    });
}


function updateAddEditorTagsContainer(editorContainerId, tagsNameArray, tagsIdArray) {
    let tagEditorContainer = document.getElementById(editorContainerId);
    let tagsArray = [];

    for (let i = 0, n = tagsNameArray.length; i < n; i++) {
        tagsArray.push([tagsNameArray[i], tagsIdArray[i]])
    }

    tagEditorContainer.innerHTML = "";

    tagsArray.forEach(tag => {
        tagEditorContainer.append(createTag(tag[0], tag[1]));
    });
}



export function initClickSubmitTag() {
    $("#submitTag").on('click', function(e) {
        e.stopPropagation();

        submitTag('#editorForm', getEditEditorOpenedNoteId(), getEditEditorCheckedTag());
    });

    $('#tagAddEditorSubmitBtn').on('click', function(e, allTag) {
        e.stopPropagation();

        let tagNameArray = Array();
        let tagIdArray = Array();
    
        document.querySelectorAll("#tagAddEditorCheckboxList .tag-checkbox input:checked").forEach((tagChecked) => {
            tagIdArray.push(tagChecked.value);
            tagNameArray.push(tagChecked.name);
        });

        updateAddEditorTagsContainer('tagAddEditorContainer', tagNameArray, tagIdArray);
    })
}

export function getEditEditorOpenedNoteId() {
    return document.querySelector("#editEditor").dataset.id;
}

function getEditEditorCheckedTag() {
    let formUpdateTag = Array();
    
    document.querySelectorAll(".tag-checkbox input:checked").forEach((tagChecked) => {
        formUpdateTag.push(tagChecked.value);
    });

    return formUpdateTag;
}


export function submitTag(formId, noteId, newTagId) {
    const formData = $(formId).serializeArray();
    const formToken = formData.find(data => data.name == "_token").value;

    //Laravel breaks if empty array is posted, 0 is placeholder for if no checkbox is checked
    if (newTagId < 1) 
        newTagId.push(0); 

    $.ajax({
        url: "/add-tag",
        type: 'POST',
        data: {
            "_token" : formToken,
            "notes_id" : noteId,
            "tag_id" : newTagId
        },
        success: function() {
            updateTag();
            updateEditorTagContainer();
        }
    })
}
