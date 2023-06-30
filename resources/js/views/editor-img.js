export function createEditorImageContainer() {
    const editorImageContainerHTML = `
        <span class='editor-img'>
            <ul>
            </ul>
        </span>
    `
    const editorImageTemp = document.createElement('span');
    editorImageTemp.innerHTML = editorImageContainerHTML;

    return editorImageTemp.children[0];
}

export function createPreviewImage(imgRatio, urlImg) {
    const editorImgHTML = `
    <li style="--r: ${imgRatio}" class='preview-img'>
        <img src="${urlImg}"/>
    </li>
    `

    const editorImgSpan = document.createElement('span');
    editorImgSpan.innerHTML = editorImgHTML;

    return editorImgSpan.children[0];
}