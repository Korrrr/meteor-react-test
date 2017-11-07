import { Meteor } from 'meteor/meteor';
import { Customers } from '/imports/api/customers/customers';

Meteor.publish('customers', function() {
  return Customers.find({});
});
