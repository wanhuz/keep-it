<div class="modal zoom" id="fullNoteEditor" tabindex="-1" aria-labelledby="fullNoteEditorLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-body">
                    <input type="text" name="title" id="titleEditor" class="form-control border border-0 shadow-none" placeholder="Title">
                    <textarea name="body" id="body"id="bodyEditor" class="form-control border border-0 shadow-none" placeholder="Take a note.." cols="30" rows="3"></textarea>
                </div>
       
                <div class="modal-footer bg-light">
                    <button class="btn btn-light btn-outline-secondary border border-0"><i class="bi bi-list-task"></i></button>
                    <button class="btn btn-light btn-outline-secondary border border-0"><i class="bi bi-image"></i></button> 
                    <button class="btn btn-light btn-outline-secondary border border-0"><i class="bi bi-trash"></i></button> 
                    <button class="btn btn-light border border-0 ms-auto" id="cancelEditorBtn"><i class="bi bi-x"></i></button>
                    <button type="submit" class="btn btn-light border border-0" id="closeEditorBtn"><i class="bi bi-check-lg"></i></button>
                </div>
        </div>
    </div>
</div>