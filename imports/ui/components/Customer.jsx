import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import {
  Button,
  ListGroup, ListGroupItem,
  InputGroup
} from 'react-bootstrap';


class Customer extends Component {
  constructor(props) {
    super(props);

    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleEdit(ev) {
    ev.preventDefault();
    this.props.onCustomerUpdate(this.props.id);
  }

  handleDelete(ev) {
    ev.preventDefault();

    Meteor.call('customers.remove', this.props.id, (err) => {
      if(err) {
        Bert.alert( err.reason, 'danger', 'growl-top-right' );
      } else {
        Bert.alert( `${this.props.name} deleted`, 'info', 'growl-top-right' );
      }
    });
  }

  shouldComponentUpdate(props, state) {
    return props.id !== this.props.id ||
      props.name !== this.props.name;
  }

  render() {
    return (
        <ListGroupItem>
          <InputGroup style={{float: 'right'}}>
            <Button
              bsStyle="success"
              bsSize="xsmall"
              onClick={this.handleEdit}
            >Edit</Button>
            <Button
              bsStyle="danger"
              bsSize="xsmall"
              onClick={this.handleDelete}
            >Del</Button>
          </InputGroup>
          {this.props.name}
        </ListGroupItem>
      );
    }
  }

Customer.propTypes = {
  name: PropTypes.string,
};

export default Customer;
