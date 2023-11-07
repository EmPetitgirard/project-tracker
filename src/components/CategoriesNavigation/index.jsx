import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as navigationSwitchActions from '../../features/navigationSwitch'
import {
  Loader,
  LoaderWrapper,
  Nav,
  NavList,
  AbstractWrapper,
} from '../../utils/style/Atoms'
import { selectCategories } from '../../utils/selector'
import CategoryWrapper from '../CategoryWrapper'
import { fetchOrUpdateCategories } from '../../features/categories'
import { resetCategorySuppression } from '../../features/categorySuppression'
import {
  selectCategorySuppression,
  selectCategoryCreation,
  selectCategoryModification,
} from '../../utils/selector'
import styled from 'styled-components'

const EmptyWrapper = styled.div`
  width: 230px;
  height: 50px;
`

const CategoriesNavigation = () => {
  const dispatch = useDispatch()

  const suppression = useSelector(selectCategorySuppression)
  const creation = useSelector(selectCategoryCreation)
  const modification = useSelector(selectCategoryModification)

  useEffect(() => {
    // On envoie le thunk à dispatch
    // C'est Redux-Thunk qui va s'occuper de l'exécuter pour nous
    dispatch(fetchOrUpdateCategories)
    if (suppression.status === 'resolved') {
      dispatch(resetCategorySuppression)
    } else if (suppression.status === 'rejected') {
      alert('Il y a un problème')
    }
  }, [dispatch, suppression, creation, modification])

  const categories = useSelector(selectCategories)

  return (
    <>
      {categories.status === 'pending' || categories.status === 'void' ? (
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      ) : (
        <Nav>
          <NavList>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link
                to="/"
                onClick={() => dispatch(navigationSwitchActions.toggle())}
              >
                Tickets
              </Link>
            </li>
            <li>
              <Link to="/category/new">
                <AbstractWrapper>New Category</AbstractWrapper>
              </Link>
            </li>
            <li>
              <EmptyWrapper />
            </li>
            {categories.data.map((category) => (
              <CategoryWrapper category={category} />
            ))}
          </NavList>
        </Nav>
      )}
    </>
  )
}
export default CategoriesNavigation
