import React from 'react';
import {BrowserRouter , Switch, Route, Redirect} from 'react-router-dom';
import AppHeader from './components/header/Header';
import Navigation from './containers/NavigationContainer';
import AppFooter from './components/footer/Footer';
import './App.css';
import Home from './components/home/Home';
import Members from './components/members/Members';
import Orders from './components/orders/Orders';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <AppHeader />
        <div className='AppBody'>
          <Navigation />
          <div className='AppMainSection'>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/members/path1" exact component={Members}/>
                <Route path="/members/path2" exact component={Members}/>
                <Route path="/orders/path1" exact component={Orders}/>
                <Route path="/orders/path2" exact component={Orders}/>
                <Redirect to="/" />
            </Switch>
          </div>
        </div>
        <AppFooter />
      </div>
    </BrowserRouter>
  )
}

export default App;
