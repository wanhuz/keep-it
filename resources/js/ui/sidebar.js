export function createSidebarBtn(btnName, btnId, btnIconClass, btnClass) {
    const tagBtnHtml = `
    <button type="button" id="${btnId}" class="btn ms-3 ${btnClass} text-start sidebar-btn w-75" value="${btnName}">
        <i class="bi ${btnIconClass}"></i>
        <span class="ps-3">${btnName}</span>
    </button>
    `

    const tagBtn = document.createElement("div");
    tagBtn.innerHTML = tagBtnHtml;

    return tagBtn;
}