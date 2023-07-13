import styled from 'styled-components'

export const SearchFormContainer = styled.form`
  display: flex;
  gap: 1rem;

  input {
    flex: 1;
    border-radius: 6px;
    border: 0;
    background-color: ${(props) => props.theme['gray-900']};
    color: ${(props) => props.theme['gray-300']};
    padding: 1rem;

    &::placeholder {
      color: ${(props) => props.theme['gray-500']};
    }
  }

  button {
    display: flex;
    align-items: center;
    gap: 0.75rem;

    padding: 1rem;
    background-color: transparent;
    border: 1px solid ${(props) => props.theme['blue-300']};
    color: ${(props) => props.theme['blue-300']};
    font-weight: bold;
    border-radius: 6px;
    cursor: pointer;

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    &:not(:disabled):hover {
      background-color: ${(props) => props.theme['blue-500']};
      border: 1px solid ${(props) => props.theme['blue-500']};
      color: ${(props) => props.theme.white};
      transition: background-color 0.2s, color 0.2s, border-color 0.2s;
    }
  }
`

// export const NewTransactionButton = styled.button`
//   height: 50px;
//   border: 0;
//   background-color: ${(props) => props.theme['blue-500']};
//   color: ${(props) => props.theme.white};

//   font-weight: bold;
//   padding: 0 1.25rem;
//   border-radius: 6px;
//   cursor: pointer;

//   &:hover {
//     background-color: ${(props) => props.theme['blue-700']};
//     transition: background-color 0.2s;
//   }
// `
