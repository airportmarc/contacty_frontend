import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'

import TopNav from '../Components/Nav';
import Dashboard from './Dashboard/dashboard';
import Detail from './Detail/Detail';




class App extends Component {
  render() {
    return (
      <div id="wrapper">
        <div id="page-wrapper" className="gray-bg">
          <TopNav />
          <div className="wrapper wrapper-content">
            <div className="container">
              <Switch>
                <Route exact path='/' component={Dashboard} />
                <Route exact path='/detail/:number' render={(routeProps)=> <Detail {...routeProps} />} />
              </Switch>
            </div>
          </div>
          <div className="footer"></div>
        </div>
      </div>
    );
  }
}

export default App;
