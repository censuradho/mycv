import { styled } from 'stitches.config'

export const Container = styled('div', {
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
  
  variants: {
    fullWidth: {
      true: {
        width: '100%',
      }
    }
  },
  input: {
    borderColor: "transparent",
    borderWidth: "1px",
    width: "100%",
    borderStyle: "solid",
    height: "3rem",
    outline: "none",
    padding: "0 1rem",
    background: '$foreground',

    "&::placeholder": {
      color: "$placeholders",
      fontSize: "0.8rem",
      fontWeight: "400",
    },
    
    "&:focus": {
      borderColor: "$primary",
    },
  
  },
  '.react-datepicker': {
    border: 'none'
  },
  '.react-datepicker__triangle': {
    display: 'none'
  },
  '.react-datepicker-wrapper, .react-datepicker__input-container, .react-datepicker__input-container input': {
    width: '100%'
  },
  '.react-datepicker-year-header': {
    color: 'inherit',
    background: 'none !important',
    border: 'none'
  },

  '.react-datepicker__month-text': {
    display: 'inline-flex !important',
    alignItems: 'center',
    justifyContent: 'center',
    height: '2rem',
  },
  // current day selected
  '.react-datepicker__month-text--keyboard-selected': {
    background: '$primary',
    color: '$ancesst8',
    '&:hover': {
      color: '$heading'
    }
  }
})

export const Label = styled("label", {
  cursor: "pointer",
  fontSize: "$xsm",
  color: '$heading',
  fontWeight: 500
});

export const ErrorMessage = styled('span', {
  color: "$error",
  fontSize: '$xsm'
});


