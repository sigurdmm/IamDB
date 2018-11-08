import { BrowserRouter, Switch, Route } from 'react-router-dom';

// eslint-disable-next-line import/no-named-as-default
import HomePage from './pages/HomePage';

const Routes = () => <BrowserRouter>
  <Switch>
    <Route exact path="/" component={HomePage}/>
  </Switch>
</BrowserRouter>;


export default Routes;
