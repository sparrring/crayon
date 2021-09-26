/* External dependencies */
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

/* Internal dependencies */
import Counter from 'Features/counter/Counter';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Counter />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
