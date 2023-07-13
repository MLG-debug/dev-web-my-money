import styled from 'styled-components'
export const HeaderContainer = styled.header`
  background-color: ${(props) => props.theme['gray-900']};
  padding: 0rem 0 0rem;
`

export const HeaderContent = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 1.5rem;

  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`

export const HeaderImageContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 2rem 0 2rem;
`

export const HeaderButtonsContainer = styled.div`
  display: flex;
  gap: 2rem;
  /* padding: 2rem 0 2rem; */
`

export const HeaderButton = styled.button<{ $active?: boolean }>`
  display: flex;
  gap: 1rem;

  color: ${(props) =>
    props.$active ? props.theme['blue-500'] : props.theme['gray-500']};
  font-weight: bold;
  padding: 1rem 0.5rem;
  background: transparent;

  cursor: pointer;
  outline: none;
  border: none;
  border-bottom: 2px solid;
  border-color: ${(props) =>
    props.$active ? props.theme['blue-500'] : props.theme['gray-500']};
`
