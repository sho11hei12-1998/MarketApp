import React from "react";
import MarketApp from "./MarketApp.json";
import getWeb3 from "./getWeb3";

import { Button } from "react-bootstrap"; // 
import "bootstrap/dist/css/bootstrap.min.css"; // 

class Sell extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      web3: null,
      accounts: null,
      contract: null,
      itemName: null,
      description: null,
      price: null,
      googleDocID: "",
      file: "",
      ipfsHash: "",
      address: "",
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

  // 出品する関数
  sellItem = async () => {
    const {
      accounts,
      contract,
      itemName,
      description,
      price,
      googleDocID,
      ipfsHash,
    } = this.state;

    const result = await contract.methods
      .sell(itemName, description, price, googleDocID, ipfsHash)
      .send({
        from: accounts[0],
      });
    console.log(result);

    if (result.status === true) {
      alert("出品が完了しました");
    }
    // トランザクション完了後、ページリロード
    document.location.reload()
  };

  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    return (
      <div className="Sell">
        <form className="form-group">
          <label>商品名を入力して下さい。</label>
          <br />
          <input
            onChange={this.handleChange("itemName")}
            placeholder="商品名を入力"
          />
        </form>

        <br />

        <form className="form-group">
          <label>商品説明を入力して下さい。</label>
          <br />
          <textarea
            onChange={this.handleChange("description")}
            placeholder="商品説明を入力"
            rows="3"
          />
        </form>

        <br />

        <form className="form-group">
          <label>商品価格（wei）を入力して下さい。</label>
          <br />
          <input
            onChange={this.handleChange("price")}
            placeholder="商品価格を入力"
          />
        </form>

        <br />

        <form className="form-group">
          <label>
            Googleドライブにアップロードした商品画像のファイルIDを入力して下さい。
          </label>
          <br />
          <input
            onChange={this.handleChange("googleDocID")}
            placeholder="ファイルIDを入力"
          />
        </form>

        {/* 出品するコントラクトを呼び出すボタンを配置する */}
        <p>
          <Button variant="primary" onClick={this.sellItem} className="btn btn-default">
            出品
          </Button>
        </p>
      </div>
    );
  }
}

export default Sell;
