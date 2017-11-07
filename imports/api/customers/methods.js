import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Customers } from './customers';


Meteor.methods({
  'customer.insert'(customer) {
    if(isExist(customer.name)) {
      throw new Meteor.Error('Error', `Customer "${customer.name}"" is exist`);
    } else {
      customer.isDeleted = false;
      Customers.insert(customer);
    }
  },
  'customers.update'(customerId, name) {
    check(customerId, String);
    check(name, String);

    Customers.update(customerId, { $set: { name } }, { upsert: 1 });
  },
  'customers.remove'(customerId) {
    check(customerId, String);

    Customers.remove(customerId);
  },
});

function isExist(name) {
  return !!Customers.findOne({ 'name': name });
}