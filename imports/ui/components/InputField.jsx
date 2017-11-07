import React from 'react';
import PropTypes from 'prop-types';
import {
  FormGroup, FormControl, ControlLabel,
  Col
} from 'react-bootstrap';


const InputField = props => {
  let id = props.id;
  let label, controlId;
  if(!id) {
    id = props.label
    label = (props.label).charAt(0).toUpperCase() + (props.label).slice(1);
    controlId = `formHorizontal${id}`
  }

  return (
    <FormGroup controlId={props.id || controlId}>
      {props.label &&
      <Col componentClass={ControlLabel} sm={2}>
        {label}
      </Col>
      }
      <Col sm={8}>
        <FormControl
          style={{width: props.width}}
          type={props.type || "text"}
          placeholder={props.label && label}
          {...props} />
      </Col>
    </FormGroup>
  );
}

InputField.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool
  ]),
};

export default InputField;
