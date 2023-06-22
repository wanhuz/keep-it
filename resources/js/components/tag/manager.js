import { updateTag } from "./card";
import { refreshSidebar } from "../sidebar";
import { createTagListModal } from "../../ui/tag";

function updateManageTagModal() {
    $.ajax({
        url: "/load-tag",
        type: 'GET',
        success: function(data) {
            let allTag = data;

            let currentTagListContainer = document.getElementById("currentTagList");
            currentTagListContainer.innerHTML = "";

            allTag.forEach(tag => {
                currentTagListContainer.append(createTagListModal(tag.name, tag.id));
            });
        }
    })
}

export function initKeypressEditTagBtn() {
    $('body').on('keypress', '.edittag-input', function(e) {
        if (e.which == '13') {
            e.preventDefault();
            e.currentTarget.blur();
        }
    })
}

export function initClickAddTagBtn() {
    $(document).on('click', '#addTagBtn', function(e) {
        e.preventDefault();
    
        let formData = $("#tagAddForm").serializeArray();
        let formToken = formData.find(data => data.name == "_token").value;
        let newTagName = formData.find(data => data.name == "tagName").value;
    
        $.ajax({
            type: "POST",
            url: "/post-tag",
            data: {
                "_token" : formToken,
                'name' : newTagName
            },
            success: function() {
                $("#tagAddForm")[0].reset();
                refreshSidebar();
                updateManageTagModal();
                updateTag();
            }
        })
    })
}

export function initClickOpenTagManager() {
    $("#manageTagBtn").on('click', function(e) {
        e.preventDefault();
    
        updateManageTagModal();
        $('#tagManagerModal').modal('show');
    })
}

export function initClickCloseTagManager() {
    $('#closeManageTagBtn').on('click', function(e) {
        e.preventDefault();
        $('#tagManagerModal').modal('hide');
    })
}

export function initClickEditTagBtn() {
    $('body').on('click', '.edittag-btn', function(e) {
        e.preventDefault();
    
        let tagName =  e.currentTarget.parentNode.parentNode.getAttribute("data-name");
        let tagInput = document.getElementById(tagName + "TagInput");
        
        tagInput.readOnly = false;
        tagInput.focus();
    });
}


export function initBlurEditTagInput() {
    $('body').on('blur', '.edittag-input', function(e) {
        e.preventDefault();
    
        let formData = $("#tagEditForm").serializeArray();
        let formToken = formData.find(data => data.name == "_token").value;
        let tagId = e.currentTarget.parentNode.getAttribute("data-id");
        let currentTagName = e.currentTarget.parentNode.getAttribute("data-name");
        let newTagName = document.getElementById(currentTagName + "TagInput").value;
        
        if (!newTagName || newTagName == currentTagName) return;
    
        $.ajax({
            url: '/update-tag',
            type: 'POST',
            data: {
                '_token' : formToken,
                'id' : tagId,
                'name' : newTagName,
            },
            success: function() {
                refreshSidebar();
                updateManageTagModal();
                updateTag();
            }
        })
    })
}


export function initClickDeleteTagBtn() {
    $('body').on('click', '.deletetag-btn', function(e) {
        e.preventDefault();
    
        let formData = $("#tagEditForm").serializeArray();
        let formToken = formData.find(data => data.name == "_token").value;
        let tagId = e.currentTarget.parentNode.parentNode.getAttribute("data-id");
    
        $.ajax({
            url: '/delete-tag',
            type: 'POST',
            data: {
                '_token' : formToken,
                'id' : tagId
            },
            success: function() {
                refreshSidebar();
                updateManageTagModal();
                updateTag();
            }
        })
    });
}