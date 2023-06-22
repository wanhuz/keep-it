export function createSidebarBtn(tagName) {
    const tagBtnHtml = `
    <button type="button" class="btn tag-btn ms-3 text-start sidebar-btn w-75" value="${tagName}">
        <i class="bi bi-bookmark"></i>
        <span class="ps-3">${tagName}</span>
    </button>
    `

    const tagBtn = document.createElement("div");
    tagBtn.innerHTML = tagBtnHtml;

    return tagBtn;
}