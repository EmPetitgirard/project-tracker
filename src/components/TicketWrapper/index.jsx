import { Link } from 'react-router-dom'
import { AbstractWrapper, TopWrapper } from '../../utils/style/Atoms'
import styled, { css } from 'styled-components'
import { useDispatch } from 'react-redux'
import { deleteTicket } from '../../features/suppression'
import bin from '../../assets/bin.png'
import { useConfirmAlert } from 'react-use-confirm-alert'

const ColoredCategoryWrapper = styled.div`
  width: 200px;
  ${({ color }) =>
    color &&
    css`
      background-color: ${color};
    `}
`

const TicketWrapper = (props) => {
  const { ticket } = props

  const ticketId = ticket._id

  const dispatch = useDispatch()

  function truncateRequirements(requirements) {
    return requirements.substring(0, 24).concat(' ...')
  }

  const remove = (ticketId) => {
    dispatch(deleteTicket(ticketId))
  }

  const confirmAlert = useConfirmAlert()

  async function handleDelete(ticketId) {
    const isConfirmed = await confirmAlert({
      title: 'Do you really want to delete this ticket?',
      message: 'This action cannot be undone',
    })

    if (isConfirmed) {
      remove(ticketId)
    }
  }

  return (
    <li>
      <AbstractWrapper>
        <TopWrapper>
          <Link to={`/ticket/${ticketId}`}>
            <div>{ticket.title}</div>
          </Link>
          <img
            src={bin}
            alt="Project Tracker Bin"
            height="15"
            title="Bin"
            onClick={() => handleDelete(ticketId)}
          />
        </TopWrapper>
        <Link to={`/ticket/${ticketId}`}>
          <div title={ticket.requirements}>
            {truncateRequirements(ticket.requirements)}
          </div>
          <ColoredCategoryWrapper
            title={ticket.category.title}
            color={ticket.category.color}
          >
            {truncateRequirements(ticket.category.title)}
          </ColoredCategoryWrapper>
        </Link>
      </AbstractWrapper>
    </li>
  )
}
export default TicketWrapper
