import { Icon } from '../icon'
import * as Styles from './styles'
import { SelectProps } from './types'

export function Select (props: SelectProps) {
  const { 
    options, 
    label, 
    placeholder,
    fullWidth,
    errorMessage,
    ...otherProps
  } = props

  const renderOptions = options.map((option, index) => (
    <Styles.Item value={String(option.value)} key={index}>
      <Styles.ItemText>{option.label}</Styles.ItemText>
    </Styles.Item>
  ))

  return (
    <Styles.Container fullWidth={fullWidth}>
      <Styles.Label>{label}</Styles.Label>
      <Styles.Root {...otherProps}>
        <Styles.Trigger >
          <Styles.Value placeholder={placeholder} />
          <Icon name="arrowDown" />
        </Styles.Trigger>
        <Styles.Portal>
          <Styles.Content>
            <Styles.ScrollUpButton></Styles.ScrollUpButton>
            <Styles.Viewport>
              {renderOptions}
            </Styles.Viewport>
            <Styles.ScrollDownButton></Styles.ScrollDownButton>
          </Styles.Content>
        </Styles.Portal>
      </Styles.Root>
      <Styles.ErrorMessage>{errorMessage}</Styles.ErrorMessage>
    </Styles.Container>
  )
}