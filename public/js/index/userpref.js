

  
function rgbToHex(r, g, b) {
    function componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }

    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
  
$("#logoutBtn").on('click', function(e) {
    e.preventDefault();

    document.getElementById('logout-form').submit();
})

$("#userprefBtn").on('click', function(e) {
    e.preventDefault();

    $.ajax({
        type: "GET",
        url: "/get-setting",
        success: function(settings) {
            let rgbColor;
            settings.filter(function(setting) {
                switch (setting.key) {
                    case "app-name":
                        document.getElementById("applicationNameInput").value = setting.value;
                        break;
                    case "card-size-style":
                        document.querySelectorAll("#cardStyleInput option").forEach(option => {option.value == setting.value ? option.selected = true : null})
                        break;
                    case "card-size":
                        document.querySelectorAll("#cardSizeInput option").forEach(option => {option.value == setting.value ? option.selected = true : null})
                        break;
                    case "card-font-size":
                        document.querySelectorAll("#cardFontSizeInput option").forEach(option => {option.value == setting.value ? option.selected = true : null})
                        break;
                    case "head-color":
                        rgbColor = setting.value.split(",");
                        document.querySelector("#headColorInput input").value = rgbToHex(parseInt(rgbColor[0]), parseInt(rgbColor[1]), parseInt(rgbColor[2]));
                        break;
                    case "side-color":
                        rgbColor = setting.value.split(",");
                        document.querySelector("#sideColorInput input").value = rgbToHex(parseInt(rgbColor[0]), parseInt(rgbColor[1]), parseInt(rgbColor[2]));
                        break;
                    case "bg-color":
                        rgbColor = setting.value.split(",");
                        document.querySelector("#bgColorInput input").value = rgbToHex(parseInt(rgbColor[0]), parseInt(rgbColor[1]), parseInt(rgbColor[2]));
                        break;
                    case "header-tpc":
                        document.getElementById("headerTransparentInput").value = setting.value * 100;
                        break;
                    case "sidebar-tpc":
                        document.getElementById("sidebarTransparentInput").value = setting.value * 100;
                        break;
                    case "card-tpc":
                        document.getElementById("cardTransparentInput").value = setting.value * 100;
                        break;
                }
                
            })
        }
    })

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

    $.ajax({
        type: "POST",
        url: "/post-setting",
        data: formData,
        processData: false,
        contentType: false,
        enctype: 'multipart/form-data',
        success: function() {
            location.reload()
        },
        error: function(errorMsg){
            let errorMsgs = errorMsg['responseJSON']['errors'];

            for (let errorMsg in errorMsgs) {
                let errorMsgString = JSON.stringify(errorMsgs[errorMsg]);
                
                switch(errorMsg) {
                    case "bg-img":
                        document.getElementById("bg-img-error-msg").innerHTML = createErrorMessageElement(formatErrorMsg(errorMsg, errorMsgString));
                        break;
                    case "favicon-img":
                        document.getElementById("favicon-error-msg").innerHTML = createErrorMessageElement(formatErrorMsg(errorMsg, errorMsgString));
                        break;
                }
            }
        }
        
    })

})

function formatErrorMsg(errorMsgType, errorMsgString) {
    let maxFileSize;

    switch(errorMsgType) {
        case "bg-img":
            
            maxFileSize = errorMsgString.match(/(\d+)/);
            if (maxFileSize) maxFileSize = maxFileSize[1]/1024;

            errorMsgString = errorMsgString.replace(/(\d+)/, maxFileSize);
            errorMsgString = errorMsgString.replace("kilobytes", "MB");
            errorMsgString = errorMsgString.replace("bg-img", "background image");
            errorMsgString = errorMsgString.replaceAll('\"', "");
            errorMsgString = errorMsgString.replaceAll('[', '');
            errorMsgString = errorMsgString.replaceAll(']', '');
            break;

        case "favicon-img":

            maxFileSize = errorMsgString.match(/(\d+)/);
            if (maxFileSize) maxFileSize = maxFileSize[1]/1024;

            errorMsgString = errorMsgString.replace(/(\d+)/, maxFileSize);
            errorMsgString = errorMsgString.replace("kilobytes", "MB");
            errorMsgString = errorMsgString.replace("favicon-img", "icon");
            errorMsgString = errorMsgString.replaceAll('\"', "");
            errorMsgString = errorMsgString.replaceAll('[', '');
            errorMsgString = errorMsgString.replaceAll(']', '');
            break;
    }

    return errorMsgString;
}

function createErrorMessageElement(message) {
    return `<small class="text-danger">${message}</small>`
}