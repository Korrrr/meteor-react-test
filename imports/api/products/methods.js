import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Products } from './products';


Meteor.methods({
  'product.insert'(product) {
    Products.insert(product);
  },
  'products.update'(product) {
    check(product.productId, String);
    check(product.name, String);
    check(product.description, String);
    check(product.price, Number);

    Products.update(product.productId,
      { $set: {
        name: product.name,
        description: product.description,
        price: product.price,
      }},
      { upsert: 1 }
    );
  },
  'products.remove'(productId) {
    check(productId, String);

    Products.remove(productId);
  },});
