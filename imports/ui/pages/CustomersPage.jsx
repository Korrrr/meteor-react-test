import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import {
  Button,
  ListGroup, ListGroupItem,
  InputGroup
} from 'react-bootstrap';

import CustomerForm from '../components/CustomerForm.jsx';
import Customer from '../components/Customer.jsx';
import { Customers } from '../../api/customers/customers';


class CustomersPage extends Component {
  constructor(props) {
    super(props);

    this.getFromForm = this.getFromForm.bind(this);

    this.state = {
      customerId: ''
    }
  }

  getFromForm(val) {
    this.setState({
      customerId: val
    });
  }

  customersList() {
    return this.props.customers.map( (customer) => {
      return (
          <Customer
            key={customer._id}
            id={customer._id}
            name={customer.name}
            onCustomerUpdate={this.getFromForm}
          />
        );
    });
  }

  render() {
    return (
      <div>
        <CustomerForm
          customerId={this.state.customerId}
          onCustomerUpdate={this.getFromForm}
        />
        <br />
        <h3>Customers</h3>
        <ListGroup>
          {this.customersList()}
        </ListGroup>

      </div>
    );
  }
}

CustomersPage.propTypes = {
  customers: PropTypes.array,
};

export default createContainer(() => {
  Meteor.subscribe('customers');
  return {
    customers: Customers.find().fetch(),
  }
}, CustomersPage);
