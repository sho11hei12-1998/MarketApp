import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";

import Main from "./Main";
import Sell from "./Sell";
import Resister from "./Resister";
import Info from "./Info";
import GetEth from "./GetEth";
import Mypage from "./Mypage";

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
        <HashRouter>
          <Nav id="header-logo" className="justify-content-center mt-4 mb-4" onClick={this.page_transition}>
            <Nav.Item>
              <LinkContainer to="/home">
                <Nav.Link ><h1 className="text-dark">BcMarket</h1></Nav.Link>
              </LinkContainer>
            </Nav.Item>
          </Nav>

          <Nav className="justify-content-center" activeKey="/home" onClick={this.page_transition}>
            <Nav.Item>
              <LinkContainer to="/home" eventKey="/home">
                <Nav.Link href="/home">ホーム</Nav.Link>
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

            <Nav.Item>
              <LinkContainer to="/geteth">
                <Nav.Link>Eth還元キャンペーン</Nav.Link>
              </LinkContainer>
            </Nav.Item>

            <Nav.Item>
              <LinkContainer to="/mypage">
                <Nav.Link>マイページ</Nav.Link>
              </LinkContainer>
            </Nav.Item>
          </Nav>

          <hr />

          <Switch>
            <Route exact path="/home" component={Main} />
            <Route path="/sell" component={Sell} />
            <Route path="/resister" component={Resister} />
            <Route path="/info" component={Info} />
            <Route path="/geteth" component={GetEth} />
            <Route path="/mypage" component={Mypage} />
          </Switch>

        </HashRouter>
      </div>
    );
  }
}

export default Header;
