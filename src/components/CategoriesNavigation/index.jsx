import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import * as navigationSwitchActions from '../../features/navigationSwitch'
import { Nav, NavList } from '../../utils/style/Atoms'

const CategoriesNavigation = () => {
  const dispatch = useDispatch()

  return (
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
      </NavList>
    </Nav>
  )
}
export default CategoriesNavigation
