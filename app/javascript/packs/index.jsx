import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import AddChild from '../components/AddChild'
import Login from '../components/Login'
import Logout from '../components/Logout'
import ParentDashboard from '../components/ParentDashboard'
import ChildDashboard from '../components/ChildDashboard'
import Signup from '../components/Signup'
import Health from '../components/Health'
import Daily from '../components/Daily'
import Learn from '../components/Learn'
import ChildInfo from '../components/ChildInfo'



document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <BrowserRouter>
      <Switch>

        <Route exact path="/parent-login" render={props => <Login usertype="parent"/>}/>
        <Route exact path="/child-login" render={props => <Login usertype="child"/>} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/logout" component={Logout} />

        <Route exact path="/child-info" component={ChildInfo} />
        <Route exact path="/add-child" component={AddChild} />
        <Route exact path="/parent-dashboard" component={ParentDashboard} />
        
        <Route exact path="/child-dashboard" component={ChildDashboard} />
        <Route exact path="/healthfitness" component={Health} />
        <Route exact path="/learncreate" component={Learn} />
        <Route exact path="/dailyhabit" component={Daily} />

      </Switch>
    </BrowserRouter>,
    document.getElementById('root')
    // document.body.appendChild(document.createElement('div')),
  )
})
