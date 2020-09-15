import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import AppHeader from './components/header/Header';
import Navigation from './containers/navigation/Navigation';
import AppFooter from './components/footer/Footer';
import './App.css';
import Home from './components/home/Home';
import UnderConstruction from './components/home/UnderConstruction';
import MemberSignUps from './containers/members/MemberSignUps';
import MemberCardsStream from './containers/members/MemberCardsStream';
import DailyOrders from './containers/orders/DailyOrders';
import WeeklyOrders from './containers/orders/WeeklyOrders';
import MonthlyOrders from './containers/orders/MonthlyOrders';
import AllOrders from './containers/orders/AllOrders';
import Login from './containers/security/Login';
import TopBirthdayCardsContainer from './containers/orders/TopBirthdayCardsContainer';
import TopChristmasCardsContainer from './containers/orders/TopChristmasCardsContainer';
import TopLeavingCardsContainer from './containers/orders/TopLeavingCardsContainer';
import TopMaternityCardsContainer from './containers/orders/TopMaternityCardsContainer';
import TopNewBabyCardsContainer from './containers/orders/TopNewBabyCardsContainer';
import TopNewDaddyCardsContainer from './containers/orders/TopNewDaddyCardsContainer';
import TopNewWelcomeCardsContainer from './containers/orders/TopNewWelcomeCardsContainer';
import ReportingContainer from './containers/analytics/Reporting';

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

                <Route path='/orders/card-stream' exact component={MemberCardsStream} />
                <Route path='/orders/daily' exact component={DailyOrders} />
                <Route path='/orders/weekly' exact component={WeeklyOrders} />
                <Route path='/orders/monthly' exact component={MonthlyOrders} />
                <Route path='/orders/alltime' exact component={AllOrders} />

                <Route path='/orders/top10/leaving' exact component={TopLeavingCardsContainer} />
                <Route path='/orders/top10/birthday' exact component={TopBirthdayCardsContainer} />
                <Route path='/orders/top10/maternity' exact component={TopMaternityCardsContainer} />
                <Route path='/orders/top10/new-baby' exact component={TopNewBabyCardsContainer} />
                <Route path='/orders/top10/new-daddy' exact component={TopNewDaddyCardsContainer} />
                <Route path='/orders/top10/welcome' exact component={TopNewWelcomeCardsContainer} />
                <Route path='/orders/top10/christmas' exact component={TopChristmasCardsContainer} />

                <Route path='/analytics/reports' exact component={ReportingContainer} />
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
