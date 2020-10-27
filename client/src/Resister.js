import React from "react";
import MarketApp from "./MarketApp.json";
import getWeb3 from "./getWeb3";

import { Button, Form, Modal } from "react-bootstrap";
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

      show: false,
    };
  }

  // モーダル設定
  handleClose = async () => {
    await this.setState({ show: false });

    // ページリロード
    document.location.reload();
  }
  handleShow = async () => this.setState({ show: true });

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
      this.handleShow();
    }
  };

  handleChange = (name) => (event) => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    return (
      <div id="Resister">
        <Form className="justify-content-center">
          <Form.Group>
            <Form.Label>Your Name</Form.Label>
            <Form.Control type="name" onChange={this.handleChange("name")} placeholder="Enter Name" />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Password" onChange={this.handleChange("email")}
              placeholder="name@example.com" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Button variant="primary" type="submit" onClick={this.writeRecord}>
            会員登録
          </Button>

          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Wellcome to BcMarket!!</Modal.Title>
            </Modal.Header>
            <Modal.Body>会員登録が完了しました。</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
            </Button>
            </Modal.Footer>
          </Modal>
        </Form>
      </div>
    );
  }
}

export default Resister;


