import React from 'react'
import TicketsNavigation from '../TicketsNavigation'
import CategoriesNavigation from '../CategoriesNavigation'
import { useSelector } from 'react-redux'
import { selectNavigationSwitch } from '../../utils/selector'

const Navigation = () => {
  const navigationSwitch = useSelector(selectNavigationSwitch)

  return navigationSwitch === 'tickets' ? (
    <TicketsNavigation />
  ) : (
    <CategoriesNavigation />
  )
}
export default Navigation
