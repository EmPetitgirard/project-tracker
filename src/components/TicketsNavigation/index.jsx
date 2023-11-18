import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import TicketWrapper from '../TicketWrapper'
import {
  AbstractWrapper,
  Loader,
  LoaderWrapper,
  Nav,
  NavList,
} from '../../utils/style/Atoms'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectTickets,
  selectSuppression,
  selectCreation,
  selectModification,
  selectCategories,
} from '../../utils/selector'
import { useEffect } from 'react'
import { fetchOrUpdateTickets } from '../../features/tickets'
import { fetchOrUpdateCategories } from '../../features/categories'
import { resetSuppression } from '../../features/suppression'
import Select from 'react-select'
import * as navigationSwitchActions from '../../features/navigationSwitch'
import Userfront from '@userfront/toolkit/react'

const EmptyWrapper = styled.div`
  width: 230px;
  height: 50px;
`

const SelectWrapper = styled.div`
  width: 230px;
  margin-bottom: 20px;
`

const TicketsNavigation = () => {
  const dispatch = useDispatch()

  const suppression = useSelector(selectSuppression)
  const creation = useSelector(selectCreation)
  const modification = useSelector(selectModification)

  const navigate = useNavigate()

  const [array, setArray] = useState([])

  useEffect(() => {
    // On envoie le thunk à dispatch
    // C'est Redux-Thunk qui va s'occuper de l'exécuter pour nous
    dispatch(fetchOrUpdateTickets)
    if (suppression.status === 'resolved') {
      dispatch(resetSuppression)
      navigate('/home')
    } else if (suppression.status === 'rejected') {
      alert('Il y a un problème')
    }
  }, [dispatch, suppression, creation, modification, navigate])

  useEffect(() => {
    // On envoie le thunk à dispatch
    // C'est Redux-Thunk qui va s'occuper de l'exécuter pour nous
    dispatch(fetchOrUpdateCategories)
  }, [dispatch])

  function truncateCategory(category) {
    return category.substring(0, 24).concat(' ...')
  }

  const tickets = useSelector(selectTickets)

  const categories = useSelector(selectCategories)

  const [selected, setSelected] = useState(null)

  function getInitialArray(data) {
    return (
      data &&
      [...data].sort((tick1, tick2) => (tick1.title > tick2.title ? 1 : -1))
    )
  }

  useEffect(() => {
    const initialArray = getInitialArray(tickets.data)

    if (!selected || (selected && selected.value === '')) {
      setArray(initialArray)
    } else if (selected) {
      setArray(
        initialArray.filter((ticket) => ticket.category._id === selected.value),
      )
    }
  }, [navigate, selected, tickets.data])

  function prepend(value, array) {
    var newArray = array.slice()
    newArray.unshift(value)
    return newArray
  }

  const nonEmptyOptions = categories.data
    ? categories.data.map((category) => ({
        value: category._id,
        label: truncateCategory(category.title),
      }))
    : []
  const options = nonEmptyOptions
    ? prepend({ value: '', label: 'No filter' }, nonEmptyOptions)
    : []

  const customStyles = {
    control: (base) => ({
      ...base,
      backgroundColor: '#e6e6e6',
    }),
  }

  const handleChange = (selectedOption) => {
    const initialArray = getInitialArray(tickets.data)
    setSelected(selectedOption)
    if (selectedOption.value === '') {
      setArray(initialArray)
    } else {
      setArray(
        initialArray.filter(
          (ticket) => ticket.category._id === selectedOption.value,
        ),
      )
    }
  }

  if (tickets.status === 'rejected') {
    return <span>Il y a un problème</span>
  }

  return (
    <>
      {tickets.status === 'pending' || tickets.status === 'void' ? (
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      ) : (
        <Nav>
          <NavList>
            <li>
              <Link to="/home">Home</Link>
            </li>
            {Userfront.user.hasRole('admin') && (
              <li>
                <Link
                  to="/category/new"
                  onClick={() => dispatch(navigationSwitchActions.toggle())}
                >
                  Categories
                </Link>
              </li>
            )}
            <li>
              <Link to="/ticket/new">
                <AbstractWrapper>New Ticket</AbstractWrapper>
              </Link>
            </li>
            <li>
              <EmptyWrapper />
            </li>
            <li>
              <SelectWrapper>
                <Select
                  options={options}
                  styles={customStyles}
                  onChange={handleChange}
                />
              </SelectWrapper>
            </li>
            {array &&
              React.Children.toArray(
                array.map((ticket) => <TicketWrapper ticket={ticket} />),
              )}
          </NavList>
        </Nav>
      )}
    </>
  )
}
export default TicketsNavigation
