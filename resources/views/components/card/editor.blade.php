<div class="modal zoom" id="fullNoteEditor" tabindex="-1" aria-labelledby="fullNoteEditorLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <form id="editorForm">
                @csrf
                <div class="modal-body">
                    <input type="text" name="title" id="titleEditor" class="form-control border border-0 shadow-none" placeholder="Title">
                    <textarea name="body" id="bodyEditor" class="form-control border border-0 shadow-none" placeholder="Take a note.." cols="30" rows="3"></textarea>
                </div>
                
                <div class="dropdown" id="editorTagList">
                    <span id="editorTags" class="ms-3"></span>
                    <button class="btn bg-light-dark rounded-pill text-center pt-0 mx-1 my-1 " id="tagNoteBtn" style="width: fit-content; height: 23px; font-size: 14px;" role="button" data-bs-toggle="dropdown" aria-expanded="false"><p class="mb-5">+</p></button>
                    <div class="dropdown-menu">
                        <div id="tagEditorCheckbox"></div>
                        <button id="submitTag" type="button" class="mt-3 btn btn-primary border border-0 py-1 px-3 ms-auto d-block me-2" >Save</button>
                    </div>
                </div>

                <div class="modal-footer bg-light">
                    <button class="btn btn-light btn-outline-secondary border border-0"><i class="bi bi-list-task"></i></button>
                    <button class="btn btn-light btn-outline-secondary border border-0"><i class="bi bi-image"></i></button> 
                    <button id="removeBtn" class="btn btn-light btn-outline-secondary border border-0 ms-auto"><i class="bi bi-trash"></i></button> 
                    <button type="submit" class="btn btn-light border border-0" id="saveBtn"><i class="bi bi-check-lg"></i></button>
                </div>
            </form>
        </div>
    </div>
</div>