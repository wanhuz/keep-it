
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
    formData.delete('favicon-img');
    formData.append("favicon-img", $("input[name='favicon-img']")[0].files[0]);
    
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
            console.log("fail with");
            console.log(something);
        }
    })

})