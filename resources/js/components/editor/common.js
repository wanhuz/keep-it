export function initEditorButtons(editorWYSIWYG, bulletListBtnId, orderedListBtnId) {
    $(`#${bulletListBtnId}`).on('click', (e) => {
        e.preventDefault();
        editorWYSIWYG.commands.toggleBulletList();
    });

    $(`#${orderedListBtnId}`).on('click', (e) => {
        e.preventDefault();
        editorWYSIWYG.commands.toggleOrderedList();
    });
}

export function initOnClickEditorAddImageButton(btnId, inputId) {
    $(`#${btnId}`).on('click', (e) => {
        e.preventDefault();
        $(`#${inputId}`).click();
    })
}


