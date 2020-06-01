import React from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import AppHeader from './components/header/Header';
import Navigation from "./components/navigation/Navigation";
import AppFooter from './components/footer/Footer';
import './App.css';
import Members from "./components/members/Members";
import Orders from "./components/orders/Orders";

function App() {
  return (
    <Router history={createBrowserHistory()}>
      <div className="App">
        <AppHeader />
        <div className='AppBody'>
          <Navigation />
          <div className='AppMainSection'>
            <Switch>
                <Route path="/" exact component={Members}/>
                <Route path="/members" exact component={Members}/>
                <Route path="/orders" exact component={Orders}/>
                <Redirect to="/" />
            </Switch>
          </div>
        </div>
        <AppFooter />
      </div>
    </Router>
  )
}

export default App;
