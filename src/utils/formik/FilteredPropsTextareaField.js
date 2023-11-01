import React from 'react'
import { Field } from 'formik'

function FilteredPropsTextareaField({
  component,
  className,
  valid,
  error,
  ...props
}) {
  return <Field component="textarea" className={className} {...props} />
}

export default FilteredPropsTextareaField
