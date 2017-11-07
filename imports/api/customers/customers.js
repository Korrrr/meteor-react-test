import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';


const Customers = new Mongo.Collection('customers');

Customers.allow({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Customers.deny({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

CustomersSchema = new SimpleSchema({
  name: {
    type: String,
  }
});

Customers.attachSchema(CustomersSchema);

export { Customers };
