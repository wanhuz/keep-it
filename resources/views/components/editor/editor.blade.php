<div class='card'>
    <form target='dummyframe' id='postform'>
        @csrf
        <div id='fullEditorCard' class='card-body' >
            <input type='text' id='titleTextArea' name='title' class='form-control border border-0 shadow-none' placeholder='Title'>
            <div id='fullEditorTextArea' class="element pt-4 form-control border border-0 shadow-none"></div>
        </div>
        <div class='card-footer d-flex flex-row'>
            <button id="bulletListBtn" class='btn btn-light btn-outline-secondary border border-0'><i class='bi bi-list-task'></i></button>
            <button id="orderedListBtn" class='btn btn-light btn-outline-secondary border border-0'><i class='bi bi-123'></i></button>
            
            <button class='btn btn-light border border-0 ms-auto' id='cancelBtn'><i class='bi bi-x'></i></button>
            <button class='btn btn-light border border-0' id='submitBtn'><i class='bi bi-check-lg'></i></button>
        </div>
    </form>
</div>