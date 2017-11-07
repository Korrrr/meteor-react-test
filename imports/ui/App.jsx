import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import {
  Button,
} from 'react-bootstrap';

import { Products } from '../api/products/products';
import { Customers } from '../api/customers/customers';


const App = props => {
  return (
    <div className="container">
    <h1>MOCK</h1>
    <Button bsStyle="link">
      <a href="/">Invoices</a>
    </Button>
    <Button bsStyle="link">
      <a href="/products">Products</a>
    </Button>
    <Button bsStyle="link">
      <a href="/customers">Customers</a>
    </Button>
      {props.content}
    </div>
  );
}

App.propTypes = {
  content: PropTypes.object
}

export default App;
