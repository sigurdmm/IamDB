import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import FilmPage from './pages/FilmPage';

const Routes = () => <BrowserRouter>
  <Switch>
    <Route exact path="/" component={HomePage}/>
    <Route exact path="/media/:id" component={FilmPage}/>
  </Switch>
</BrowserRouter>;


export default Routes;
