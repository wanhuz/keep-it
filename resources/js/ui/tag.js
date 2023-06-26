export function createEditorTagCheckBox(name, id) {
    const tagCheckboxHTML = `
    <label class="dropdown-item tag-checkbox"> <input type="checkbox" name="${name}" value="${id}">
        <span class="ps-2">${name}</span>
    </label>
    `
    const tagCheckboxDiv = document.createElement("div");
    tagCheckboxDiv.innerHTML = tagCheckboxHTML;

    return tagCheckboxDiv;
}

export function createTagListModal(tagName, tagId) {
    let taglistexample = `
    <li class="list-group-item list-group-item-action border border-0 me-auto d-flex justify-content-between align-items-start">
        <button type="button" class="btn-close" aria-label="Close">
            <i class="bi bi-x-lg"></i>
        </button>
    </li>`;

    let taglist = document.createElement("li");
    taglist.classList.add("list-group-item", "list-group-item-action", "border", "border-0", "d-flex", "justify-content-between", "align-items-start");
    taglist.dataset.id = tagId;
    taglist.dataset.name = tagName;

    let tagNameInput = document.createElement("input");
    tagNameInput.classList.add("border-0", "bg-transparent", "form-control", "py-0","shadow-none", "w-auto");
    tagNameInput.classList.add("edittag-input");
    tagNameInput.placeholder = tagName;
    tagNameInput.readOnly = true;
    tagNameInput.id = tagName + "TagInput"
    taglist.append(tagNameInput);

    let buttondiv = document.createElement("div");

    let deletebtn = document.createElement("button");
    deletebtn.type = "button";
    deletebtn.classList.add("deletetag-btn", "pe-0", "py-0", "border", "border-0", "bg-transparent");
    let deletebtnicon = document.createElement("icon");
    deletebtnicon.classList.add("bi", "bi-x-lg");
    deletebtn.append(deletebtnicon);


    let editbtn = document.createElement("button");
    editbtn.type = "button";
    editbtn.classList.add("edittag-btn", "pe-1", "py-0", "border", "border-0", "bg-transparent");
    let editbtnicon = document.createElement("icon");
    editbtnicon.classList.add("bi", "bi-pencil-square");
    editbtn.append(editbtnicon);
    
    buttondiv.append(editbtn)
    buttondiv.append(deletebtn);
    taglist.append(buttondiv);

    return taglist
}

export function createTag(name, id) {
    const tagPillHTML = `
    <button class="card-tag note-tag btn btn-light rounded-pill text-center align-middle pt-0 ms-2 my-2" value="${id}">
        <p class="mb-5">${name}</p>
    </button>
    `

    const tagCheckboxSpan = document.createElement("span");
    tagCheckboxSpan.innerHTML = tagPillHTML;

    return tagCheckboxSpan;
}