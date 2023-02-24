import * as Styles from './styles'
import { AutoCompleteProps } from './types'

import RootAutocomplete from 'react-autocomplete'

export function AutoComplete (props: AutoCompleteProps) {
  const { 
    label,
    errorMessage,
    fullWidth,
    id
  } = props

  return (
    <Styles.Container>
      <Styles.Label>{label}</Styles.Label>
      <RootAutocomplete
        getItemValue={(item) => item.label}
        items={[
          { label: 'apple' },
          { label: 'banana' },
          { label: 'pear' }
        ]}
        renderItem={(item, isHighlighted) =>
          <Styles.Item active={isHighlighted}>
            {item.label}
          </Styles.Item>
        }
        value={''}
        onChange={(e) => {}}
        onSelect={(val) => {}}
      />
      <Styles.ErrorMessage>{errorMessage}</Styles.ErrorMessage>
    </Styles.Container>
  )
}