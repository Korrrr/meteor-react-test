import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';


const Invoices = new Mongo.Collection('invoices');

Invoices.allow({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Invoices.deny({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

InvoicesSchema = new SimpleSchema({
  customerId: {
    type: String,
    optional: true,
  },
  customerName: {
    type: String,
    optional: true,
  },
  products: {
    type: [Object],
    optional: true,
    blackbox: true
  },
  createdAt: {
    type: Date,
  },
  'products.$.productId': {
    type: String,
  },
  'products.$.name': {
    type: String,
  },
  'products.$.description': {
    type: String,
  },
  'products.$.price': {
    type: Number,
    decimal: true,
  },
  'products.$.quantity': {
    type: Number,
  },
  'products.$.discount': {
    type: Number,
    decimal: true,
  }
});

Invoices.attachSchema(InvoicesSchema);

export { Invoices };
