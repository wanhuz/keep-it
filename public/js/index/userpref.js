
$("#userprefBtn").on('click', function(e) {
    e.preventDefault();

    $('#userPreferenceModal').modal('show');
})



$("#cancelUserConfBtn").on('click', function(e) {
    e.preventDefault();

    $('#userPreferenceModal').modal('hide');
})

$("#applyUserConfBtn").on('click', function(e) {
    e.preventDefault();


})

$("#saveUserConfBtn").on('click', function(e) {
    e.preventDefault();

    let activeTabId = $("#v-pills-tab .active").attr('data-bs-target');
    let formActiveTabId = $(`${activeTabId} form`).attr('id');

    let formData = new FormData(document.getElementById(formActiveTabId));
    let formInputName = [];
    let file;

    document.querySelectorAll(`${activeTabId} form input`).forEach(input => 
        formInputName.push(input.getAttribute('name'))
    );

    formInputName.forEach(inputName => {
        switch(inputName) {
            case "favicon-img":
                formData.delete('favicon-img');
                file =  $("input[name='favicon-img']")[0].files[0];
                if (file !== undefined)
                    formData.append("favicon-img", file);
                break;
            case "bg-img":
                formData.delete('bg-img');
                file =  $("input[name='bg-img']")[0].files[0];
                if (file !== undefined)
                    formData.append("bg-img", file);
                break;
        }
    })

    console.log(...formData);
    return;
    
    $.ajax({
        type: "POST",
        url: "/post-setting",
        data: formData,
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        success: function() {
            console.log("yep");
            // updatePage();
            // $('#fullNoteEditor').modal('hide');
        },
        error: function(errorMsg){
            let errorMsgs = errorMsg['responseJSON']['errors'];

            for (let errorMsg in errorMsgs) {
                let errorMsgString;
                let maxFileSize;
                

                switch(errorMsg) {
                    case "bg-img":
                        
                        errorMsgString = JSON.stringify(errorMsgs[errorMsg])
                        maxFileSize = errorMsgString.match(/(\d+)/);
                        if (maxFileSize) maxFileSize = maxFileSize[1]/1024;

                        errorMsgString = errorMsgString.replace(/(\d+)/, maxFileSize);
                        errorMsgString = errorMsgString.replace("kilobytes", "MB");
                        errorMsgString = errorMsgString.replace("bg-img", "background image");
                        errorMsgString = errorMsgString.replaceAll('\"', "");
                        errorMsgString = errorMsgString.replaceAll('[', '');
                        errorMsgString = errorMsgString.replaceAll(']', '');

                        document.getElementById("bg-img-error-msg").innerHTML = createErrorMessageElement(errorMsgString);
                        break;
                    case "favicon-img":
                        errorMsgString = JSON.stringify(errorMsgs[errorMsg])

                        maxFileSize = errorMsgString.match(/(\d+)/);
                        if (maxFileSize) maxFileSize = maxFileSize[1]/1024;

                        errorMsgString = errorMsgString.replace(/(\d+)/, maxFileSize);
                        errorMsgString = errorMsgString.replace("kilobytes", "MB");
                        errorMsgString = errorMsgString.replace("favicon-img", "icon");
                        errorMsgString = errorMsgString.replaceAll('\"', "");
                        errorMsgString = errorMsgString.replaceAll('[', '');
                        errorMsgString = errorMsgString.replaceAll(']', '');

                        document.getElementById("favicon-error-msg").innerHTML = createErrorMessageElement(errorMsgString);
                        break;
                }
            }
        }
    })

})

function createErrorMessageElement(message) {
    return `<small class="text-danger">${message}</small>`
}