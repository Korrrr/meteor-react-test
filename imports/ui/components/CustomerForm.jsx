import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Form,
  FormGroup, FormControl, ControlLabel,
  Col
} from 'react-bootstrap';

import InputField from './InputField.jsx';
import { Customers } from '../../api/customers/customers';
import { validate } from '../helpers/helpers.js';


export default class CustomerForm extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);

    this.state = {
      name: '',
      customerId: ''
    }
  }

  handleChangeName(ev) {
    this.setState({
      name: ev.target.value,
    });
  }

  handleSubmit(ev) {
    ev.preventDefault();

    if(validate(this.state, 'customer')) {
      Bert.alert( validate(this.state, 'customer'), 'danger', 'growl-top-right' )
      return;
    } else {
      Meteor.call('customers.update', this.state.customerId, this.state.name, (err) => {
        if(err) {
          Bert.alert( err.reason, 'danger', 'growl-top-right' );
        } else {
          Bert.alert( `${this.state.name} updated successfuly`, 'success', 'growl-top-right' );
          this.setState({
            name: '',
            customerId: ''
          });
          this.props.onCustomerUpdate(null);
        }
      });
    }
  }

  handleCancel() {
    this.setState({
      name: '',
      customerId: ''
    });
  }

  componentWillReceiveProps(nextProps) {
    const customer = Customers.findOne(nextProps.customerId);
    let state = {
        customerId: '',
        name: ''
    };
    if(customer) {
      state = {
        customerId: nextProps.customerId,
        name: customer.name
      }
    }
    this.setState(state);
  }


  shouldComponentUpdate(props, state) {
    return props.customerId !== this.props.customerId ||
      state.name !== this.state.name ||
      state.customerId !== this.state.customerId;
  }

  render() {
    return (
      <div>
      <h4>Customers Form {this.state.customerId && '(edit)'}</h4>
        <Form horizontal onSubmit={this.handleSubmit}>
          <InputField
            label="name"
            type="text"
            onChange={this.handleChangeName}
            value={this.state.name}
          />
          <Col xsOffset={2}>
            <Button
              type="submit"
              bsStyle={this.state.customerId ? "primary" : "success"}
            >{this.state.customerId ? "Save" : "Create"}</Button>
            {this.state.customerId &&
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

CustomerForm.propTypes = {
  customerId: PropTypes.string,
  onCustomerUpdate: PropTypes.func.isRequired
};

