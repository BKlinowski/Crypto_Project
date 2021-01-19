import "./App.css";
import Layout from "./Layout/Layout";
import { Route, Switch, withRouter } from "react-router-dom";
import React, { Suspense } from "react";

const AES = React.lazy(() => {
  return import("./containers/CipherFunctions/AES/AES");
});

const RSA = React.lazy(() => {
  return import("./containers/CipherFunctions/RSA/RSA");
});

const SHA256 = React.lazy(() => {
  return import("./containers/HashFunctions/SHA256/SHA256");
});

const Camellia = React.lazy(() => {
  return import("./containers/CipherFunctions/Camellia/Camellia");
});

const Chacha20 = React.lazy(() => {
  return import("./containers/CipherFunctions/Chacha20/Chacha20");
});

const BlowFish = React.lazy(() => {
  return import("./containers/CipherFunctions/BlowFish/BlowFish");
});
const MD5 = React.lazy(() => {
  return import("./containers/HashFunctions/md5/md5");
});

function App() {
  let routes = (
    <Switch>
      <Route path="/AES" render={(props) => <AES {...props} />} />
      <Route path="/RSA" render={(props) => <RSA {...props} />} />
      <Route path="/SHA256" render={(props) => <SHA256 {...props} />} />
      <Route path="/Camellia" render={(props) => <Camellia {...props} />} />
      <Route path="/Chacha20" render={(props) => <Chacha20 {...props} />} />
      <Route path="/BlowFish" render={(props) => <BlowFish {...props} />} />
      <Route path="/MD5" render={(props) => <MD5 {...props} />} />
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
