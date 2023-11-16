import React from 'react'
import styled from 'styled-components'
import Header from '../Header'
import Navigation from '../Navigation'
import Userfront, { LoginForm } from '@userfront/toolkit/react'

const Wrapper = styled.div`
  @media (min-width: 700px) {
    display: flex;
    top: 100px;
    position: relative;
    height: calc(100% - 120px);
    width: 100%;
    flex: auto;
    flex-direction: column;
  }
`
const Main = styled.main`
  position: fixed;
  height: calc(100% - 185px);
  width: 100%;
  padding: 1em;
  overflow-y: scroll;
  @media (min-width: 700px) {
    flex: 1;
    margin-left: 280px;
    height: calc(100% - 120px);
    width: calc(100% - 280px);
  }
`

const Layout = ({ children }) => {
  return Userfront.accessToken() ? (
    <React.Fragment>
      <Header />
      <Wrapper>
        <Navigation />
        <Main>{children}</Main>
      </Wrapper>
    </React.Fragment>
  ) : (
    <LoginForm />
  )
}
export default Layout
