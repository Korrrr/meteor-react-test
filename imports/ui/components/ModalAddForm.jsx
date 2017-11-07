import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  Modal, Button,
} from 'react-bootstrap';

import { Products } from '../../api/products/products';
import InputField from './InputField.jsx';

import { validate, itemInsert } from '../helpers/helpers.js';


class ModalAddForm extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.handleChangePrice = this.handleChangePrice.bind(this);

    this.state = {
      name: '',
      description: '',
      price: '',
    }
  }

  handleChangeName(ev) {
    this.setState({
      name: ev.target.value,
    });
  }

  handleChangeDescription(ev) {
    this.setState({
      description: ev.target.value,
    });
  }

  handleChangePrice(ev) {
    this.setState({
      price: parseFloat(ev.target.value),
    });
  }

  handleSubmit(ev) {
    ev.preventDefault();

    if(validate(this.state, this.props.title)) {
      Bert.alert( validate(this.state, this.props.title), 'danger', 'growl-top-right' )
      return;
    } else {
      itemInsert(this.props.title, this.state, res => {
        this.setState(res);
      });
      this.props.onHide();
    }
  }

  render() {
    return (
      <Modal {...this.props} >
        <Form name="modalAddForm" horizontal onSubmit={this.handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Add {this.props.title} Form</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <InputField
              label="name"
              type="text"
              onChange={this.handleChangeName}
              value={this.state.name}
            />
            {this.props.title === 'product' &&
              <div>
              <InputField
                label="description"
                type="text"
                onChange={this.handleChangeDescription}
                value={this.state.description}
              />
              <InputField
                label="price"
                type="number"
                onChange={this.handleChangePrice}
                value={this.state.price}
              />
              </div>
            }
          </Modal.Body>
          <Modal.Footer>
            <Button
              type="submit"
              bsStyle="success"
            >Save</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}

ModalAddForm.propTypes = {
  title: PropTypes.string.isRequired,
  onHide: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired
};

export default ModalAddForm;
