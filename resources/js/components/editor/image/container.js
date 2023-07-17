export function getAspectRatioFromImg(width, height) {
    return width + '/' + height;
}

export function numberOfImgInContainer(imgContainer) {
    return imgContainer.children[0].children.length;
}

export function clearImageContainer(containerId) {
    document.getElementById(containerId).innerHTML = '';
}

export function initEditorImageContainerInput(inputId, imgContainerId) {
    $(inputId).change(() => {
        let imageList = getImageList();
        const files = document.querySelector(inputId).files; 
 
        for (let i = 0; i < files.length; i++) { 
            let file = files[i];
            const urlImg = URL.createObjectURL(file);
            const img = new Image(); 
    
            img.src = urlImg;
            imageList.push(file);
    
            img.onload = () => {
                const imgAspectRatio = getAspectRatioFromImg(img.width, img.height);
                const previewImg = createPreviewImage(imgAspectRatio, urlImg);
                addImageForPreview(imgContainerId, previewImg)
            }
        }
    });
}
