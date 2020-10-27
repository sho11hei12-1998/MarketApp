import React from "react";
import MarketApp from "./MarketApp.json";
import getWeb3 from "./getWeb3";

import { Button, Form } from "react-bootstrap"; // 
import "bootstrap/dist/css/bootstrap.min.css"; // 

class Info extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      web3: null,
      accounts: null,
      contract: null,
      name: null,
      email: null,
      address: "",
      outputName: null,
      outputEmail: null,
      outputNumTransactions: 0,
      outputReputations: 0,
      outputNumSell: 0,
      outputNumBuy: 0,
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
  };

  // アカウント情報の読み込み
  viewRecord = async () => {
    const { contract, address } = this.state;
    console.log(contract);

    const result1 = await contract.methods.viewAccount(address).call();
    const result2 = await contract.methods.viewAccount_Transaction(address).call();
    console.log(result1);
    console.log(result2);
    const outputName = result1[0];
    const outputEmail = result1[1];
    const outputNumTransactions = result2[0];
    const outputReputations = result2[1];
    const outputNumSell = result2[2];
    const outputNumBuy = result2[3];
    this.setState({ outputName, outputEmail });
    this.setState({ outputNumTransactions, outputReputations, outputNumSell, outputNumBuy });
  };

  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    return (
      <div id="Info">
        <Form className="justify-content-center">
          <Form.Group controlId="formBasicEmail">
            <Form.Label>検索したいアドレスを入力してください。</Form.Label>
            <Form.Control onChange={this.handleChange("address")}
              placeholder="Search" />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={this.viewRecord}>
            閲覧
          </Button>
        </Form>

        <br />
        <br />

        {this.state.outputName ? <p>Name: {this.state.outputName}</p> : <p></p>}
        {this.state.outputEmail ? (
          <p>Email: {this.state.outputEmail}</p>
        ) : (
            <p></p>
          )}
        {this.state.outputNumTransactions ? <p>取引回数: {this.state.outputNumTransactions}</p> : <p></p>}
        {this.state.outputReputations ? <p>評価: {this.state.outputReputations}</p> : <p></p>}
        {this.state.outputNumSell ? <p>出品回数: {this.state.outputNumSell}</p> : <p></p>}
        {this.state.outputNumBuy ? <p>購入回数: {this.state.outputNumBuy}</p> : <p></p>}
      </div>
    );
  }
}

export default Info;


