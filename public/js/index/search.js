let typingTimer;
let doneTypingInterval = 1000;
let $textinput = $('#search-input');

$textinput.on('keyup', function() {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(doneTyping, doneTypingInterval);
});

$textinput.on('keydown', function() {
    clearTimeout(typingTimer);
});

//Disable enter key
$textinput.keypress(
    function(event){
      if (event.which == '13') {
        event.preventDefault();
      }
  });

function doneTyping() {
    let searchQuery = $textinput.val();

    if (searchQuery) {
        currentSearchTerm = searchQuery;
        updateCardContainerBySearch(searchQuery, true);
    }
    else {
        updateCardContainer();
        currentSearchTerm = null;
    }
}