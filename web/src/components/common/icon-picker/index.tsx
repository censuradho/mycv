import * as Styles from './styles'
import { IconPickerProps } from './types'

import { icons } from '@/components/common/icon/icons'
import { Icon } from '@/components/common/'
import { useState } from 'react'

export function IconPicker (props: IconPickerProps) {
  const {
    label,
    value
  } = props

  const [selectedIcon, setSelectedIcon] = useState(value)

  const renderIcons = Object
    .entries(icons)
    .map(([key]) => {
      const isActive = key === selectedIcon

      return (
        <li key={key}>
          <Styles.Button 
            type="button"
            onClick={() => setSelectedIcon(key)}
            active={isActive}
          >
            <Icon name={key as any} color={isActive ? 'primary' : 'heading'} />
          </Styles.Button>
        </li>
      )
    })
  return (
    <Styles.Container>
      <Styles.Label>{label}</Styles.Label>
      <Styles.List>
        {renderIcons}
      </Styles.List>
    </Styles.Container>
  )
}