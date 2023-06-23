
import {initEditor, initClickNote} from './components/editor.js'
import {initCardContainer, initPage} from './components/container.js'
import {initSidebar} from './components/sidebar.js';
import {initSearch} from './components/search.js';
import {initPopover, initPreventDefaultBehavior } from './misc/misc.js';
import {initClickSimpleEditor, initClickCancelEditor, initClickSubmitEditor, initClickUpdateEditorBtn, initHiddenEditor, initClickEditorTagList, initClickRemoveEditorBtn} from './components/editor.js'
import {initBlurEditTagInput, initClickAddTagBtn, initClickCloseTagManager, initClickDeleteTagBtn, initClickEditTagBtn, initClickOpenTagManager} from './components/tag/manager.js';
import { initClickSubmitTag } from './components/tag/editor.js';

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

initEditor();
initPage();





