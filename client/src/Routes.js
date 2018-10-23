import HomePage from './pages/HomePage';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

const Routes = () => <BrowserRouter>
  <Switch>
    <Route exact path="/" component={HomePage}/>
  </Switch>
</BrowserRouter>;


export default Routes;
