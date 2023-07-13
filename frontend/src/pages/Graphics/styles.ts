import styled from 'styled-components'

export const GraphicContainer = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 4rem auto 0;
  padding: 2rem;
  border-radius: 8px;
  background-color: ${(props) => props.theme['gray-900']};

  border: 2px solid ${(props) => props.theme['gray-700']};
`

export const YearsSelect = styled.select`
  padding: 8px;
  font-size: 14px;
  background-color: ${(props) => props.theme['gray-700']};
  color: #fff;
  border: none;
  border-radius: 6px;
  margin-left: 1rem;
  cursor: pointer;

  /* appearance: none; */
  /* -webkit-appearance: none;
  -moz-appearance: none; */

  /* scrollbar-width: 1px; */

  &:-webkit-scrollbar {
    display: none;
  }
  &:-moz-scrollbar {
    display: none;
  }
  &:-o-scrollbar {
    display: none;
  }
  &:-google-ms-scrollbar {
    display: none;
  }
  &:-khtml-scrollbar {
    display: none;
  }
  text-indent: 1px;
  text-overflow: '';

  &:focus {
    outline: none;
    overflow: hidden;
  }
`

export const GraphicYearSelect = styled.div`
  color: ${(props) => props.theme['gray-300']};
  width: 100%;
  display: flex;

  gap: 2;
`
