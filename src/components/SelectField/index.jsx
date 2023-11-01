import styled from 'styled-components'
import Select from 'react-select'

const SelectWrapper = styled.div`
  width: 1030px;
`

export const SelectField = ({
  field,
  options,
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  valid,
}) => {
  const handleChange = (value) => {
    // this is going to call setFieldValue and manually update values
    onChange(field, value)
  }

  const handleBlur = () => {
    onBlur(field, true)
  }

  const customStyles = {
    control: (base) => ({
      ...base,
      border: error ? '1px solid #bf310c' : valid ? '1px solid #009c26' : '',
    }),
  }

  return (
    <SelectWrapper>
      <Select
        options={options}
        name={field}
        onChange={handleChange}
        onBlur={handleBlur}
        value={value}
        placeholder={placeholder}
        styles={customStyles}
      />
    </SelectWrapper>
  )
}
