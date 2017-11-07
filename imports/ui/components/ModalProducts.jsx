import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Modal, Button,
  Table,
  Checkbox,
} from 'react-bootstrap';

import { Products } from '../../api/products/products';
import ProductsTable from './ProductsTable.jsx';


class ModalProducts extends Component {
  constructor(props) {
    super(props);

    this.handleOnChange = this.handleOnChange.bind(this);

    this.state = {
      products: [],
    }
  }

  handleOnChange(item, field, value) {
    if(field === 'checked') {
      Meteor.call('invoices.update.products', this.props.invoiceId, item, value, (err) => {
        if(err) {
          Bert.alert( err.reason, 'danger', 'growl-top-right' );
        }
      });
    }

    let _arr = this.state.products;
    if (_arr.find(x => x._id === item._id)) {
      _arr = _arr.filter( (el) => {
        return el._id !== item._id
      });
    } else {
      _arr.push(item);
    }
    this.setState({
      products: _arr
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      products: nextProps.selectedProducts,
    });
  }

  render() {
    return (
      <Modal {...this.props} >
        <Modal.Header closeButton>
          <Modal.Title>Products List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ProductsTable
            products={this.props.products}
            checkbox={this.state.products}
            invoiceId={this.props.invoiceId}
            onTableChange={this.handleOnChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

ModalProducts.propTypes = {
  invoiceId: PropTypes.string,
  onHide: PropTypes.func.isRequired,
  products: PropTypes.array,
  selectedProducts: PropTypes.array,
  show: PropTypes.bool.isRequired
};

export default ModalProducts;
