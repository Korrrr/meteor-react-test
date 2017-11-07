import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Invoices } from './invoices';
import { Products } from '../products/products';
import { Customers } from '../customers/customers';


Meteor.methods({
  'invoices.insert'(invoice) {
    invoice.createdAt = new Date();

    return Invoices.insert(invoice);
  },
  'invoices.update.customer'(invoiceId, customerId){
    check(invoiceId, String);
    check(customerId, String);

    const customer = Customers.findOne(customerId);

    if (customer) {
      Invoices.update(invoiceId,
        {
          $set: {
            customerId,
            customerName: customer.name
          }
        }
      );
    } else {
      Invoices.update(invoiceId,
        {
          $unset: {
            customerId: 1,
            customerName: 1
          }
        }
      );
    }
  },
  'invoices.update.products'(invoiceId, product, state) {
    check(invoiceId, String);
    check(product, Object);
    check(state, Boolean);

    const invoice = Invoices.findOne(invoiceId);

    product.quantity = 1;
    product.discount = 0;

    if(state) {
      Invoices.update(invoiceId,
        { $push: {
          products: product,
        }
      });
    } else {
      Invoices.update(invoiceId,
        { $pull: {
          products: product,
        }
      });
    }
  },
  'invoices.update.data'(invoiceId, item) {
    check(invoiceId, String);
    check(item, Object);

    Invoices.update(
      {
        _id: invoiceId,
        'products._id': item._id
      },
    {
      $set: {
        'products.$.quantity': item.quantity,
        'products.$.discount': item.discount
      }
    }
    )
  },
  'invoices.remove'(invoiceId) {
    check(invoiceId, String);

    Invoices.remove(invoiceId);
  },
});
