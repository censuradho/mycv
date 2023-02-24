import { Box } from '../box'
import * as Styles from './styles'
import { SwitchProps } from './types'

export function Switch (props: SwitchProps) {
  const {
    errorMessage,
    label,
    id
  } = props

  return (
    <Styles.Container>
      <Box gap={0.5} alignItems="center">
        <Styles.Root id={id}>
          <Styles.Thumb />
        </Styles.Root>
        <Styles.Label htmlFor={id}>{label}</Styles.Label>
      </Box>
      <Styles.ErrorMessage>{errorMessage}</Styles.ErrorMessage>
    </Styles.Container>
  )
}