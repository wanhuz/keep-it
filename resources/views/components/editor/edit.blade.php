<div class="modal zoom" id="editEditor" tabindex="-1" aria-labelledby="editEditorLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <x-editor.base>
                <x-slot:formId>editorForm</x-slot>
                <x-slot:editorContainerId>editEditorContainerId</x-slot>
                <x-slot:titleId>titleEditor</x-slot>
                <x-slot:contentId>editPostEditor</x-slot>
                <x-slot:bulletListModalBtnId>bulletListModalBtn</x-slot>
                <x-slot:orderedListModalBtnId>orderedListModalBtn</x-slot>
                <x-slot:inputImgId>inputImgEdit</x-slot>
                <x-slot:addImageBtnId>addImgEditBtn</x-slot>
                <x-slot:dropdownTagListId>editorTagList</x-slot>
                <x-slot:tagsContainerId>editorTags</x-slot>
                <x-slot:tagShowBtnId>tagNoteBtn</x-slot>
                <x-slot:dropdownTagListCheckboxId>tagEditorCheckbox</x-slot>
                <x-slot:submitTagBtnId>submitTag</x-slot>
                <x-slot:buttons>
                    <button id="removeBtn" class="btn btn-light btn-outline-secondary border border-0 ms-auto"><i class="bi bi-trash"></i></button> 
                </x-slot>
                <x-slot:saveBtnId>saveBtn</x-slot>
            </x-editor>
        </div>
    </div>
</div>

