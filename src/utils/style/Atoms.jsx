import styled, { keyframes } from 'styled-components'

export const AbstractWrapper = styled.div`
  margin-top: 10px;
  padding: 0px 5px;
  display: flex;
  flex-direction: column;
  background-color: #e6e6e6;
`

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

export const Loader = styled.div`
  padding: 10px;
  border: 6px solid #5843e4;
  border-bottom-color: transparent;
  border-radius: 22px;
  animation: ${rotate} 1s infinite linear;
  height: 0;
  width: 0;
`

export const Nav = styled.nav`
  padding: 1em;
  background: #f7f3e9;
  @media (max-width: 700px) {
    padding-top: 100px;
  }
  @media (min-width: 700px) {
    position: fixed;
    width: 250px;
    height: calc(100% - 150px);
    overflow-y: scroll;
  }
`
export const NavList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  line-height: 2;
  a {
    text-decoration: none;
    font-weight: bold;
    font-size: 1em;
    color: #333;
  }
  a:visited {
    color: #333;
  }
  a:hover,
  a:focus {
    color: #0077cc;
  }
`
