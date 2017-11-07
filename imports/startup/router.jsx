import React from 'react';
import { mount } from 'react-mounter';

import App from '../ui/App.jsx';
import InvoicesPage from '../ui/pages/InvoicesPage.jsx';
import ProductsPage from '../ui/pages/ProductsPage.jsx';
import CustomersPage from '../ui/pages/CustomersPage.jsx';
import NotFound from '../ui/pages/NotFound.jsx';

FlowRouter.route("/", {
  name: "home",
  action() {
    mount(App, {
      content: <InvoicesPage />
    });
  }
});

FlowRouter.route('/products', {
  name: 'products',
  action(params) {
    mount(App, {
      content: <ProductsPage />
    });
  }
});

FlowRouter.route('/customers', {
  name: 'customers',
  action(params) {
    mount(App, {
      content: <CustomersPage />
    });
  }
});

FlowRouter.notFound = {
  action: function() {
    mount(App, {
      content: <NotFound />
    });
  }
};
