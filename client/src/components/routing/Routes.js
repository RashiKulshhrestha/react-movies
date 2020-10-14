import React from "react";
import { Route, Switch } from "react-router-dom";
import UserLogin from "../auth/Login";
import Alert from "../layout/Alert";

export const Routes = () => {
    return(
        <section>
            <Alert />
            <Switch>
                <Route exact path="/register" component={UserRegister}></Route>
                <Route exact path="/login" component={UserLogin}></Route>
                <Route component={NotFound} />
            </Switch>
        </section>
    );
};