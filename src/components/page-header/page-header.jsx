import styles from './page-header.module.css'

import styled from 'styled-components/macro'

export const PageHeader = () => {
  return (
    <Header>
      <Logo href='/'>With styled-components</Logo>
    </Header>
  )
}

const Header = styled.header`
  display: flex;
  justify-content: space-around;
`

const Logo = styled.a`
  color: green;
`
