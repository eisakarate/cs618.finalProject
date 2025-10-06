import PropTypes from 'prop-types'
import { Col, FormControl } from 'react-bootstrap'

export function RecipeFilter({ field, value, onChange }) {
  return (
    <Col mb={2}>
      {/* field is the paramter, a control/or property? */}
      {/* create a label for a filter control */}
      {/* <FormLabel htmlFor={`filter-${field}`}>{field}: </FormLabel> */}
      {/* Create a textbox to specify a filter */}
      <FormControl
        placeholder={`Filter by ${field}`}
        type='text'
        name={`filter-${field}`}
        id={`filter-${field}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </Col>
  )
}

//make it required
RecipeFilter.propTypes = {
  field: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.string.isRequired,
}
