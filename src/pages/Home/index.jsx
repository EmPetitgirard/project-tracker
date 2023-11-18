import React from 'react'
import styled from 'styled-components'
import picture from '../../assets/kanban.png'

const Img = styled.img`
  width: 700px;
  height: 500px;
  margin: 50px;
`

const Paragraph = styled.p`
  font-size: 1.2rem;
`

const WrapperText = styled.div`
  width: 1000px;
  margin: 50px;
`

const Home = () => {
  return (
    <>
      <Img src={picture} alt="Project Illustration" />
      <WrapperText>
        <Paragraph>
          A Kanban board is an Agile project management tool designed to help
          you visualize your work. Project managers, team leaders and other
          business professionals use them to track progress, maximize efficiency
          and increase organization. If you're responsible for managing a team
          or project, you may benefit from learning more about Kanban boards.
        </Paragraph>
      </WrapperText>
    </>
  )
}
export default Home
