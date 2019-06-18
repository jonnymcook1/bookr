import React from 'react';
import {HashRouter as Router} from 'react-router-dom'
import './Reset.css'
import './App.css';
import {Provider} from 'react-redux'
import store from './redux/store'
import routes from './routes';

function App() {
  return (
    <Provider store={store}>
        <Router>
          <div className="App">
            {routes}
          </div>
        </Router>
    </Provider>
  );
}

export default App;
