import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import AppHeader from './components/header/Header';
import Navigation from './containers/navigation/NavigationContainer';
import AppFooter from './components/footer/Footer';
import './App.css';
import Home from './components/home/Home';
import Members from './components/members/Members';
import Orders from './components/orders/Orders';
import Revenue from './components/revenue/Revenue';


function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <AppHeader />
        <div className='AppBody'>
          <Navigation />
          <div className='AppMainSection'>
            <Switch>
                <Route path='/' exact component={Home}/>
                <Route path='/members' exact component={Members}/>
                <Route path='/orders/todays' exact component={Orders}/>
                <Route path='/orders/history' exact component={Orders}/>
                <Route path='/revenue/report' exact component={Revenue}/>
                <Redirect to='/' />
            </Switch>
          </div>
        </div>
        <AppFooter />
      </div>
    </BrowserRouter>
  )
}

export default App;
