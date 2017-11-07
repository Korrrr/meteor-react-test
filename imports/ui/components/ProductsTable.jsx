import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Modal, Button,
  Table,
  Checkbox,
} from 'react-bootstrap';

import { Products } from '../../api/products/products';
import InputField from './InputField.jsx';
import ProductsTableRow from '../components/ProductsTableRow.jsx';



class ProductsTable extends Component {
  handleChange(item, field, value) {
    this.props.onTableChange(item, field, value);
  }

  productsList() {
    return this.props.products && this.props.products.map( (product, i) => {
      let currentProductId = product._id || product.productId;
      if(this.props.checkbox) {
        var checked = this.props.checkbox.find(x => x._id === currentProductId) && true;
      }
      return (
        <ProductsTableRow
          key={currentProductId}
          name={product.name}
          num={i + 1}
          description={product.description}
          price={product.price}
          quantity={this.props.quantity && (product.quantity || 1)}
          discount={this.props.quantity && (product.discount || 0)}
          checkbox={this.props.checkbox}
          checked={checked}
          onRowChange={this.handleChange.bind(this, product)}
        />
      );
    });
  }

  total() {
    const total = this.props.products.reduce((acc, cur) => {
      var val = (cur.price * cur.quantity) * (1 - cur.discount / 100);
      return acc + val
    }, 0);
    return total.toFixed(2);
  }

  render() {
    return (
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            {this.props.checkbox &&
              <th></th>
            }
            {this.props.quantity &&
              <th>Quantity</th>
            }
            {this.props.quantity &&
              <th>Discount, %</th>
            }
          </tr>
        </thead>
        <tbody>
          {this.productsList()}
          {this.props.total &&
            <tr>
              <th></th>
              <th>Total</th>
              <th></th>
              <th>{this.total()}</th>
              <th></th>
              <th></th>
            </tr>
          }
        </tbody>
      </Table>
    );
  }
}

ProductsTable.propTypes = {
  checkbox: PropTypes.array,
  invoiceId: PropTypes.string,
  onTableChange: PropTypes.func.isRequired,
  products: PropTypes.array,
};

export default ProductsTable;
