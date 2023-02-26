import { styled } from 'stitches.config'

export const Container = styled('div', {
  width: '100%',

  '@laptops-min': {
    display: 'flex'
  }
})

export const CurriculumView = styled('section', {
  
  '@laptops-min': {
    flex: 1,
    background: '$foreground',
    height: '100vh',
    position: 'sticky',
    top: 0,
  }
})