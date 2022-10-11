

document.getElementById("simpleEditor").addEventListener('click', () => {
    document.getElementById("simpleEditor").classList.add("d-none");
    document.getElementById("fullEditor").classList.remove("d-none");

    document.getElementById("fullEditorTextArea").focus();
});

document.getElementById("fullEditor").addEventListener('focusout', (event) => {

    document.getElementById("fullEditor").classList.add("d-none");
    document.getElementById("simpleEditor").classList.remove("d-none");
})

/*
window.addEventListener("click", (event) => {
    if (event.target.id !== "titleTextArea" || event.target.id !== "noteTextArea" || event.target.id !== "simpleEditor") {
        console.log(event.target.id);
        document.getElementById("simpleEditor").classList.remove("d-none");

        document.getElementById("fullEditor").classList.add("d-none");
    }
} )

*/