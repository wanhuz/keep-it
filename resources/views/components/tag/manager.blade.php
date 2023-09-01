<div class="modal zoom" id="tagManagerModal" tabindex="-1" aria-labelledby="tagAddModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">

            <div class="modal-header pb-0 ms-3 ">
                <p>Manage tag</p>
            </div>


            <div class="modal-body">
                <div class="" id="newTag">
                    <div class="mb-3 gap-2 align-items-center w-100" id="currentTag">
                        <form id="tagEditForm">
                            @csrf
                            <ul class="list-group border" id="currentTagList">
                            </ul>
                        </form>
                    </div>

                    <form id="tagAddForm">
                        @csrf
                        <div class="input-group mb-1 gap-2 align-items-center">
                            <input type="text" name="tagName" class="form-control" placeholder="Add new tag" aria-label="Add new tag" aria-describedby="add-tag">
                            <button type="submit" class="btn btn-primary colored-btn border border-0" type="button" id="addTagBtn">Add Tag</button>
                        </div>
                    </form>
                </div>
            </div>

            <div class="modal-footer">
                <button id="closeManageTagBtn" class="btn btn-outline-primary border border-0 ms-auto">Close</button>
            </div>
        </div>
    </div>
</div>