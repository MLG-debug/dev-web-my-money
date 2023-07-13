import {
  HeaderButton,
  HeaderButtonsContainer,
  HeaderContainer,
  HeaderContent,
  HeaderImageContainer,
} from './styles'

import LogoImage from '../../assets/mymoney-logo.svg'
import { useLocation, useNavigate } from 'react-router-dom'
import { ChartLine, Money } from 'phosphor-react'

export const Header = () => {
  const location = useLocation()
  const path = location.pathname
  console.log(path)
  const navigate = useNavigate()

  const handleNavigateToTransactions = () => {
    navigate('/')
  }
  const handleNavigateToGraphics = () => {
    navigate('/graphics')
  }

  return (
    <HeaderContainer>
      <HeaderContent>
        <HeaderImageContainer>
          <img src={LogoImage} alt="" />
        </HeaderImageContainer>

        <HeaderButtonsContainer>
          <HeaderButton
            $active={path === '/'}
            onClick={handleNavigateToTransactions}
          >
            <Money size={20} />
            Transações
          </HeaderButton>
          <HeaderButton
            $active={path === '/graphics'}
            onClick={handleNavigateToGraphics}
          >
            <ChartLine size={20} />
            Gráfico
          </HeaderButton>
        </HeaderButtonsContainer>
      </HeaderContent>
    </HeaderContainer>
  )
}
