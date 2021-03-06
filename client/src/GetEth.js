import React from "react";
import MarketApp from "./MarketApp.json";
import getWeb3 from "./getWeb3";

import { Row, Col, Button } from "react-bootstrap"; // 
import "bootstrap/dist/css/bootstrap.min.css"; // 

class GetEth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      web3: null,
      accounts: null,
      contract: null,
      total_entry: 0,
      total_price: 0,
      total_price_status: true,
      entry_condition1: 0,
      entry_condition2: false,
      message: null,
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

    // 応募総数と集まったEthの総数を読み込む
    var total_entry = await contract.methods.total_entry().call();
    var price = await contract.methods.bonus_eth().call();
    var total_price = price / 10 ** 18;
    this.setState({ total_entry, total_price });

    // 合計Ethが１Eth以上なら抽選が可能
    if (total_price >= 1) {
      this.setState({ total_price_status: false });
    }

    // エントリー参加の条件を満たしているかを確認
    const result = await contract.methods.view_eth_acc(accounts[0]).call();
    const entry_condition1 = result[0];
    const entry_condition2 = result[1];
    this.setState({ entry_condition1, entry_condition2 });

    if (entry_condition2 === true) {
      this.setState({ message: '現在あなたはエントリー済みです' });
    }
    else if (entry_condition2 === false) {
      this.setState({ message: '現在あなたはエントリーしていません' });
    }
  };

  // エントリーをするための関数
  entry_button = async () => {
    const { contract, accounts, entry_condition1 } = this.state;
    console.log(contract);

    if (entry_condition1 >= 1) {
      const result = await contract.methods.entry_get_eth().send({
        from: accounts[0],
      });
      console.log(result);

      if (result.status === true) {
        alert("エントリーが完了しました");
      }
    }
    else {
      alert('エントリー条件が満たされていません。')
    }

    // トランザクション完了後、ページリロード
    document.location.reload()
  };

  // 当選者を決める関数
  prizewinner = async () => {
    const { contract, accounts } = this.state;
    console.log(contract);

    const result = await contract.methods.get_eth().send({
      from: accounts[0],
    });

    console.log(result);

    if (result.status === true) {
      alert("当選者が決まりました。当選者にEthが送金されました。");
    }
    // トランザクション完了後、ページリロード
    document.location.reload()
  };

  render() {
    return (
      <div id="geteth">
        <Row className="mx-4">
          <Col xs={{ span: 12 }} className="text-center">

            <div className="my-5">
              <h1>現在のEthの合計: {this.state.total_price}(Eth)</h1>
              <p className="text-muted">1Ethに達すると抽選を行います。当選者には上記の全てのEthが送金されます。</p>
            </div>

            <h3>＜エントリー条件＞</h3>
            <p>・取引回数が1回以上</p>

            <div>
              <Button variant="primary" type="submit" size="lg"
                onClick={this.entry_button}
                disabled={this.state.try_condition2}
                className="my-4">
                今すぐエントリー
              </Button>
              <p>現在の総エントリー数: {this.state.total_entry}人</p>
            </div>

            <p className="text-muted">エントリー状況: {this.state.message}</p>

            <Button className="mt-4" variant="primary" type="submit"
              onClick={this.prizewinner}
              disabled={this.state.total_price_status}>
              当選者を発表
            </Button>


          </Col>
        </Row>
      </div >
    );
  }
}

export default GetEth;


