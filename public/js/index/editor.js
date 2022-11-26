//Add note editor
document.getElementById("simpleEditor").addEventListener('click', () => {
    document.getElementById("simpleEditor").classList.add("d-none");
    document.getElementById("fullEditor").classList.remove("d-none");
    document.getElementById("fullEditorTextArea").focus();
});

document.getElementById("cancelBtn").addEventListener('click', () => {
    document.getElementById("fullEditor").classList.add("d-none");
    document.getElementById("simpleEditor").classList.remove("d-none");
    $("#postform")[0].reset();
})

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


//Note editor
$(document).on('click', '#saveBtn', function(e) {
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

$("#editorTagList").on('click', function (e) {

    function createEditorTagCheckBox(name, id) {
        let tag = `
        <label class="dropdown-item"> <input type="checkbox" name="${name}" value="${name}">
            <span class="ps-2">${name}</span>
        </label>
        `;

        let labelTag = document.createElement("label");
        labelTag.classList.add("dropdown-item", "tag-checkbox");
        let inputTag = document.createElement("input");
        inputTag.type = "checkbox";
        inputTag.name = name;
        inputTag.value = id;
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
                tagEditorContainer.append(createEditorTagCheckBox(tag.name, tag.id));
            });
        }
    })
});

$('#fullNoteEditor').on('hidden.bs.modal', function () {
    document.querySelector("#fullNoteEditor").setAttribute('data-id', -1);
})