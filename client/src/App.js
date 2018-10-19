import React from 'react';
import Header from './components/Header';

const App = () => <div>
  <Header title="Hello world">
    <nav className="navigation">
      <a href="#" className="navigation__link">Test</a>
    </nav>
  </Header>
  <main>
    <h1>Hello world</h1>
  </main>
  <footer>
    Copyright 2018
  </footer>
</div>;

export default App;
