import React from "react";
import { HashRouter, Route, Link, Switch } from "react-router-dom";

import Main from "./Main";
import Sell from "./Sell";
import Resister from "./Resister";
import Info from "./Info";

class Header extends React.Component {
  page_transition() {
    document.location.reload()
  }
  render() {
    return (
      <div className="header">
        <div className="header-logo">
          <h1>BcMarket</h1>
        </div>

        <HashRouter>
          <div className="header-nav">
            <ul onClick={this.page_transition}>
              <li>
                <Link to="/home">ホーム</Link>
              </li>
              <li>
                <Link to="/sell">出品する</Link>
              </li>
              <li>
                <Link to="/resister">新規会員登録</Link>
              </li>
              <li>
                <Link to="/info">会員情報検索</Link>
              </li>
            </ul>

            <hr />

            <Switch>
              <Route exact path="/home" component={Main} />
              <Route path="/sell" component={Sell} />
              <Route path="/resister" component={Resister} />
              <Route path="/info" component={Info} />
            </Switch>
          </div>
        </HashRouter>
      </div>
    );
  }
}

export default Header;
