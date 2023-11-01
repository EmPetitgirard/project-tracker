import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import edit from '../../assets/edit.png'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectTicket,
  selectTickets,
  selectCreation,
  selectModification,
  selectCategories,
} from '../../utils/selector'
import Button from '../../components/Button'
import CommentWrapper from '../../components/CommentWrapper'
import { fetchOrUpdateTicket } from '../../features/ticket'
import { createTicket, resetCreation } from '../../features/creation'
import { modifyTicket, resetModification } from '../../features/modification'
import { useEffect } from 'react'
import dayjs from 'dayjs'

import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { Input } from '../../components/Input'
import { SelectField } from '../../components/SelectField'

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const Img = styled.img`
  padding: 15px;
`

const Title = styled.h1`
  font: bold;
`

const Title2 = styled.h2`
  font: bold;
`

const Paragraph = styled.p`
  width: 1000px;
  &:hover {
    cursor: pointer;
    box-shadow: 2px 2px 10px #e2e3e9;
    background-color: #e6e6e6;
`

const ButtonBar = styled.div`
  width: 150px;
  margin-top: 30px;
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const StyledInlineErrorMessage = styled.div`
  background-color: rgb(255, 245, 245);
  color: rgb(120, 27, 0);
  display: block;

  padding: 8px;
  width: 1030px;
  margin-top: 0.5rem;
  white-space: pre-line;
`

const Ticket = () => {
  const { ticketId } = useParams()

  const newTicket = ticketId ? false : true

  const dispatch = useDispatch()

  useEffect(() => {
    if (!newTicket) {
      dispatch(fetchOrUpdateTicket(ticketId))
    }
  }, [dispatch, ticketId, newTicket])

  const ticket = useSelector(selectTicket(ticketId))

  const ticketData = ticket.data ?? {}

  const { title, requirements, description, comments, category } = ticketData

  const [editing, setEditing] = useState(false)

  const navigate = useNavigate()

  const tickets = useSelector(selectTickets)

  const categories = useSelector(selectCategories)

  const options = categories.data.map((category) => ({
    value: category._id,
    label: category.title,
  }))

  const generateTitle = () => {
    return tickets.data
      ? 'Tick-' +
          (Math.max(
            ...tickets.data.map((ticket) =>
              parseInt(ticket.title.substring(ticket.title.indexOf('-') + 1)),
            ),
          ) +
            1)
      : 'Tick-1'
  }

  function timestamp() {
    const now = dayjs()
    return now
      .format('MMMM')
      .substring(0, 3)
      .concat(' ', now.format('D YYYY'), ' at ', now.format('HH:mm'))
  }

  const initialValues = {
    title: newTicket ? generateTitle() : title,
    requirements: newTicket ? '' : requirements,
    description: newTicket ? '' : description,
    category: newTicket
      ? ''
      : category
      ? { value: category._id, label: category.title }
      : {},
    comment: '',
  }

  const validationSchema = Yup.object().shape({
    requirements: Yup.string().required('Please enter Requirements'),
    description: Yup.string().required('Please enter a description'),
    category: Yup.object().required('Please enter a category'),
  })

  const onSubmit = (values, actions) => {
    const dataComment = {
      writer: 'Emmanuel',
      text: values.comment,
      timestamp: timestamp(),
    }

    const editedTicket = {
      title: values.title,
      requirements: values.requirements,
      description: values.description,
      categoryId: values.category.value,
      comment: values.comment && dataComment,
    }

    newTicket
      ? dispatch(createTicket(editedTicket))
      : dispatch(modifyTicket(ticketId, editedTicket))
  }

  const creation = useSelector(selectCreation)
  const modification = useSelector(selectModification)

  useEffect(() => {
    // On envoie le thunk à dispatch
    // C'est Redux-Thunk qui va s'occuper de l'exécuter pour nous
    if (creation.status === 'resolved') {
      dispatch(resetCreation)
      setEditing(false)

      const newTicketId = creation.data.insertedId
      navigate(`/ticket/${newTicketId}`)
    }
  }, [dispatch, creation, navigate])

  useEffect(() => {
    // On envoie le thunk à dispatch
    // C'est Redux-Thunk qui va s'occuper de l'exécuter pour nous
    if (modification.status === 'resolved') {
      dispatch(resetModification)
      setEditing(false)
      dispatch(fetchOrUpdateTicket(ticketId))
    }
  }, [dispatch, modification, ticketId])

  if (creation.status === 'rejected' || modification.status === 'rejected') {
    return <span>Il y a un problème</span>
  }

  return (
    <div>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleSubmit,
          isSubmitting,
          isValid,
          setFieldValue,
          setFieldTouched,
        }) => {
          return (
            <>
              <Form onSubmit={handleSubmit}>
                <TitleWrapper>
                  <Title>{values.title}</Title>
                  {!(editing || newTicket) && (
                    <Img
                      src={edit}
                      alt="Project Tracker Edit"
                      height="15"
                      title="Edit"
                      onClick={() => setEditing(true)}
                    />
                  )}
                </TitleWrapper>

                <Title2>Requirements</Title2>
                {editing || newTicket ? (
                  <Input
                    name="requirements"
                    placeholder="Add Requirements"
                    error={touched.requirements && errors.requirements}
                    valid={touched.requirements && !errors.requirements}
                  />
                ) : (
                  <Paragraph>{requirements}</Paragraph>
                )}
                {editing && errors.requirements && touched.requirements && (
                  <StyledInlineErrorMessage>
                    {errors.requirements}
                  </StyledInlineErrorMessage>
                )}
                <Title2>Description</Title2>
                {editing || newTicket ? (
                  <Input
                    multiline="true"
                    name="description"
                    placeholder="Add a Description"
                    error={touched.description && errors.description}
                    valid={touched.description && !errors.description}
                  />
                ) : (
                  <Paragraph>{description}</Paragraph>
                )}
                {editing && errors.description && touched.description && (
                  <StyledInlineErrorMessage>
                    {errors.description}
                  </StyledInlineErrorMessage>
                )}
                <Title2>Category</Title2>
                {editing || newTicket ? (
                  <SelectField
                    field="category"
                    options={options}
                    value={values.category}
                    onChange={setFieldValue}
                    onBlur={setFieldTouched}
                    placeholder="Select a category"
                    error={touched.category && errors.category}
                    valid={touched.category && !errors.category}
                  />
                ) : (
                  <Paragraph>{category ? category.title : ''}</Paragraph>
                )}
                <Title2>Comments</Title2>
                {comments &&
                  comments.map((comment) => (
                    <Paragraph>
                      <CommentWrapper comment={comment} />
                    </Paragraph>
                  ))}
                {(editing || newTicket) && (
                  <>
                    <Input
                      multiline="true"
                      name="comment"
                      placeholder="Add a Comment"
                    />
                    <ButtonBar>
                      <Button type="submit" disabled={!isValid || isSubmitting}>
                        Save
                      </Button>
                      <Button
                        onClick={() =>
                          newTicket ? navigate('/') : setEditing(false)
                        }
                      >
                        Cancel
                      </Button>
                    </ButtonBar>
                  </>
                )}
              </Form>
            </>
          )
        }}
      </Formik>
    </div>
  )
}
export default Ticket
