

<div class="card">
    <form id="{{ $formId }}">
        @csrf
        
        <div class="card-body">
            <input id="{{ $titleId }}" type="text" name="title" class="form-control border border-0 shadow-none" placeholder="Title">
            <div id='{{ $contentId }}' class="pt-4 form-control border border-0 shadow-none"></div>
        </div>

        <div class="card-footer bg-light w-100">
            <button id="{{ $bulletListModalBtnId }}" class='btn btn-light btn-outline-secondary border border-0'><i class='bi bi-list-task'></i></button>
            <button id="{{ $orderedListModalBtnId }}" class='btn btn-light btn-outline-secondary border border-0'><i class='bi bi-123'></i></button>

            <div class="vr"></div>
            <span id="{{ $dropdownTagListId }}" class="dropdown">
                <span id="{{ $tagsContainerId }}"></span>
                <button id="{{ $tagShowBtnId }}" class="btn btn-light btn-outline-secondary border border-0"  role="button" data-bs-toggle="dropdown" aria-expanded="false"><i class='bi bi-tag'></i></button>
                <div class="dropdown-menu">
                    <div id="{{ $dropdownTagListCheckboxId }}"></div>
                    <button id="{{ $submitTagBtnId }}" type="button" class="mt-3 btn colored-btn border border-0 mx-3 d-block">Save</button>
                </div>
            </span>

            <span class="float-end">
                {{ $buttons }}
                <button id="{{ $saveBtnId }}" type="submit" class="btn btn-light border border-0"><i class="bi bi-check-lg"></i></button>
            </span>
        </div>
    </form>
</div>