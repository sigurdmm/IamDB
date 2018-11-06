import React from 'react';
import Header from './components/Header';
import 'App.less';

import Routes from './Routes';

const coverimages = [
  'https://media.giphy.com/media/XUTz8zpPF458I/giphy.gif',
  'https://media.giphy.com/media/hCm2X1kXxjyZq/giphy.gif',
  'https://media.giphy.com/media/xpBiaXFbVUtTa/giphy.gif',
  'https://media.giphy.com/media/PrGNf7O36heCs/giphy.gif',
  'https://media.giphy.com/media/26BRuo6sLetdllPAQ/giphy.gif',
  'https://media.giphy.com/media/3ohzdUi5U8LBb4GD4s/giphy.gif',
  'https://media.giphy.com/media/3oEjI1erPMTMBFmNHi/giphy.gif',
];

const selectRandomItem = list => list[Math.floor(Math.random() * list.length)];

const App = () => <>
  <div className="systemcover"
       style={{ backgroundImage: `url('${selectRandomItem(coverimages)}')` }}/>
  <div className="application application--light">
    <Header title="Hello world" className="application__header">
      <nav className="navigation">
        <a href="#" className="navigation__link">Test</a>
      </nav>
    </Header>
    <main className="application__content application__content--centered">
      <Routes/>
    </main>
    <footer className="application__footer">
      Copyright 2018
    </footer>
  </div>
</>;

export default App;
