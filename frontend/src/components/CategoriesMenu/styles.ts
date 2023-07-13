import styled from 'styled-components'

export const Button = styled.button`
  padding: 8px;
  font-size: 16px;
`

export const DropdownMenu = styled.ul<{ $isOpen?: boolean }>`
  list-style: none;
  padding: 8px;
  border-radius: 8px;
  margin: 0;
  position: absolute;
  background-color: #333;
  color: #fff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
  text-align: center;
  /* top: 5px; */
  /* left: 50%; */
  transform: translateY(5%);
`

export const MenuItem = styled.li`
  padding: 8px;
  border-radius: 8px;
  &:hover {
    background-color: #555;
  }
  cursor: pointer;
`
