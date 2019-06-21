import React from 'react';
import {HashRouter as Router} from 'react-router-dom'
import './Reset.css'
import './App.css';
import {Provider} from 'react-redux'
import store from './redux/store'
import routes from './routes';
import Header from './Components/Header/Header'

function App() {
  return (
    <Provider store={store}>
        <Router>
          <div className="App">
            <Header/>
            {routes}
          </div>
        </Router>
    </Provider>
  );
}

export default App;
