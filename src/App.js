import React from 'react';
import {HashRouter as Router} from 'react-router-dom'
import './Reset.css'
import './App.scss';
import {Provider} from 'react-redux'
import store from './redux/store'
import routes from './routes';
import Header from './Components/Header/Header'

function App() {
  return (
    <Provider store={store}>
        <Router>
          <div className="App">
          <link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet"/>
          <link href="https://fonts.googleapis.com/css?family=Kanit:900i&display=swap" rel="stylesheet"></link>
          <link href="https://fonts.googleapis.com/css?family=Advent+Pro&display=swap" rel="stylesheet"/>
          <link href="https://fonts.googleapis.com/css?family=Anton&display=swap" rel="stylesheet"/>
            <Header/>
            {routes}
          </div>
        </Router>
    </Provider>
  );
}

export default App;
