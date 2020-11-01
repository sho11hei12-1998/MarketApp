import React from "react";
import MarketApp from "./MarketApp.json";
import getWeb3 from "./getWeb3";
import Simple_ItemCard from "./Simple_ItemCard";

import { Row, Col, Card, CardDeck, Badge, Button, Form, Nav, Tabs, Tab } from "react-bootstrap"; // 
import "bootstrap/dist/css/bootstrap.min.css"; // 

class Mypage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      web3: null,
      accounts: null,
      contract: null,

      _numItems: 0, //出品されている商品数
      // ブロックチェーンの情報を記入
      lines: [],

      outputName: null,
      outputEmail: null,
      outputNumTransactions: 0,
      outputReputations: 0,
      outputNumSell: 0,
    };
  }

  componentDidMount = async () => {
    try {
      const web3 = await getWeb3();

      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = MarketApp.networks[networkId];
      const instance = new web3.eth.Contract(
        MarketApp.abi,
        deployedNetwork && deployedNetwork.address
      );

      this.setState({ web3, accounts, contract: instance });
    } catch (error) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }

    const { accounts, contract } = this.state;

    console.log(accounts);

    // アカウント情報の読み込み
    const result1 = await contract.methods.viewAccount(accounts[0]).call();
    const result2 = await contract.methods.viewAccount_Transaction(accounts[0]).call();
    console.log(result1);
    console.log(result2);
    const outputName = result1[0];
    const outputEmail = result1[1];
    const outputNumTransactions = result2[0];
    const outputReputations = result2[1];
    const outputNumSell = result2[2];
    this.setState({ outputName, outputEmail });
    this.setState({ outputNumTransactions, outputReputations, outputNumSell });

    // 1.出品されている商品数を取得する
    var num = await contract.methods.numItems().call();
    this.setState({ _numItems: num });

    const { _numItems } = this.state;
    for (var idx = 0; idx < _numItems; idx++) {
      const item = await contract.methods.items(idx).call();
      const image = await contract.methods.images(idx).call();
      console.log(item);
      this.state.lines.push({
        item,
        image,
      });
      this.setState(this.state.lines);
    }
    console.log(this.state.lines);
  };

  render() {
    // 出品した商品を表示させる
    const card_1 = this.state.lines.map((block, i) => {

      // 商品状態の確認，true⇒売切れ，false⇒出品中に表示を変更する
      var goods_status_text = "";

      if (this.state.lines[i].item[11] === true) {
        goods_status_text = "売切れ×";
      } else {
        goods_status_text = "出品中";
      }

      if (this.state.lines[i].item[0] === this.state.accounts[0]) {
        return (
          <Simple_ItemCard
            {...block}
            key={i}
            num={Number(i)}
            image={this.state.lines[i].image[0]}
            name={this.state.lines[i].item[3]}
            price={this.state.lines[i].item[5]}
            introduction={this.state.lines[i].item[4]}
            goods_status={goods_status_text}
            seller={this.state.lines[i].item[2]}
            buyer_addr={this.state.lines[i].item[1]}

          />
        );
      }
    });

    // 購入した商品を表示させる
    const card_2 = this.state.lines.map((block, i) => {

      // 商品状態の確認，true⇒売切れ，false⇒出品中に表示を変更する
      var goods_status_text = "";

      if (this.state.lines[i].item[11] === true) {
        goods_status_text = "売切れ×";
      } else {
        goods_status_text = "出品中";
      }

      if (this.state.lines[i].item[1] === this.state.accounts[0]) {
        return (
          <Simple_ItemCard
            {...block}
            key={i}
            num={Number(i)}
            image={this.state.lines[i].image[0]}
            name={this.state.lines[i].item[3]}
            price={this.state.lines[i].item[5]}
            introduction={this.state.lines[i].item[4]}
            goods_status={goods_status_text}
            seller={this.state.lines[i].item[2]}
            buyer_addr={this.state.lines[i].item[1]}

          />
        );
      }
    });

    return (
      <div id="Mypage">
        <Row>
          <Col md={{ span: 4, offset: 4 }}>
            <p>Name: {this.state.outputName}</p>
            <p>Address: {this.state.accounts}</p>
            <p>取引回数: {this.state.outputNumTransactions}</p>
            <p>評価: {this.state.outputReputations}</p>
            <p>出品数: {this.state.outputNumSell}</p>
          </Col>
        </Row>

        <br />

        <Row>
          <Col>
            <Tabs
              defaultActiveKey="card_1"
              id="uncontrolled-tab-example"
              className="justify-content-center">

              <Tab eventKey="card_1" title="出品した商品">
                <CardDeck className="justify-content-center mt-4">
                  {/* カード代入 */}
                  {card_1}
                </CardDeck>
              </Tab>
              <Tab eventKey="card_2" title="購入した商品">
                <CardDeck className="justify-content-center mt-4">
                  {/* カード代入 */}
                  {card_2}
                </CardDeck>
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Mypage;


