import { Editor } from '@tiptap/core'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Image from '@tiptap/extension-image'
import ListItem from '@tiptap/extension-list-item'
import OrderedList from '@tiptap/extension-ordered-list'
import BulletList from '@tiptap/extension-bullet-list'
import Placeholder from '@tiptap/extension-placeholder'
import Link from '@tiptap/extension-link'


export default function initEditor() {
  return new Editor({
    element: document.querySelector('.element'),
    extensions: [
      Document,
      Paragraph.configure({
        HTMLAttributes: {
          style: 'margin-top: -1em;'
        }
      }),
      Text,
      Image,
      Link,
      ListItem,
      OrderedList,
      BulletList.configure({
        HTMLAttributes: {
          style: 'padding-left: 1.2em;'
        }
      }),
      Placeholder.configure({
        placeholder: 'Take a note..'
      })
    ],
    injectCSS: false,
  })
}





