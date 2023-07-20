import {getEditPostEditor} from '../wysiwyg/tiptap.js'
import { updatePage } from '../card/container.js';
import {createTag, createEditorTagCheckBox} from '../../views/tag.js';
import { initEditorButtons} from './common.js';
import { addImageForPreview } from './image/image.js';
import { clearImageContainer } from './image/container.js';
import { getAllPreviewElementCopy } from '../card/image.js';

export function initClickUpdateEditorBtn() {
    $(document).on('click', '#saveBtn', function(e) {
        e.preventDefault();

        const editor = getEditPostEditor();  
        let formData = $("#editorForm").serializeArray();
        let formToken = formData.find(data => data.name == "_token").value;
        let newNoteId = document.querySelector("#editEditor").dataset.id;
        let newNoteTitle = formData.find(data => data.name == "title").value;
        let newNoteBody = editor.getJSON();

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
                updatePage();
                $('#editEditor').modal('hide');
            }
        })
    })
}

export function initClickRemoveEditorBtn() {
    $(document).on('click', '#removeBtn', function(e) {
        e.preventDefault();
    
        let formData = $("#editorForm").serializeArray();
        let formToken = formData.find(data => data.name == "_token").value;
        let removedNoteId = document.querySelector("#editEditor").dataset.id;
    
        $.ajax({
            type: "POST",
            url: "/delete",
            data: {
                "_token" : formToken,
                'id' : removedNoteId
            },
            success: function() {
                updatePage();
                $('#editEditor').modal('hide');
            }
        })
    })
}

export function initClickEditorTagList() {
    $("#tagNoteBtn").on('click', function (e) {
        $.ajax({
            url: "/load-tag",
            type: 'GET',
            success: function(data) {
                let allTag = data;
                let tagEditorContainer = document.getElementById("tagEditorCheckbox");
                tagEditorContainer.innerHTML = "";
    
                allTag.forEach(tag => {
                    tagEditorContainer.append(createEditorTagCheckBox(tag.name, tag.id));
                });
            }
        })
    });
}

export function initHiddenEditor() {
    $('#editEditor').on('hidden.bs.modal', function () {
        document.querySelector("#editEditor").setAttribute('data-id', -1);
        clearImageContainer('editEditorContainerId');
    })
}

export function initEditEditor() {
    const editEditor = getEditPostEditor();

    initEditorButtons(editEditor, 'bulletListModalBtn', 'orderedListModalBtn');
    // initAddImageButton('#addImgEditBtn', '#inputImgEdit');
    // initEditorImageContainer('#inputImgEdit', '#editEditorContainerId');
}

export function initClickNote() {
    $(document).on('click', '.note', function(e) {
        const editor = getEditPostEditor();

        $('#editEditor').modal('show');
        let clickId = $(this).data('id');
    
        document.querySelector("#editEditor").setAttribute('data-id', clickId);
        let tagEditor = document.getElementById("editorTags");
        let clickedNoteTitle = document.querySelector(`.card.note[data-id="${clickId}"] .card-title`).outerText;
        let clickedNoteBody = document.querySelector(`.card.note[data-id="${clickId}"] .card-content`).innerHTML;
        let clickedNoteTags = document.querySelector(`.card.note[data-id="${clickId}"]`).dataset.tags;
        let clickedNoteImageElement = getAllPreviewElementCopy(clickId);
    
        document.getElementById('titleEditor').value = clickedNoteTitle;
        editor.commands.setContent(clickedNoteBody);
    
        if (clickedNoteTags === undefined)  {
            tagEditor.innerHTML = "";
        }
        else {
            clickedNoteTags = String(clickedNoteTags).split(",");
        
            tagEditor.innerHTML = "";
            clickedNoteTags.forEach(tag => {
                tagEditor.append(createTag(tag));
            });
        }

        clickedNoteImageElement.forEach(previewImgElement => {
            addImageForPreview('editEditorContainerId', previewImgElement);
        })
    
    })
}

