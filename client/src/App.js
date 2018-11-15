import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Header from './components/Header';
import './App.less';

import Routes from './Routes';

const App = ({ location }) => {
  // Used to determine what styles to apply to the application
  const isOnRoot = location.pathname === '/';

  return <div className="application application--light">
    <Header title="Media searcher"
            className={`application__header ${!isOnRoot ? 'application__header--filled' : ''}`}/>
    <Routes/>
    <footer className={`application__footer ${!isOnRoot ? 'application__footer--dark' : ''}`}>
      Copyright 2018
    </footer>
  </div>;
};

App.propTypes = {
  location: PropTypes.object.isRequired,
};

export default withRouter(App);
