<div class="modal zoom" id="fullNoteEditor" tabindex="-1" aria-labelledby="fullNoteEditorLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <x-editor.base>
                <x-slot:formId>editorForm</x-slot>
                <x-slot:titleId>titleEditor</x-slot>
                <x-slot:contentId>editPostEditor</x-slot>
                <x-slot:bulletListModalBtnId>bulletListModalBtn</x-slot>
                <x-slot:orderedListModalBtnId>orderedListModalBtn</x-slot>
                <x-slot:dropdownTagListId>editorTagList</x-slot>
                <x-slot:tagsContainerId>editorTags</x-slot>
                <x-slot:tagShowBtnId>tagNoteBtn</x-slot>
                <x-slot:dropdownTagListId>tagEditorCheckbox</x-slot>
                <x-slot:submitTagBtnId>submitTag</x-slot>
                <x-slot:buttons>
                    <button id="removeBtn" class="btn btn-light btn-outline-secondary border border-0 ms-auto"><i class="bi bi-trash"></i></button> 
                </x-slot>
                <x-slot:saveBtnId>saveBtn</x-slot>
            </x-editor>
        </div>
    </div>
</div>

