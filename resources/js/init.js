
import initEditor from './wysiwyg/tiptap.js'
import {initCardContainer, updatePage} from './components/container.js'
import {initClickNote} from './components/card.js'
import { initSidebar } from './components/sidebar.js';
import { initSearch } from './components/search.js';
import { initPopover, initPreventDefaultBehavior } from './misc/misc.js';
import {initClickSimpleEditor, initClickCancelEditor, initClickSubmitEditor, initClickUpdateEditorBtn, initHiddenEditor, initClickEditorTagList, initClickRemoveEditorBtn} from './components/editor.js'
import { initBlurEditTagInput, initClickAddTagBtn, initClickCloseTagManager, initClickDeleteTagBtn, initClickEditTagBtn, initClickOpenTagManager, initClickSubmitTag } from './components/tag.js';

const editor = initEditor();

$('#bulletBtn').on('click', function() {
    editor.commands.toggleBulletList();
})

initPreventDefaultBehavior();
initPopover();

initClickNote();
initCardContainer();
initSidebar();
initSearch();

initBlurEditTagInput();
initClickAddTagBtn();
initClickOpenTagManager();
initClickCloseTagManager();
initClickDeleteTagBtn();
initClickEditTagBtn();
initClickDeleteTagBtn();
initClickSubmitTag();


initClickSimpleEditor();
initClickCancelEditor();
initClickSubmitEditor();
initClickUpdateEditorBtn();
initClickRemoveEditorBtn();
initClickEditorTagList();
initHiddenEditor();

window.setInterval(updatePage, 5000);
updatePage();



