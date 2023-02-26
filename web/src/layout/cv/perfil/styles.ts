import { styled } from 'stitches.config'

export const Container = styled('div', {
  '*': {
    fontWeight: 500
  }
})

export const List = styled('ul', {
  listStyleType: 'none'
})

export const SectionTitle = styled('h2', {
  fontSize: '$md',
  color: '$primary',
  fontWeight: 600
})