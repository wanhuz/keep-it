import { getCardsId } from "./container";
import { createCardImageContainer } from "../../views/card";
import { numberOfImgInContainer, getAspectRatioFromImg } from "../editor/image-container";
import { createPreviewImage } from "../../views/editor-img";

export function updateImage() {

    $.ajax({
        url: "/image/get",
        type: 'GET',
        success: function(imgData) {
            const notesId = getCardsId();
            let currentNoteImgId;
            let imageFilteredById;

            const currentUrl = window.location.href; //Temporary
            notesId.forEach(id => {
                imageFilteredById = imgData.filter(row => {
                    return row.notes_id == id;
                });

                imageFilteredById.forEach(image => {
                    currentNoteImgId = getNoteImageId(id);

                    if (!currentNoteImgId.includes(image.id)) {
                        setNoteImageId(image.notes_id, image.id);
                        addImage(currentUrl + 'storage/' + image.path, image.notes_id);
                    }
                })

            })

        }
    })
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


function addImage(urlImg, noteId) {
    const img = new Image(); 
    img.src = urlImg;

    img.onload = () => {
        const imgAspectRatio = getAspectRatioFromImg(img.width, img.height);
        const previewImg = createPreviewImage(imgAspectRatio, urlImg);
        appendImageToCard(noteId, previewImg)
    }
}

function appendImageToCard(noteId, previewImgElement) {
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
