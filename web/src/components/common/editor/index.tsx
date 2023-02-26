import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { forwardRef, memo } from 'react'

import { ToolBar } from './components'

import { EditorProps } from './types'
import * as Styles from './styles'

export const Editor = memo(forwardRef<any, EditorProps>((props) => {
  const { 
    onChange, 
    value,
    onBlur,
    onFocus,
    errorMessage
  } = props

  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: value,
    onUpdate({ editor }) {
      onChange?.(editor.getHTML())
    },
    onFocus({ event }) {
      onFocus?.(event)
    },
    onBlur({ event }) {
      onBlur?.(event)
    }
  })

  return (
    <Styles.Container>
      <ToolBar editor={editor} />
      <Styles.Editor editor={editor} />
      <Styles.ErrorMessage>{errorMessage}</Styles.ErrorMessage>
    </Styles.Container>
  )
}))