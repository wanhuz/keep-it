import {getEditor, getEditPostEditor} from '../wysiwyg/tiptap.js'
import { updatePage } from './container';
import {createTag, createEditorTagCheckBox} from '../ui/tag.js';
import { submitTag } from './tag/editor.js';

export function initClickSimpleEditor() {
    document.getElementById("simpleEditor").addEventListener('click', () => {
        document.getElementById("simpleEditor").classList.add("d-none");
        document.getElementById("fullEditor").classList.remove("d-none");
        document.getElementById('titleTextArea').focus();
    });
}

export function initClickCancelEditor() {
    document.getElementById("cancelBtn").addEventListener('click', (e) => {
        e.preventDefault();

        document.getElementById("fullEditor").classList.add("d-none");
        document.getElementById("simpleEditor").classList.remove("d-none");
        clearAddEditor();
    })
}

export function initClickSubmitEditor() {
    $(document).on('click', '#submitBtn', function(e) {
        e.preventDefault();

        const editor = getEditor();
        const formData = $("#postform").serializeArray();

        const noteTitle = formData.find(data => data.name == "title").value;
        const noteBody = editor.getJSON();
        const formToken = formData.find(data => data.name == "_token").value;
    
        $.ajax({
            type: "POST",
            url: "/post",
            data: {
                "_token" : formToken,
                'title' : noteTitle,
                'body' : noteBody
            },
            success: function(storedNote) {
                updatePage();

                submitTag('#postform', storedNote.id, getAddEditorTagId());
                clearAddEditor();
            }
        })
    })
}

function getAddEditorTagId() {
    let tagId = [];

    document.querySelectorAll('#tagAddEditorContainer .card-tag').forEach(tag => {
        tagId.push(tag.value);
    })

    return tagId
}

function clearAddEditor() {
    const editor = getEditor();
    const titleTextArea = document.getElementById('titleTextArea');

    titleTextArea.value = '';
    editor.commands.clearContent();
    document.getElementById('tagAddEditorContainer').innerHTML = '';
}


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

    $("#tagAddEditorButton").on('click', function (e) {
        $.ajax({
            url: "/load-tag",
            type: 'GET',
            success: function(data) {
                let allTag = data;
                let tagEditorContainer = document.getElementById("tagAddEditorCheckboxList");
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
    })
}

export function initEditor() {
    const addEditor = getEditor();
    const editEditor = getEditPostEditor();

    $('#bulletListBtn').on('click', (e) => {
        e.preventDefault();
        addEditor.commands.toggleBulletList();
    });

    $('#orderedListBtn').on('click', (e) => {
        e.preventDefault();
        addEditor.commands.toggleOrderedList();
    });

    $('#bulletListModalBtn').on('click', (e) => {
        e.preventDefault();
        editEditor.commands.toggleBulletList();
    });

    $('#orderedListModalBtn').on('click', (e) => {
        e.preventDefault();
        editEditor.commands.toggleOrderedList();
    });
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
    
        document.getElementById('titleEditor').value = clickedNoteTitle;
        editor.commands.setContent(clickedNoteBody);
    
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
}