import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import AppHeader from './components/header/Header';
import Navigation from './containers/navigation/Navigation';
import AppFooter from './components/footer/Footer';
import './App.css';
import Home from './components/home/Home';
import MemberSignUps from './containers/members/MemberSignUps';
import Orders from './components/orders/Orders';
import Revenue from './containers/revenue/Revenue';


function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <AppHeader />
        <div className='AppBody'>
          <Navigation />
          <div className='AppMainSection'>
            <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/members/signups' exact component={MemberSignUps} />
                <Route path='/members/signups-chart' exact component={MemberSignUps} />
                <Route path='/orders/daily' exact component={Orders} />
                <Route path='/orders/history/weekly' exact component={Orders} />
                <Route path='/orders/history/monthly' exact component={Orders} />
                <Route path='/orders/history/alltime' exact component={Orders} />
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
