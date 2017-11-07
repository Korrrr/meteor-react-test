import { Meteor } from 'meteor/meteor';
import { Products } from '/imports/api/products/products';

Meteor.publish('products', function() {
  return Products.find({});
});
