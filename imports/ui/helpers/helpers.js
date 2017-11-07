export function validate(formData, type) {
  if(formData.hasOwnProperty('name') && formData.name === '') {
    return 'Name is required';
  }
  if(type === 'product') {
    if(formData.hasOwnProperty('description') && formData.description === '') {
      return 'Description is required';
    }
    if(formData.hasOwnProperty('price') && formData.price === '') {
      return 'Price is required';
    }
  }

  return false;
}

export function itemInsert(type, data, cb) {
  var str = `${type}.insert`;
  Meteor.call(str, data, (err) => {
    if(err) {
      Bert.alert( err.reason, 'danger', 'growl-top-right' );
    } else {
      Bert.alert( `${data.name} added successfuly`, 'success', 'growl-top-right' );
      let state = {}
      for( let field in data) {
        state[field] = ''
      }
      return cb(state);
    }
  });
}
