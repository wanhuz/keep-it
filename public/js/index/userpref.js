
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
    document.querySelectorAll(`${activeTabId} form input`).forEach(input => formInputName.push(input.getAttribute('name')));

    formInputName.forEach(inputName => {
        switch(inputName) {
            case "favicon-img":
                formData.delete('favicon-img');
                formData.append("favicon-img", $("input[name='favicon-img']")[0].files[0]);
                break;
            case "bg-img":
                formData.delete('bg-img');
                formData.append("bg-img", $("input[name='bg-img']")[0].files[0]);
                break;
        }
    })
    
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
        error: function(something){
            // switch(inputName) {
            //     case "favicon-img":
            //         formData.delete('favicon-img');
            //         formData.append("favicon-img", $("input[name='favicon-img']")[0].files[0]);
            //         break;
                // case "bg-img":
                    // document.getElementById("error-bg-img").classList.remove("d-none");
                    // break;
            // }
        }
    })

})