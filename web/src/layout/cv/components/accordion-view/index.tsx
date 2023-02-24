import { ButtonIcon, Icon } from '@/components/common'
import { PropsWithChildren } from 'react'

import * as Styles from './styles'
import { AccordionViewProps } from './types'

export function AccordionView (props: PropsWithChildren<AccordionViewProps>) {
  const {
    children,
    title,
  } = props

  return (
    <Styles.Root type="single" collapsible>
      <Styles.Item value="item">
        <Styles.Header>
          <Styles.Trigger>
            {title}
            <Styles.IconView>
              <Icon name="arrowDown" />
            </Styles.IconView>
          </Styles.Trigger>
        </Styles.Header>
        <Styles.Content>
          {children}
        </Styles.Content>
      </Styles.Item>
    </Styles.Root>
  )
}