import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import AppHeader from './components/header/Header';
import Navigation from './containers/navigation/Navigation';
import AppFooter from './components/footer/Footer';
import './App.css';
import Home from './components/home/Home';
import MemberSignUps from './containers/members/MemberSignUps';
import DailyOrders from './containers/orders/DailyOrders';
import WeeklyOrders from './containers/orders/WeeklyOrders';
import MonthlyOrders from './containers/orders/MonthlyOrders';
import AllOrders from './containers/orders/AllOrders';
import Revenue from './containers/revenue/Revenue';
import Login from './containers/security/Login';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <AppHeader />
        <div className='AppBody'>
          <Login />
          <Navigation />
          <div className='AppMainSection'>
            <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/members/signups' exact component={MemberSignUps} />
                <Route path='/orders/daily' exact component={DailyOrders} />
                <Route path='/orders/history/weekly' exact component={WeeklyOrders} />
                <Route path='/orders/history/monthly' exact component={MonthlyOrders} />
                <Route path='/orders/history/alltime' exact component={AllOrders} />
                <Route path='/orders/history/top10/birthday' exact component={Home} />
                <Route path='/orders/history/top10/leaving' exact component={Home} />
                <Route path='/discount/outstanding' exact component={Home} />
                <Route path='/discount/claimed' exact component={Home} />
                <Route path='/discount/claimed-times' exact component={Home} />
                <Route path='/analytics/aquisition-cost' exact component={Home} />
                <Route path='/revenue/report' exact component={Revenue} />
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
