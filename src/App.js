import "./App.css";
import Layout from "./Layout/Layout";
import { Route, Switch, withRouter } from "react-router-dom";
import React, { Suspense } from "react";

const AES = React.lazy(() => {
  return import("./containers/CipherFunctions/AES/AES");
});

const SHA256 = React.lazy(() => {
  return import("./containers/HashFunctions/SHA256/SHA256");
});

function App() {
  let routes = (
    <Switch>
      <Route path="/AES" render={(props) => <AES {...props} />} />
      <Route path="/SHA256" render={(props) => <SHA256 {...props} />} />
    </Switch>
  );

  return (
    <div className="App">
      <Layout>
        <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
      </Layout>
    </div>
  );
}

export default withRouter(App);