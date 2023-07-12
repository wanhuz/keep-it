import { submitTag } from './tag.js';
import { submitImages} from './image.js'; 
import { getImageList, clearImageContainer, clearImageList} from './image-container.js';
import { getEditor } from '../wysiwyg/tiptap.js'
import { updatePage } from '../card/container.js';
import { createEditorTagCheckBox } from '../../views/tag.js';

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
                let imageList = getImageList();

                submitTag('#postform', storedNote.id, getAddEditorTagId());
                submitImages(storedNote.id, imageList);
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
    clearImageContainer('addEditorImgContainerId');
    clearImageList();
}

export function initOnClickAddEditorTagList() {
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

export function initAddEditor() {
    const addEditor = getEditor();

    $('#bulletListBtn').on('click', (e) => {
        e.preventDefault();
        addEditor.commands.toggleBulletList();
    });

    $('#orderedListBtn').on('click', (e) => {
        e.preventDefault();
        addEditor.commands.toggleOrderedList();
    });
}