import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Form,
  FormGroup, FormControl, ControlLabel,
  Col
} from 'react-bootstrap';

import InputField from './InputField.jsx';
import { Products } from '../../api/products/products';
import { validate } from '../helpers/helpers.js';


const STATE_DEFAULT = {
  name: '',
  description: '',
  price: '',
  productId: ''
}

export default class ProductForm extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.handleChangePrice = this.handleChangePrice.bind(this);

    this.state = STATE_DEFAULT;
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

    if(validate(this.state, 'product')) {
      Bert.alert( validate(this.state, 'product'), 'danger', 'growl-top-right' )
      return;
    } else {
      Meteor.call('products.update', this.state, (err) => {
        if(err) {
          Bert.alert( err, 'danger', 'growl-top-right' );
        } else {
          Bert.alert( `${this.state.name} update successfuly`, 'success', 'growl-top-right' );
          this.setState(STATE_DEFAULT);
          this.props.onProductUpdate(null);
        }
      });
    }
  }

  handleCancel() {
    this.setState(STATE_DEFAULT);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.productId !== this.props.productId ||
      nextState.name !== this.state.name ||
      nextState.description !== this.state.description ||
      nextState.price !== this.state.price;
  }

  componentWillReceiveProps(nextProps) {
    const product = Products.findOne(nextProps.productId);
    let state = STATE_DEFAULT;
    if(product) {
      state = {
        productId: nextProps.productId,
        name: product.name,
        description: product.description,
        price: product.price
      };
    }
    this.setState(state);
  }

  render() {
    return (
      <div>
        <h4>Products Form {this.state.productId && '(edit)'}</h4>
        <Form horizontal onSubmit={this.handleSubmit}>

          <InputField
            label="name"
            type="text"
            onChange={this.handleChangeName}
            value={this.state.name}
          />
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

          <Col xsOffset={2}>
            <Button
              type="submit"
              bsStyle={this.state.productId ? "primary" : "success"}
            >{this.state.productId ? "Save" : "Create"}</Button>
            {this.state.productId &&
              <Button
                onClick={this.handleCancel}
              >Cancel
              </Button>
            }
          </Col>
        </Form>
      </div>
    );
  }
}

ProductForm.propTypes = {
  onProductUpdate: PropTypes.func.isRequired,
  productId: PropTypes.string,
};
