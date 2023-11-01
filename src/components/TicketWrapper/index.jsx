import { Link } from 'react-router-dom'
import { AbstractWrapper } from '../../utils/style/Atoms'
import styled, { css } from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTicket } from '../../features/suppression'
import bin from '../../assets/bin.png'
import { useConfirmAlert } from 'react-use-confirm-alert'
import { selectCategories } from '../../utils/selector'

const TopWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const CategoryWrapper = styled.div`
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

  const categories = useSelector(selectCategories)

  const findColorCategory = (id) => {
    let colors =
      categories &&
      categories.data &&
      categories.data.filter((category) => {
        return category._id === id
      })
    return colors ? colors[0].color : '#f7f3e9'
  }

  if (categories.status === 'rejected') {
    return <span>Il y a un problème</span>
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
          <CategoryWrapper
            title={ticket.category.title}
            color={findColorCategory(ticket.category._id)}
          >
            {truncateRequirements(ticket.category.title)}
          </CategoryWrapper>
        </Link>
      </AbstractWrapper>
    </li>
  )
}
export default TicketWrapper
