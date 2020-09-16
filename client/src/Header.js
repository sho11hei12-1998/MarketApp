import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";

import Main from "./Main";
import Sell from "./Sell";
import Resister from "./Resister";
import Info from "./Info";

class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <div className="header-logo">
          <h1>BcMarket</h1>
        </div>

        <BrowserRouter>
          <div className="header-nav">
            <ul>
              <li>
                <Link to="/">ホーム</Link>
              </li>
              <li>
                <Link to="/sell">出品する</Link>
              </li>
              <li>
                <Link to="/resister">会員登録</Link>
              </li>
              <li>
                <Link to="/info">会員情報検索</Link>
              </li>
            </ul>

            <hr />

            <Route exact path="/" component={Main} />
            <Route path="/sell" component={Sell} />
            <Route path="/resister" component={Resister} />
            <Route path="/info" component={Info} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default Header;
