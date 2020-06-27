import React from "react";
import "./styles.css";
import Cards from "./layout/cards";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import PostPage from "./layout/postPage";
import { TitleComponent } from "./layout/title";

export default function App() {
  return (
    <React.Fragment>
      <TitleComponent />
      <div
        className="App"
        style={{ maxWidth: "1000px", marginLeft: "auto", marginRight: "auto" }}
      >
        <Router>
          <Link style={{ textDecoration: "none", color: "black" }} to="/">
            <h1>Innovative Breast</h1>
          </Link>
          <p>Best Content About Tech!</p>
          <Switch>
            <Route path="/post/:id">
              <PostPage />
            </Route>
            <Route path="/">
              <Cards />
            </Route>
          </Switch>
        </Router>
      </div>
    </React.Fragment>
  );
}
