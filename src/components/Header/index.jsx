import React from 'react'
import styled from 'styled-components'
import logo from '../../assets/poseidon.jpg'

const HeaderBar = styled.header`
  width: 100%;
  padding: 0.5em 1em;
  display: flex;
  height: 100px;
  position: fixed;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.25);
  z-index: 1;
`

const Title = styled.div`
  margin-left: 10px;
  font: bold x-large cursive;
  color: #387be5;
  text-shadow: 3px 3px 1px black;
`

const Header = () => {
  return (
    <HeaderBar>
      <img src={logo} alt="Project Tracker Logo" height="100" />
      <Title>Team Poseidon</Title>
    </HeaderBar>
  )
}
export default Header
