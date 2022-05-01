import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Main from './components/main/Main';

const App: React.FC = () => {
  return (
    <React.StrictMode>
      <Router>
        <Switch>
          <Route exact path="/" component={Main} />
        </Switch>
      </Router>
    </React.StrictMode>
  );
};

export default App;
