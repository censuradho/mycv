import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';

import 'react-markdown-editor-lite/lib/index.css';
import { MarkDownEditorProps } from './types';

import * as Styles from './styles'

const mdParser = new MarkdownIt(/* Markdown-it options */);

export function MarkdownEditor (props: MarkDownEditorProps) {
  const {
    onChange
  } = props

  return (
    <Styles.Container>
      <MdEditor 
        style={{ height: '300px' }} 
        renderHTML={text => mdParser.render(text)} 
        onChange={onChange}
        view={{
          html: false,
          menu: true,
          md: true
        }}
      />
    </Styles.Container>
  )
}