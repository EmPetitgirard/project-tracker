import React from 'react'
import { createPortal } from 'react-dom'
import { useSelector } from 'react-redux'
import useConfirm from '../../utils/hooks/useConfirm'
import { selectConfirm } from '../../utils/selector'
import styled from 'styled-components'
import Button from '../../components/Button'

const PortalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1000000;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
`

const DialogWrapper = styled.div`
  z-index: 1000000000000111;
  padding: 16px;
  background-color: white;
  width: 400px;
  position: absolute;
  top: 200px;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;
`

const TitleWrapper = styled.p`
  font-size: 18px;
`

const FooterWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`

const ButtonWrapper = styled.div`
  margin: 0 10px;
`

const ConfirmDialog = () => {
  const { onConfirm, onCancel } = useConfirm()

  const confirmState = useSelector(selectConfirm)

  const portalElement = document.getElementById('portal')
  const component = confirmState.show ? (
    <PortalOverlay>
      <DialogWrapper>
        <TitleWrapper>{confirmState?.title && confirmState.title}</TitleWrapper>
        <p>{confirmState?.message && confirmState.message}</p>
        <FooterWrapper>
          <ButtonWrapper>
            <Button onClick={onConfirm}>Yes</Button>
          </ButtonWrapper>
          <ButtonWrapper>
            <Button onClick={onCancel}>Cancel</Button>
          </ButtonWrapper>
        </FooterWrapper>
      </DialogWrapper>
    </PortalOverlay>
  ) : null

  return createPortal(component, portalElement)
}
export default ConfirmDialog
