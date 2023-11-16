import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import {
  createCategory,
  resetCategoryCreation,
} from '../../features/categoryCreation'
import {
  modifyCategory,
  resetCategoryModification,
} from '../../features/categoryModification'
import { Input } from '../../components/Input'
import Button from '../../components/Button'
import {
  selectCategoryCreation,
  selectCategory,
  selectCategoryModification,
} from '../../utils/selector'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchOrUpdateCategory } from '../../features/category'
import edit from '../../assets/edit.png'
import {
  Img,
  Title,
  Title2,
  Paragraph,
  ButtonBar,
  StyledInlineErrorMessage,
} from '../../utils/style/Atoms'
import Userfront from '@userfront/toolkit/react'
import { Navigate } from 'react-router-dom'

const EditWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`

const CategoryForm = () => {
  const { categoryId } = useParams()

  const newCategory = categoryId ? false : true

  const dispatch = useDispatch()

  useEffect(() => {
    if (!newCategory) {
      dispatch(fetchOrUpdateCategory(categoryId))
    }
  }, [dispatch, categoryId, newCategory])

  const category = useSelector(selectCategory(categoryId))

  const categoryData = category.data ?? {}

  const { title } = categoryData

  const [editing, setEditing] = useState(false)

  const navigate = useNavigate()

  const initialValues = {
    title: newCategory ? '' : title,
  }

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Please enter a title'),
  })

  const onSubmit = (values) => {
    const editedCategory = {
      title: values.title,
    }

    newCategory
      ? dispatch(createCategory(editedCategory))
      : dispatch(modifyCategory(categoryId, editedCategory))
  }

  const creation = useSelector(selectCategoryCreation)
  const modification = useSelector(selectCategoryModification)

  useEffect(() => {
    // On envoie le thunk à dispatch
    // C'est Redux-Thunk qui va s'occuper de l'exécuter pour nous
    if (creation.status === 'resolved') {
      dispatch(resetCategoryCreation)
      setEditing(false)

      const newCategoryId = creation.data.insertedId
      navigate(`/category/${newCategoryId}`)
    }
  }, [dispatch, creation, navigate])

  useEffect(() => {
    // On envoie le thunk à dispatch
    // C'est Redux-Thunk qui va s'occuper de l'exécuter pour nous
    if (modification.status === 'resolved') {
      dispatch(resetCategoryModification)
      setEditing(false)

      dispatch(fetchOrUpdateCategory(categoryId))
    }
  }, [dispatch, modification, categoryId])

  if (creation.status === 'rejected' || modification.status === 'rejected') {
    return <span>Il y a un problème</span>
  }

  return Userfront.user.hasRole('admin') ? (
    <div>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched, handleSubmit, isValid }) => {
          return (
            <>
              <Form onSubmit={handleSubmit}>
                {newCategory && <Title>New Category</Title>}
                <EditWrapper>
                  {!(editing || newCategory) && (
                    <Img
                      src={edit}
                      alt="Project Tracker Edit"
                      height="15"
                      title="Edit"
                      onClick={() => setEditing(true)}
                    />
                  )}
                </EditWrapper>

                <Title2>Title</Title2>

                {editing || newCategory ? (
                  <Input
                    name="title"
                    placeholder="Add a title"
                    error={touched.title && errors.title}
                    valid={touched.title && !errors.title}
                  />
                ) : (
                  <Paragraph>{title}</Paragraph>
                )}

                {editing && errors.title && touched.title && (
                  <StyledInlineErrorMessage>
                    {errors.title}
                  </StyledInlineErrorMessage>
                )}
                {(editing || newCategory) && (
                  <ButtonBar>
                    <Button type="submit" disabled={!isValid}>
                      Save
                    </Button>
                    {!newCategory && (
                      <Button
                        onClick={() =>
                          newCategory ? navigate('/') : setEditing(false)
                        }
                      >
                        Cancel
                      </Button>
                    )}
                  </ButtonBar>
                )}
              </Form>
            </>
          )
        }}
      </Formik>
    </div>
  ) : (
    <Navigate to="/home" />
  )
}

export default CategoryForm
