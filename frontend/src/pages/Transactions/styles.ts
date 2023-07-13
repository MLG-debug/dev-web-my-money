import styled from 'styled-components'

export const TransactionsContainer = styled.main`
  width: 100%;
  max-width: 1120px;
  margin: 4rem auto 0;
  padding: 0 1.5rem;
`

export const TransactionsTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.5rem;
  margin-top: 1.5rem;

  td {
    padding: 1.25rem 2rem;
    background: ${(props) => props.theme['gray-700']};

    &:first-child {
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
    }

    &:last-child {
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
    }
  }
`

interface PriceHighlightProps {
  variant: 'INCOME' | 'OUTCOME'
}

export const PriceHighlight = styled.span<PriceHighlightProps>`
  color: ${(props) =>
    props.variant === 'INCOME'
      ? props.theme['blue-300']
      : props.theme['red-300']};
`

export const DeleteButton = styled.button`
  cursor: pointer;
  background: transparent;
  border: 0;
  outline: none;
  color: ${(props) => props.theme['red-300']};
  transition: 100ms ease-in-out;

  &:hover {
    color: ${(props) => props.theme['red-500']};
  }
`

export const LoadMoreContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
  margin-bottom: 7.5rem;
`

export const PaginationButton = styled.button<{ $active?: boolean }>`
  display: flex;
  justify-content: center;
  /* padding: 0.5rem; */
  border-radius: 50%;
  margin: 0.25rem;

  width: 2rem;
  height: 2rem;

  cursor: pointer;
  background: ${({ theme, $active }) =>
    $active ? theme['blue-500'] : theme['gray-600']};
  border: 0;
  outline: none;
  color: ${({ theme, $active }) => ($active ? 'white' : theme['gray-300'])};
  transition: 100ms ease-in-out;
  display: flex;
  flex-direction: column;
  align-items: center;

  /* &:not(:disabled):hover {
      color: ${(props) => props.theme['blue-500']};
    } */
  &:disabled {
    cursor: not-allowed;
  }
`
