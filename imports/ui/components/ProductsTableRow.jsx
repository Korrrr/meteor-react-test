import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Modal, Button,
  Table,
  Checkbox,
} from 'react-bootstrap';

import InputField from './InputField.jsx';


class ProductsTableRow extends Component {
  handleChange(field, ev) {
    let value;
    if(field === 'checked') {
      value = ev.target.checked;
    } else {
      value = ev.target.value;
    }
    this.props.onRowChange(field, value);
  }

  render() {
    return (
      <tr key={this.props.id}>
        <th>{this.props.num}</th>
        <th>{this.props.name}</th>
        <th>{this.props.description}</th>
        <th>{this.props.price}</th>
        {this.props.checkbox &&
          <th>
            <Checkbox
              checked={this.props.checked}
              onChange={this.handleChange.bind(this, 'checked')}
            />
          </th>
        }
        {this.props.quantity &&
          <th>
            <InputField
              id="quantity"
              type="number"
              width={70}
              onChange={this.handleChange.bind(this, 'quantity')}
              value={this.props.quantity || 1}
            />
          </th>
        }
        {this.props.quantity &&
          <th>
            <InputField
              id="discount"
              type="number"
              width={70}
              onChange={this.handleChange.bind(this, 'discount')}
              value={this.props.discount || 0}
            />
          </th>
        }
      </tr>
      );
  }
}

ProductsTableRow.propTypes = {
  num: PropTypes.number,
  name: PropTypes.string,
  checkbox: PropTypes.array,
  checked: PropTypes.bool,
  description: PropTypes.string,
  price: PropTypes.number,
  discount: PropTypes.number,
  quantity: PropTypes.number,
  onRowChange: PropTypes.func.isRequired,
};

export default ProductsTableRow;
