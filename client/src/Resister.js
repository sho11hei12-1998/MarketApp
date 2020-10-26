import React from "react";
import MarketApp from "./MarketApp.json";
import getWeb3 from "./getWeb3";

import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

class Resister extends React.Component {


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

  // アカウント情報の登録
  writeRecord = async () => {
    const { accounts, contract, name, email } = this.state;
    const result = await contract.methods.registerAccount(name, email).send({
      from: accounts[0],
    });
    console.log(result);

    if (result.status === true) {
      alert("会員登録が完了しました");
    }
    // トランザクション完了後、ページリロード
    window.location.reload();
  };

  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    return (
      <div className="Resister">
        <input onChange={this.handleChange("name")} placeholder="Nameを入力" />
        <input
          onChange={this.handleChange("email")}
          placeholder="Emailを入力"
        />
        <Button variant="primary" onClick={this.writeRecord}>会員登録</Button>
      </div>
    );
  }
}

export default Resister;
