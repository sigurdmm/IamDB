import { Switch, Route } from 'react-router-dom';

// eslint-disable-next-line import/no-named-as-default
import HomePage from './pages/HomePage';

// eslint-disable-next-line import/no-named-as-default
import FilmPage from './pages/FilmPage';

const Routes = () => <Switch>
  <Route exact path="/" component={HomePage}/>
  <Route exact path="/media/:id" component={FilmPage}/>
</Switch>;


export default Routes;
