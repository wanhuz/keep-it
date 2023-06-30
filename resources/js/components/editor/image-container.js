let imageList = []

export function numberOfImgInContainer(imgContainer) {
    return imgContainer.children[0].children.length;
}

export function clearImageContainer(containerId) {
    document.getElementById(containerId).innerHTML = '';
}

export function getImageList() {
    return imageList;
}

export function clearImageList() {
    imageList = [];
}

export function getAspectRatioFromImg(width, height) {
    return width + '/' + height;
}