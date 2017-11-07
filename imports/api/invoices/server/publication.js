import { Meteor } from 'meteor/meteor';
import { Invoices } from '/imports/api/invoices/invoices';

Meteor.publish('invoices', function() {
  return Invoices.find({});
});
