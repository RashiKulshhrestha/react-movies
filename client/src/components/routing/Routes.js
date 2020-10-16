import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Dashboard from "../dashboard/dashboard";

export const Routes = () => {
    return(
        <section>
            <Switch>
                <Route exact path="/login" component={Login}></Route>
                <Route exact path="/register" component={Register}></Route>
                <Route exact path ="/dashboard" component={Dashboard}></Route>
            </Switch>
        </section>
    );
};