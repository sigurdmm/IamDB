import React from 'react';
import Header from './components/Header';
import Routes from './Routes';

const App = () => <div>
  <Header title="Hello world">
    <nav className="navigation">
      <a href="#" className="navigation__link">Test</a>
    </nav>
  </Header>
  <main>
    <Routes/>
  </main>
  <footer>
    Copyright 2018
  </footer>
</div>;

export default App;
