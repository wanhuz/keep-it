import {updateCardContainerBySearch, updateCardContainer, clearCardContainer} from '../card/card.js'
import { updateSearchTerm } from '../card/container.js';

let typingTimer;
let doneTypingInterval = 500;
let $textinput = $('#search-input');

export function initSearch() {
    $textinput.on('keyup', () => {
        clearTimeout(typingTimer);
        typingTimer = setTimeout(doneTyping, doneTypingInterval);
    });
    
    $textinput.on('keydown', () => clearTimeout(typingTimer));
    
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
        clearCardContainer();
        updateCardContainer();
        updateSearchTerm(null);
    }
}