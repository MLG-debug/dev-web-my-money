import styled from 'styled-components'

export const Tooltip = styled.div<{ $show: boolean }>`
  position: absolute;
  display: flex;
  /* top: 100%; */
  /* left: 50%; */
  /* transform: translateX(-50%); */
  margin-left: 1rem;
  margin-top: 4px;
  background-color: #333;
  color: #fff;
  padding: 8px;
  font-size: 14px;
  border-radius: 4px;
  visibility: ${({ $show }) => ($show ? 'visible' : 'hidden')};
  opacity: ${({ $show }) => ($show ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;
`

export const Input = styled.input`
  /* margin-bottom: 8px; */
  /* padding: 4px; */
`

export const SaveButton = styled.button`
  padding: 4px 8px;
  margin-left: 0.5rem;
  background: ${(props) => props.theme['blue-500']} !important;
`
