import { AbstractWrapper, TopWrapper } from '../../utils/style/Atoms'
import { deleteCategory } from '../../features/categorySuppression'
import { useDispatch, useSelector } from 'react-redux'
import { selectTickets } from '../../utils/selector'
import bin from '../../assets/bin.png'
import { useConfirmAlert } from 'react-use-confirm-alert'
import { Link } from 'react-router-dom'

const CategoryWrapper = (props) => {
  const { category } = props

  const categoryId = category._id

  const tickets = useSelector(selectTickets)

  const array = tickets.data.filter(
    (ticket) => ticket.category._id === categoryId,
  )
  const hasTickets = array.length > 0

  const dispatch = useDispatch()

  function truncateTitle(title) {
    return title.substring(0, 24).concat(' ...')
  }

  const remove = (categoryId) => {
    dispatch(deleteCategory(categoryId))
  }

  const confirmAlert = useConfirmAlert()

  async function handleDelete(categoryId) {
    // ramener les tickets et verifier si ils n'ont pas le meme categoryId
    const isConfirmed = await confirmAlert({
      title: 'Do you really want to delete this category?',
      message: 'This action cannot be undone',
    })

    if (isConfirmed) {
      remove(categoryId)
    }
  }

  return (
    <li>
      <AbstractWrapper>
        <TopWrapper>
          <Link to={`/category/${categoryId}`}>
            <div title={category.title}>{truncateTitle(category.title)}</div>
          </Link>

          {!hasTickets && (
            <img
              src={bin}
              alt="Project Tracker Bin"
              height="15"
              title="Bin"
              onClick={() => handleDelete(categoryId)}
            />
          )}
        </TopWrapper>
      </AbstractWrapper>
    </li>
  )
}
export default CategoryWrapper
