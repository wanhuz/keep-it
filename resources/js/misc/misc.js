
export function initPreventDefaultBehavior() {
    $("#tagNoteBtn").on('click', function(e) { e.preventDefault();})
    $(".dropdown-menu").on('click', function (e) { e.stopPropagation(); })
    $('#cancelBtn').on('click', function(e) { e.preventDefault();})
}

export function initPopover() {
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
    const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))
}