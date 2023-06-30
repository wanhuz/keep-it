
import { createEditorImageContainer } from "../../views/editor-img";
import {numberOfImgInContainer, clearImageList} from './image-container';

const MAX_IMG_IN_ONE_CONTAINER = 3;
const MAX_IMG_CONTAINER_ALLOWED = 3;

export function addImageForPreview(editorImgContainerId, previewImgElement) {
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

export function submitImages(noteId, imageFileList) {
    let formData = new FormData();
    formData.append('note_id', noteId);

    imageFileList.forEach(function(image, i) {
        formData.append('image_' + i, image);
    });

    $.ajax({
        url: "/image/post",
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,
        cache: false,
        success: () => {
            clearImageList();
        }
    })
}