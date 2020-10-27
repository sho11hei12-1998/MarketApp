import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";

import Main from "./Main";
import Sell from "./Sell";
import Resister from "./Resister";
import Info from "./Info";

import { Nav } from "react-bootstrap"; // 
import "bootstrap/dist/css/bootstrap.min.css"; // 
import { LinkContainer } from 'react-router-bootstrap';

class Header extends React.Component {
  page_transition() {
    document.location.reload()
  }
  render() {
    return (
      <div id="header">
        <div id="header-logo">
          <h1 className="text-center mt-4 mb-4">BcMarket</h1>
        </div>

        <HashRouter>
          <Nav className="justify-content-center" activeKey="/home" onClick={this.page_transition}>
            <Nav.Item>
              <LinkContainer to="/home">
                <Nav.Link >ホーム</Nav.Link>
              </LinkContainer>
            </Nav.Item>

            <Nav.Item >
              <LinkContainer to="/sell">
                <Nav.Link >出品する</Nav.Link>
              </LinkContainer>
            </Nav.Item>

            <Nav.Item>
              <LinkContainer to="/resister">
                <Nav.Link>新規会員登録</Nav.Link>
              </LinkContainer>
            </Nav.Item>

            <Nav.Item>
              <LinkContainer to="/info">
                <Nav.Link>会員情報検索</Nav.Link>
              </LinkContainer>
            </Nav.Item>
          </Nav>

          <hr />

          <Switch>
            <Route exact path="/home" component={Main} />
            <Route path="/sell" component={Sell} />
            <Route path="/resister" component={Resister} />
            <Route path="/info" component={Info} />
          </Switch>

        </HashRouter>
      </div>
    );
  }
}

export default Header;
