import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { forwardRef, memo } from 'react'

import { ToolBar } from './components'

import { EditorProps } from './types'
import * as Styles from './styles'
import { Box } from '../box'

export const Editor = memo(forwardRef<any, EditorProps>((props) => {
  const { 
    onChange, 
    value,
    onBlur,
    onFocus,
    errorMessage,
    label,
    id
  } = props

  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: value || undefined,
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
      <Styles.Label htmlFor={id}>{label}</Styles.Label>
      <Styles.Content>
        <ToolBar editor={editor} />
        <Styles.Editor id={id} editor={editor} />
      </Styles.Content>
      <Styles.ErrorMessage>{errorMessage}</Styles.ErrorMessage>
    </Styles.Container>
  )
}))