import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  FormGroup, FormControl, ControlLabel, InputGroup,
  Col,
  DropdownButton, MenuItem,
  Modal, Button,
} from 'react-bootstrap';

import InputField from './InputField.jsx';
import ModalProducts from './ModalProducts.jsx';
import ModalAddForm from './ModalAddForm.jsx';
import ProductsTable from './ProductsTable.jsx';

import { Invoices } from '../../api/invoices/invoices';
import { Products } from '../../api/products/products';

export default class InvoiceForm extends Component {
  constructor(props) {
    super(props);

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.modalClose = this.modalClose.bind(this);
    this.handleOpenForm = this.handleOpenForm.bind(this);

    this.handleSelectCustomer = this.handleSelectCustomer.bind(this);

    this.getTableChanges = this.getTableChanges.bind(this);

    this.handleAddCustomer = this.handleAddCustomer.bind(this);
    this.handleAddProduct = this.handleAddProduct.bind(this);

    this.state = {
      showForm: false,
      showModal: false,

      customerId: '',
      invoiceId: '',
      products: [],

      modalForm: ''
    }
  }

  customersList() {
    return this.props.customers && this.props.customers.map( (customer) => {
      return (
        <option
          key={customer._id}
          value={customer._id}
        >
          {customer.name}
        </option>
      );
    });
  }

  selectedProducts() {
    if(this.state.invoiceId) {
      const invoice = Invoices.findOne(this.state.invoiceId);
      if(invoice) {
        return invoice.products;
      }
    }
    return [];
  }

  handleSelectCustomer(ev) {
    ev.preventDefault();
    const customerId = ev.target.value;
    Meteor.call('invoices.update.customer', this.state.invoiceId, customerId, (err) => {
      if(err) {
        Bert.alert( err.reason, 'danger', 'growl-top-right' );
      } else {
        this.setState({
          customerId,
        });
        Bert.alert( 'Invoice update successfuly', 'success', 'growl-top-right' );
      }
    });
  }

  handleAddCustomer(ev) {
    ev.preventDefault();

    this.setState({
      modalForm: 'customer'
    });
  }

  handleAddProduct(ev) {
    ev.preventDefault();

    this.setState({
      modalForm: 'product'
    });
  }

  getTableChanges(item, field, value) {
    item[field] = value;
    Meteor.call('invoices.update.data', this.state.invoiceId, item, (err) => {
      if(err) {
        Bert.alert( err.reason, 'danger', 'growl-top-right' );
      }
    })
  }

  handleOpenForm() {
    this.setState({
      customerId: '',
      invoiceId: '',
      products: [],
    });
    this.props.onCreateNewInvoice(null);


    const invoice = {
      customerId: '',
      products: [],
    }

    Meteor.call('invoices.insert', invoice, (err, res) => {
      if(err) {
        Bert.alert( err.reason, 'danger', 'growl-top-right' );
      } else {
        this.setState({
          showForm: true,
          invoiceId: res
        });
      }
    })
  }

  handleOpenModal(ev) {
    ev.preventDefault();
    this.setState({
      showModal: true,
    });
  }

  modalClose() {
    Meteor.setTimeout(() => {
      this.setState({ showModal: false, modalForm: '' });
    }, 500);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.invoiceId) {
      const invoice = Invoices.findOne(nextProps.invoiceId);
      this.setState({
        invoiceId: nextProps.invoiceId,
        customerId: invoice && invoice.customerId || ''
      });
    }
  }


  render() {
    return (
      <div>
        <h4>Invoice Form</h4>

        <Button
          bsStyle="warning"
          onClick={this.handleOpenForm}
        >New Invoice
        </Button>

        {(this.state.invoiceId || this.state.showForm) &&
        <Form horizontal>

          <FormGroup
            controlId="formControlsSelectCustomers"
            onChange={this.handleSelectCustomer}
          >
            <Col xs={2} xsOffset={6}>
              <ControlLabel>Customers</ControlLabel>
            </Col>
            <InputGroup>
              <Col xsOffset={1}>
                <FormControl
                  componentClass="select"
                  value={this.state.customerId}
                  placeholder="Select customer"
                >
                  <option>Select customer</option>
                  {this.customersList()}
                </FormControl>
              </Col>
              <InputGroup.Button>
                <Button
                  bsStyle="success"
                  onClick={this.handleAddCustomer}
                >Add Customer</Button>
              </InputGroup.Button>
            </InputGroup>

          </FormGroup>

          <ProductsTable
            products={this.selectedProducts()}
            onTableChange={this.getTableChanges}
            quantity
            total
          />
        <Button
          bsStyle="info"
          onClick={this.handleOpenModal}
        >Select Products</Button>
        <Button
          bsStyle="primary"
          onClick={this.handleAddProduct}
        >Add New Product</Button>
        </Form>

        }
        <ModalProducts
          show={this.state.showModal}
          onHide={this.modalClose}
          invoiceId={this.state.invoiceId}
          products={this.props.products}
          selectedProducts={this.selectedProducts()}
        />
        <ModalAddForm
          title={this.state.modalForm}
          show={!!this.state.modalForm}
          onHide={this.modalClose}
        />
     </div>
    );
  }
}

InvoiceForm.propTypes = {
  customers: PropTypes.array,
  invoiceId: PropTypes.string,
  onCreateNewInvoice: PropTypes.func.isRequired,
  products: PropTypes.array,
};
