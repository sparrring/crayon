import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Register from 'Features/register/Register';
import Layout from './Layout';

function App() {
  return (
    <Layout>
      <Router>
        <Switch>
          <Route exact path="/">
            <Register />
          </Route>
        </Switch>
      </Router>
    </Layout>
  );
}

export default App;
