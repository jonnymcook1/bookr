import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Landing from './Components/Landing/Landing'
import Login from './Components/Header/Login';
import Registration from './Components/Registration/Registration'
import Dashboard from './Components/ArtistDashboard/Dashboard'
import ArtistForm from './Components/Registration/ArtistForm';
import Profile from './Components/Profile/Profile';

export default (
    <Switch>
        <Route exact path='/' component={Landing}/>
        <Route path='/login' component={Login} />
        <Route path='/register' component={Registration} />
        <Route path='/artist/form/:id' component={ArtistForm}  />
        <Route path='/dashboard/:id' component={Dashboard} />
        <Route path='/artist/:id' component={Profile} />
    </Switch>
)