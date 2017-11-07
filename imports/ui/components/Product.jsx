import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  ListGroup, ListGroupItem,
  InputGroup
} from 'react-bootstrap';



class Product extends Component {
  constructor(props) {
    super(props);

    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

  }

  handleEdit(productId, ev) {
    ev.preventDefault();

    this.props.onProductUpdate(this.props.id);
  }

  handleDelete(productId, ev) {
    ev.preventDefault();

    Meteor.call('products.remove', this.props.id, (err) => {
      if(err) {
        Bert.alert( err.reason, 'danger', 'growl-top-right' );
      } else {
        Bert.alert(`${this.props.name} deleted`, 'info', 'growl-top-right');
      }
    });
  }

  shouldComponentUpdate(props, state) {
    return props.id !== this.props.id ||
      props.name !== this.props.name ||
      props.description !== this.props.description ||
      props.price !== this.props.price;
  }

  render() {
    return (
      <ListGroupItem
        header={this.props.name}
      >
        <InputGroup style={{float: 'right'}}>
          <Button
            bsStyle="success"
            bsSize="small"
            onClick={this.handleEdit}
          >Edit</Button>
          <Button
            bsStyle="danger"
            bsSize="small"
            onClick={this.handleDelete}
          >Del</Button>
        </InputGroup>
        Price: {this.props.price}<br />
        Description: {this.props.description}
      </ListGroupItem>
    );
  }
}

Product.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.number,
};

export default Product;
