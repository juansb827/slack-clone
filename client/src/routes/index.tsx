import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Home from './Home';
import Register from './Register';
import Login from './Login';
import { CreateTeam } from './CreateTeam';
import { isAuthenticated } from '../common/auth.utils';
import { ViewTeam } from './ViewTeam';

export default (): any => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/register" exact component={Register} />
                <Route path="/login" exact component={Login} />
                <Route path="/view-team" exact component={ViewTeam} />
                <PrivateRoute path="/create-team" exact component={CreateTeam} />
            </Switch>
        </BrowserRouter>
    );
};

const PrivateRoute = ({component: Component, ...rest }) => (
    <Route 
        {...rest}
        render={props => 
            isAuthenticated() ? <Component {...props} /> : (
                <Redirect to={{ pathname: '/login' }}  />
            ) 
        } 
    />
);