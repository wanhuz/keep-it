import { getCardsId } from "./container";
import { createCardImageContainer } from "../../views/card";
import { numberOfImgInContainer, getAspectRatioFromImg } from "../editor/image/container";
import { createPreviewImage } from "../../views/editor-img";

export function updateImage() {
    getImage((imgData) => {
        const notesId = getCardsId();
        
        notesId.forEach(noteId => {
            updateCardWithNewImage(noteId, imgData);
        })
    })
}

function getImage(onSuccess) {
    $.ajax({
        url: "/image/get",
        type: 'GET',
        success: function(imgData) { 
            onSuccess(imgData);
        },
        error: function(error) {
            console.log(error);
        }
    })
}

function updateCardWithNewImage(noteId, imgData) {
    const currentUrl = window.location.href; //Temporary
    let imageFilteredById;

    imageFilteredById = imgData.filter(row => {
        return row.notes_id == noteId;
    });

    imageFilteredById.forEach(image => {
        if (noteDoesNotHaveImageId(noteId, image.id)) {
            setNoteImageId(image.notes_id, image.id);
            addImageToNote(currentUrl + 'storage/' + image.path, image.notes_id);
        }
    })
}

function noteDoesNotHaveImageId(noteId, imgsId) {
    const currentImgsId = getNoteImageId(noteId);

    return !currentImgsId.includes(imgsId);
}

function updateCardWithRemovedImage() {
    // imageFilteredId = imageFilteredById.map((image) => { return image.id; })

    // currentNoteImgId = getNoteImageId(id);

    // currentNoteImgId.forEach(currentImageId => {
    //     if (!imageFilteredId.includes(currentImageId))
    //         console.log('image not found')
    // })
}


function setNoteImageId(noteId, imgId) {
    const noteCardImage = document.querySelector(`[data-id = "${noteId}"] .card-img`);

    if (noteCardImage.dataset.imgId === undefined) {
        noteCardImage.dataset.imgId = imgId;
    }
    else {
        noteCardImage.dataset.imgId = noteCardImage.dataset.imgId + ',' + imgId;
    }
}

function getNoteImageId(noteId) {
    let imageId = document.querySelector(`[data-id = "${noteId}"] .card-img`).dataset.imgId;

    if (imageId === undefined)
        return [-1];

    imageId = imageId.split(',');
    imageId = imageId.map(function(x) {
        return parseInt(x);
    })

    return imageId;
}


function addImageToNote(urlImg, noteId) {
    const img = new Image(); 
    img.src = urlImg;

    img.onload = () => {
        const imgAspectRatio = getAspectRatioFromImg(img.width, img.height);
        const previewImg = createPreviewImage(imgAspectRatio, urlImg);
        appendImageToNote(noteId, previewImg);
        updateImageSize(noteId);
    }
}

function appendImageToNote(noteId, previewImgElement) {
    const MAX_IMG_CONTAINER_ALLOWED = 3;
    const MAX_IMG_IN_ONE_CONTAINER = 3;
    const cardImageContainer = document.querySelectorAll(`.note[data-id = "${noteId}"] .card-img-container`);
    const cardMainImageContainer = document.querySelector(`.note[data-id = "${noteId}"] > .card-img`);

    for (let i = 0; i < MAX_IMG_CONTAINER_ALLOWED; i++) {

        if (cardImageContainer[i] == null)  {
            const newImgContainer =  createCardImageContainer(); 

            newImgContainer.children[0].append(previewImgElement);
            cardMainImageContainer.append(newImgContainer);
            break;
        }
        else if (numberOfImgInContainer(cardImageContainer[i]) > MAX_IMG_IN_ONE_CONTAINER - 1) {
            continue;
        }
        else {
            cardImageContainer[i].children[0].append(previewImgElement);
            break;
        }
    }
}

function updateImageSize(noteId) {
    let currentNoteImgId;
    let previewImgElement;
 
    currentNoteImgId = getNoteImageId(noteId);

    if (currentNoteImgId.length === 1) {
        previewImgElement = getFirstPreviewElement(noteId);
        setPreviewImageSizeRatioToOne(previewImgElement);
    }
}

function getFirstPreviewElement(noteId) {
    return document.querySelector(`.note[data-id = "${noteId}"] .preview-img`);
}

function setPreviewImageSizeRatioToOne(previewImgElement) {
    previewImgElement.classList.add('card-img-ratio-1');
}

export function getAllPreviewElementCopy(noteId) {
    const previewImgElements =  document.querySelectorAll(`.note[data-id = "${noteId}"] .preview-img`);

    let previewImgElementClone = [...previewImgElements].map((previewImgElement) => {
        return previewImgElement.cloneNode(true);
    })

    return [...previewImgElementClone];
}