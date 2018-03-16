import React, { Component } from 'react';
import { store } from './redux/store';
import {Provider} from 'react-redux'
import Login from './components/Login'
import Header from './components/Header'
import { persistStore } from 'redux-persist'

class App extends Component{

  componentWillMount() {
    this.props.history.push('/login')
  }

  render() {
    let persistor = persistStore(store)
    return(
      <Provider store={store} persistor={persistor}>
        <div>
          <Header />
          <div>
            <Login />
          </div>
        </div>
      </Provider>
    )
  }
}

export default App
