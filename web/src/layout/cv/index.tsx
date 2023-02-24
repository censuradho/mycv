import { Form } from './components'
import * as Styles from './styles'
import { CvPageProps } from './types'

export function CvLayout (props: CvPageProps) {
  return (
    <Styles.Container>
      <Form />
    </Styles.Container>
  )
}