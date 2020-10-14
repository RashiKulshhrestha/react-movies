import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "../auth/Login";
import Register from "../auth/Register";

export const Routes = () => {
    return(
        <section>
            <Switch>
                <Route exact path="/login" component={Login}></Route>
                <Route exact path="/register" component={Register}></Route>
            </Switch>
        </section>
    );
};