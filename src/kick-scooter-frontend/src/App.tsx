import React from 'react';
import SignUp from "./components/SignUp";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import SignIn from "./components/SignIn";
import Greeting from "./components/Greeting";
import ToolBar from "./components/ToolBar";
import MapComponent from "./components/MapComponent";
import TripButton from "./components/TripButton";
import AccountActivation from "./components/AccountActivation";
import WrongPath from "./components/WrongPath";
import setAuthorizationToken from "./utils/setAuthorizationToken";
import AuthenticatedRoute from "./components/AuthenticatedRoute";

setAuthorizationToken(localStorage.jwtToken);

function App() {
    return (
        <Router>
            <Switch>
                <AuthenticatedRoute exact path="/">
                    <ToolBar/>
                    <MapComponent/>
                    <TripButton/>
                </AuthenticatedRoute>
                <Route exact path="/sign-in" component={SignIn}/>
                <Route exact path="/sign-up" component={SignUp}/>
                <Route exact path="/greeting" component={Greeting}/>
                <Route exact path="/activation/:token" component={AccountActivation}/>
                <Route component={WrongPath}/>
            </Switch>
        </Router>
    );
}

export default App;
