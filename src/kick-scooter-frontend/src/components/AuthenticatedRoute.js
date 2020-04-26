import React from "react";
import {Redirect, Route} from "react-router-dom";

const AuthenticatedRoute = ({children, ...rest}) => (
    <Route
        {...rest}
        render={props =>
            localStorage.getItem('jwtToken') ? (
                children
            ) : (
                <Redirect to={{
                    pathname: "/sign-in",
                    state: {from: rest.location}
                }}
                />
            )
        }
    />
);

export default AuthenticatedRoute;