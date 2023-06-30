import { refreshCardContainerLayout } from "./card";
import { createTag } from "../../views/tag";

export function updateTag() {
    $.ajax({
        url: "/load-note-tag",
        type: 'GET',
        success: function(noteTags) {
            updateTagInCard(noteTags);
            refreshCardContainerLayout();
        }
    })
}

function updateTagInCard(noteTags) {
    let noteId = [];
    let allNoteId = Array();

    document.querySelectorAll(".note").forEach(note => {
        allNoteId.push(note.dataset.id);
    });

    noteTags.forEach(noteTag => { (!(noteId.includes(noteTag.notes_id))) ? noteId.push(noteTag.notes_id) : false}); // Get unique id
    
    allNoteId.forEach(id => {
        let cardById = document.querySelector(`.card.note[data-id="${id}"]`);
        let cardTags = Array();
        let noteTagContainer = document.querySelector(`[data-id = "${id}"] .card-tags`);
        let noteTagById = noteTags.filter(note => note.notes_id == id);
        
        if (noteTagContainer === null)
            return;

        noteTagContainer.innerHTML = ""

        if (noteTagById.length < 1) {
            cardById.removeAttribute("data-tags");
            return;
        }

        noteTagById.forEach(tag => {
            noteTagContainer.append(createTag(tag.name));
            cardTags.push(tag.name);
        })

        cardById.setAttribute("data-tags", cardTags);
    })
}