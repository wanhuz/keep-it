<div class="modal zoom" id="fullNoteEditor" tabindex="-1" aria-labelledby="fullNoteEditorLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <form id="editorForm">
                @csrf
                <div class="modal-body">
                    <input type="text" name="title" id="titleEditor" class="form-control border border-0 shadow-none" placeholder="Title">
                    <div id='editPostEditor' class="modal-editor pt-4 form-control border border-0 shadow-none"></div>
                </div>

                <div class="modal-footer bg-light">
                    <button id="bulletListModalBtn" class='btn btn-light btn-outline-secondary border border-0'><i class='bi bi-list-task'></i></button>
                    <button id="orderedListModalBtn" class='btn btn-light btn-outline-secondary border border-0'><i class='bi bi-123'></i></button>

                    <div class="vr"></div>
                    <div class="dropdown" id="editorTagList">
                        <span id="editorTags"></span>
                        <button class="btn btn-light btn-outline-secondary border border-0" id="tagNoteBtn"  role="button" data-bs-toggle="dropdown" aria-expanded="false"><i class='bi bi-tag'></i></button>
                        <div class="dropdown-menu">
                            <div id="tagEditorCheckbox"></div>
                            <button id="submitTag" type="button" class="mt-3 btn btn-primary border border-0 py-1 px-3 ms-auto d-block me-2">Save</button>
                        </div>
                    </div>

                    <button id="removeBtn" class="btn btn-light btn-outline-secondary border border-0 ms-auto"><i class="bi bi-trash"></i></button> 
                    <button type="submit" class="btn btn-light border border-0" id="saveBtn"><i class="bi bi-check-lg"></i></button>
                </div>
            </form>
        </div>
    </div>
</div>


