import { Container } from '@/components/common'
import { CurriculumPreview } from '@/components/common/curriculum-preview'
import * as Styles from './styles'
import { CvPerfilProps } from './types'

export function CvPerfilLayout (props: CvPerfilProps) {
  const { data } = props

  return (
    <Container>
      <Styles.Container>
        <CurriculumPreview />
      </Styles.Container>
    </Container>
  )
}