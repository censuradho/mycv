import { styled } from 'stitches.config'

export const Container = styled('main', {})

export const Form = styled('form', {
  width: '100%',
  padding: '2rem',
  display: 'flex',
  alignItems: 'center',
  minHeight: '60vh',
  gap: '1rem',
  flexDirection: 'column'
})

export const InfoView = styled('div', {
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '2rem',
})

export const Figure = styled('figure', {
  width: '300px',
  height: '400px',
  position: 'relative',
  boxShadow: '-12px 14px 43px 0px #00000008',

  img: {
    objectFit: 'contain'
  },
})