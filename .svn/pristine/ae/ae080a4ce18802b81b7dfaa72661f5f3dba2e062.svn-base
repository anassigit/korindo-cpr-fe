import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { ReactSession } from 'react-client-session';

const currentURL = window.location.href;

const Authmiddleware = ({
  component: Component,
  layout: Layout,
  isAuthProtected,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => {
      const queryParameters = new URLSearchParams(window.location.search);
      const korToken = queryParameters.get("KOR_TOKEN");

      if (korToken && localStorage.getItem("authUser") !== korToken) {
        localStorage.setItem('authUser', korToken);
        ReactSession.set('isAuth', true);
        // Use history.push('/') instead of window.location.replace('/') to keep React Router in control
        props.history.replace('/home');
      }


      if (isAuthProtected && !localStorage.getItem("authUser")) {
        if (!currentURL.endsWith('/login')) {
          if (!localStorage.getItem("I18N_LANGUAGE")) {
            localStorage.setItem("I18N_LANGUAGE", "kor");
          }
          localStorage.setItem("currentURL", currentURL);
        }
        return (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        );
      } else if (currentURL.endsWith('/login') && localStorage.getItem("authUser")) {
        return (
          <Redirect
            to={{ pathname: "/home", state: { from: props.location } }}
          />
        );
      }

      return (
        <Layout>
          <Component {...props} />
        </Layout>
      );
    }}
  />
);

Authmiddleware.propTypes = {
  isAuthProtected: PropTypes.bool,
  component: PropTypes.any,
  location: PropTypes.object,
  layout: PropTypes.any,
  history: PropTypes.any,
};

export default Authmiddleware;
