
import { createEditorImageContainer } from "../ui/editor-img";

export function addImageForPreview(editorImgContainerId, previewImgElement) {
    const MAX_IMG_IN_ONE_CONTAINER = 3;
    const MAX_IMG_CONTAINER_ALLOWED = 3;
    const imgContainer = document.querySelectorAll('.editor-img');

    for (let i = 0; i < MAX_IMG_CONTAINER_ALLOWED; i++) {

        if (imgContainer[i] == null)  {
            const newImgContainer =  createEditorImageContainer(); 

            newImgContainer.children[0].append(previewImgElement);
            document.getElementById(editorImgContainerId).append(newImgContainer);
            break;
        }
        else if (numberOfImgInContainer(imgContainer[i]) > MAX_IMG_IN_ONE_CONTAINER - 1) {
            continue;
        }
        else {
            imgContainer[i].children[0].append(previewImgElement);
            break;
        }
    }
}

export function getAspectRatioFromImg(width, height) {

    // Greatest common divisor
    function gcd(a,b) {
        a = Math.abs(a);
        b = Math.abs(b);
        if (b > a) {var temp = a; a = b; b = temp;}
        while (true) {
            if (b == 0) return a;
            a %= b;
            if (a == 0) return b;
            b %= a;
        }
    }

    const GCD = gcd(width, height);
    return (width / GCD) + '/' + (height / GCD);
}

function numberOfImgInContainer(imgContainer) {
    return imgContainer.children[0].children.length;
}

