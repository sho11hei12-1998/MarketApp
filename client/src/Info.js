import React from "react";
import MarketApp from "./MarketApp.json";
import getWeb3 from "./getWeb3";

class Info extends React.Component {
  state = {
    web3: null,
    accounts: null,
    contract: null,
    name: null,
    email: null,
    address: "",
    outputName: null,
    outputEmail: null,
  };
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
      alert("記録が完了しました");
    }
  };

  // アカウント情報の読み込み
  viewRecord = async () => {
    const { contract, address } = this.state;
    const result = await contract.methods.viewAccount(address).call();
    console.log(result);
    const outputName = result[0];
    const outputEmail = result[1];
    this.setState({ outputName, outputEmail });
  };

  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    return (
      <div className="Info">
        <input onChange={this.handleChange("name")} placeholder="Nameを入力" />
        <input
          onChange={this.handleChange("email")}
          placeholder="Emailを入力"
        />
        <button onClick={this.writeRecord}>記録</button>

        <br />
        <br />

        <input
          onChange={this.handleChange("address")}
          placeholder="addressを入力"
        />
        <button onClick={this.viewRecord}>閲覧</button>

        <br />
        <br />

        {this.state.outputName ? <p>Name: {this.state.outputName}</p> : <p></p>}
        {this.state.outputEmail ? (
          <p>Email: {this.state.outputEmail}</p>
        ) : (
          <p></p>
        )}
      </div>
    );
  }
}

export default Info;
