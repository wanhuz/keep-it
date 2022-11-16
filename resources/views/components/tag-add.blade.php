<div class="modal zoom" id="tagEditorModal" tabindex="-1" aria-labelledby="tagEditorModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header border-bottom-0 pb-0 mb-0 ">
                <p>Add a new tag</p>
            </div>
            <form id="tagAddForm">
                    @csrf
                    <div class="modal-body">
                        <div class="d-flex flex-row">
                            <button class="btn me-3"><i class="bi bi-tag"></i></button>
                            <input type="text" name="tagName" class="form-control" placeholder="Tag name" aria-label="tagName" aria-describedby="tag-name">
                        </div>
                    </div>

                    <div class="modal-footer bg-light">
                        <button type="submit" class="ms-5 btn btn-primary border border-0" id="addTagBtn">Add Tag</button>
                    </div>
            </form>
        </div>
    </div>
</div>