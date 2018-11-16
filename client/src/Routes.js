import { Switch, Route, Redirect } from 'react-router-dom';

// eslint-disable-next-line import/no-named-as-default
import HomePage from './pages/HomePage';

// eslint-disable-next-line import/no-named-as-default
import FilmPage from './pages/FilmPage';

const Routes = () => <Switch>
  <Route exact path="/" component={HomePage}/>
  <Route exact path="/media/:id" component={FilmPage}/>
  <Redirect exact to="/"/>
</Switch>;


export default Routes;
