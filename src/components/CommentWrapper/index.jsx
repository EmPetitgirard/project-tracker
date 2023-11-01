import React from 'react'
import styled from 'styled-components'

const CommentHeader = styled.div`
  display: flex;
  flex-direction: row;
  padding-bottom: 5px;
  font-size: 0.8em;
  font-weight: bold;
`

const TimeStamp = styled.div`
  color: #387be5;
`

const CommentWrapper = (data) => {
  const comment = data.comment
  return (
    <>
      <CommentHeader>
        <div>Edited by {comment.writer}&nbsp;</div>
        <TimeStamp>{comment.timestamp}</TimeStamp>
      </CommentHeader>
      <div>{comment.text}</div>
    </>
  )
}
export default CommentWrapper
