import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import {
  Button,
  ListGroup, ListGroupItem,
  InputGroup
} from 'react-bootstrap';

import ProductForm from '../components/ProductForm.jsx';
import Product from '../components/Product.jsx';
import { Products } from '../../api/products/products';


class ProductsPage extends Component {
  constructor(props) {
    super(props);

    this.getFromForm = this.getFromForm.bind(this);

    this.state = {
      productId: ''
    }
  }

  productsList() {
    return this.props.products.map( (product) => {
      return (
        <Product
          key={product._id}
          id={product._id}
          name={product.name}
          price={product.price}
          description={product.description}
          onProductUpdate={this.getFromForm}
        />
        );
    });
  }

  getFromForm(val) {
    this.setState({
      productId: val
    });
  }

  render() {
    return (
      <div>
        <ProductForm
          productId={this.state.productId}
          onProductUpdate={this.getFromForm}
        />
        <br />
        <h3>Products</h3>
        <ListGroup>
          {this.productsList()}
        </ListGroup>

      </div>
    );
  }
}

ProductsPage.propTypes = {
  products: PropTypes.array,
};


export default createContainer(() => {
  Meteor.subscribe('products');
  return {
    products: Products.find().fetch(),
  }
}, ProductsPage);
