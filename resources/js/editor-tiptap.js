import { Editor } from '@tiptap/core'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Image from '@tiptap/extension-image'

export default function initEditor() {
  return new Editor({
    element: document.querySelector('.element'),
    extensions: [
      Document,
      Paragraph,
      Text,
      Image,
    ],
    injectCSS: false,
  })
}





