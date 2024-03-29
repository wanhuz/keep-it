import { Editor } from '@tiptap/core'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import ListItem from '@tiptap/extension-list-item'
import OrderedList from '@tiptap/extension-ordered-list'
import BulletList from '@tiptap/extension-bullet-list'
import Placeholder from '@tiptap/extension-placeholder'
import Link from '@tiptap/extension-link'

const addPostEditor = initEditor('#fullEditorTextArea');
const editPostEditor = initEditor('#editPostEditor')

function initEditor(editorId) {
  return new Editor({
    element: document.querySelector(editorId),
    extensions: [
      Document,
      Paragraph,
      Text,
      Link,
      ListItem,
      OrderedList, 
      BulletList,
      Placeholder.configure({
        placeholder: 'Take a note..'
      })
    ],
    injectCSS: false,
  })
}

export function getEditor() {
  return addPostEditor;
}

export function getEditPostEditor() {
  return editPostEditor;
}




