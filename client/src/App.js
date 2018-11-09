import React from 'react';
import Header from './components/Header';
import './App.less';

import Routes from './Routes';

const App = () => <div className="application application--light">
    <Header title="Hello world" className="application__header">
      <nav className="navigation">
        <a href="#" className="navigation__link">Test</a>
      </nav>
    </Header>
    <Routes/>
    <footer className="application__footer">
      Copyright 2018
    </footer>
  </div>;


export default App;
