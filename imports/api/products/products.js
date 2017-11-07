import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';


const Products = new Mongo.Collection('products');

Products.allow({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Products.deny({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

ProductsSchema = new SimpleSchema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    decimal: true,
  }
});

Products.attachSchema(ProductsSchema);

export { Products };
