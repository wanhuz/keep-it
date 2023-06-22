import {getEditor, getEditPostEditor} from '../wysiwyg/tiptap.js'
import { updatePage } from './container';
import { createTag } from '../ui/tag.js';
import {createEditorTagCheckBox} from '../ui/tag.js';

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

        const editor = getEditor();
        const titleTextArea = document.getElementById('titleTextArea');

        document.getElementById("fullEditor").classList.add("d-none");
        document.getElementById("simpleEditor").classList.remove("d-none");
        titleTextArea.value = '';
        editor.commands.clearContent();
    })
}

export function initClickSubmitEditor() {
    $(document).on('click', '#submitBtn', function(e) {
        e.preventDefault();

        const editor = getEditor();
        const titleTextArea = document.getElementById('titleTextArea');
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
            success: function() {
                updatePage();
                titleTextArea.value = '';
                editor.commands.clearContent();
            }
        })
    })
}


export function initClickUpdateEditorBtn() {
    $(document).on('click', '#saveBtn', function(e) {
        e.preventDefault();

        const editor = getEditPostEditor();  
        let formData = $("#editorForm").serializeArray();
        let formToken = formData.find(data => data.name == "_token").value;
        let newNoteId = document.querySelector("#fullNoteEditor").dataset.id;
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
                $('#fullNoteEditor').modal('hide');
            }
        })
    })
}

export function initClickRemoveEditorBtn() {
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
                updatePage();
                $('#fullNoteEditor').modal('hide');
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
    $('#fullNoteEditor').on('hidden.bs.modal', function () {
        document.querySelector("#fullNoteEditor").setAttribute('data-id', -1);
    })
}

export function initEditor() {
    const editor = getEditor();

    $('#bulletListBtn').on('click', (e) => {
        e.preventDefault();
        editor.commands.toggleBulletList();
    });

    $('#orderedListBtn').on('click', (e) => {
        e.preventDefault();
        editor.commands.toggleOrderedList();
    });
}

export function initClickNote() {
    $(document).on('click', '.note', function(e) {
        const editor = getEditPostEditor();

        $('#fullNoteEditor').modal('show');
        let clickId = $(this).data('id');
    
        document.querySelector("#fullNoteEditor").setAttribute('data-id', clickId);
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