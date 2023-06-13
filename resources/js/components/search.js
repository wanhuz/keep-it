import {updateCardContainerBySearch, updateCardContainer} from './card.js'
import { updateSearchTerm } from './container.js';

let typingTimer;
let doneTypingInterval = 1000;
let $textinput = $('#search-input');

export function initSearch() {
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
}


function doneTyping() {
    let searchQuery = $textinput.val();
    updateSearchTerm(null);

    if (searchQuery) {
        updateSearchTerm(searchQuery);
        updateCardContainerBySearch(searchQuery, true);
    }
    else {
        updateCardContainer();
        updateSearchTerm(null);
    }
}