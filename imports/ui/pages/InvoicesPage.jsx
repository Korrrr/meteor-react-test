import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { moment } from 'meteor/momentjs:moment';
import PropTypes from 'prop-types';
import {
  Button,
  ListGroup,
  ListGroupItem
} from 'react-bootstrap';


import { Customers } from '../../api/customers/customers';
import { Products } from '../../api/products/products';
import { Invoices } from '../../api/invoices/invoices';

import InvoiceForm from '../components/InvoiceForm.jsx';



class InvoicesPage extends Component {
  constructor(props) {
    super(props);

    this.resetInvoice = this.resetInvoice.bind(this);

    this.state = {
      invoiceId: ''
    }
  }

  handleRemoveInvoice(invoiceId, ev) {
    ev.preventDefault();

    this.setState({
      invoiceId: ''
    });

    Meteor.call('invoices.remove', invoiceId, (err) => {
      if(err) {
        Bert.alert( err.reason, 'danger', 'growl-top-right' );
      } else {
        Bert.alert( 'Invoice deleted successfully', 'success', 'growl-top-right' );
      }
    });
  }

  handleInvoiceClick(invoiceId, ev) {
    ev.preventDefault()

    this.setState({
      invoiceId
    });
  }

  resetInvoice(val) {
    this.setState({
      invoiceId: val,
    });

  }

  invoicesList() {
    return this.props.invoices.map( (invoice, i) => {
      const date = moment(invoice.createdAt).format('YYYY-MMM-DD');
        return (
            <ListGroupItem
              key={invoice._id}
              id={invoice._id}
              header={`id: ${invoice._id}`}
              onClick={this.handleInvoiceClick.bind(this, invoice._id)}
            >
              <Button
                onClick={this.handleRemoveInvoice.bind(this, invoice._id)}
                style={{float: "right"}}
                bsStyle="danger"
              >Del</Button>

              date: {date}
              <br />
              {invoice.customerName &&
                `customer: ${invoice.customerName}`
              }
            </ListGroupItem>
          );
    });
  }

  render() {
    return (
      <div>
        <InvoiceForm
          customers={this.props.customers}
          products={this.props.products}
          invoiceId={this.state.invoiceId}
          onCreateNewInvoice={this.resetInvoice}
        />
        <h3>Invoices</h3>
        <small>(click to edit)</small>
        <ListGroup>
          {this.invoicesList()}
        </ListGroup>
      </div>
    );
  }
}

InvoicesPage.propTypes = {
  customers: PropTypes.array,
  invoices: PropTypes.array,
  products: PropTypes.array,
};

export default createContainer(() => {
  Meteor.subscribe('customers');
  Meteor.subscribe('products');
  Meteor.subscribe('invoices');
  return {
    invoices: Invoices.find().fetch(),
    customers: Customers.find().fetch(),
    products: Products.find().fetch(),
  }
}, InvoicesPage);
