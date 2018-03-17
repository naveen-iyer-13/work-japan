import React from 'react';
import { store } from './redux/store';
import {Provider} from 'react-redux'
import ReactDOM from 'react-dom';
import Login from './components/Login'
import SignUp from './components/SignUp'
import Tweets from './components/Tweets'
import SingleTweets from './components/SingleTweets'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header'
import { persistStore } from 'redux-persist'
import App from './App.js'

const renderFn = (Component) => (props) => (<Component
  {...props}
/>);

let persistor = persistStore(store)

const Root = () => (
  <Provider store={store} persistor={persistor}>
    <Router>
      <div>
        <Route exact path="/" render={renderFn(App)} />
        <Route path="/login" render={renderFn(Login)} />
        <Route path="/signup" render={renderFn(SignUp)} />
        <Route path="/tweets" render={renderFn(Tweets)} />
        <Route path="/tweet/:id" render={renderFn(SingleTweets)} />
      </div>
    </Router>
  </Provider>
);

ReactDOM.render(
  <Root />,
  document.getElementById('root')
);
