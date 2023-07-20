import {initEditEditor, initClickNote} from './components/editor/edit.js' 
import {initCardContainer, initPage} from './components/card/container.js'
import {initSidebar} from './components/sidebar/sidebar.js';
import {initSearch} from './components/search/search.js';
import {initPopover, initPreventDefaultBehavior, initSetupAjax } from './misc/misc.js';
import {initClickUpdateEditorBtn, initHiddenEditor, initClickEditorTagList, initClickRemoveEditorBtn} from './components/editor/edit.js'
import {initBlurEditTagInput, initClickAddTagBtn, initClickCloseTagManager, initClickDeleteTagBtn, initClickEditTagBtn, initClickOpenTagManager} from './components/tag/manager.js';
import { initClickSubmitTag } from './components/editor/tag.js';
import { initClickSimpleEditor, initClickCancelEditor, initClickSubmitEditor, initOnClickAddEditorTagList } from './components/editor/add.js';
import { initAddEditor } from './components/editor/add.js';

initPreventDefaultBehavior();
initPopover();
initSetupAjax();

// Initialize component logic
initClickNote();
initCardContainer();
initSidebar();
initSearch();

// Initialize tagging logic
initBlurEditTagInput();
initClickAddTagBtn();
initClickDeleteTagBtn();
initClickEditTagBtn();
initClickDeleteTagBtn();
initClickSubmitTag();

// Initialize tag manager
initClickOpenTagManager();
initClickCloseTagManager();

// Initialize text editor logic
initClickSimpleEditor();
initClickCancelEditor();
initClickSubmitEditor();
initClickUpdateEditorBtn();
initClickRemoveEditorBtn();
initClickEditorTagList();
initHiddenEditor();
initOnClickAddEditorTagList();
initEditEditor();
initAddEditor();

initPage();





