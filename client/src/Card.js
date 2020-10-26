import React from "react";
import { Button } from "react-bootstrap"; // 
import "bootstrap/dist/css/bootstrap.min.css"; // 


class Card extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      sellerValue: 1,
      buyerValue: 1,
    };
  }

  // 評価値をステートにセットする
  handleChange_1 = (event) => {
    this.setState({ sellerValue: Number(event.target.value) });
    console.log('選択中のvalue値:' + event.target.value);

    //親コンポーネントを更新
    this.props.update_sellerValue(event.target.value);
  };

  // 評価値をステートにセットする
  handleChange_2 = (event) => {
    this.setState({ buyerValue: Number(event.target.value) });
    console.log('選択中のvalue値:' + event.target.value);

    //親コンポーネントを更新
    this.props.update_buyerValue(event.target.value);
  };


  render() {
    return (
      <div className="card">
        <img
          src={"http://drive.google.com/uc?export=view&id=" + this.props.image}
        />
        <p>商品名：{this.props.name}</p>
        <p>価格：{this.props.price}</p>
        <p>商品説明：{this.props.introduction}</p>
        <p>商品状態：{this.props.goods_status}</p>
        <p>出品者：{this.props.seller}</p>
        <p>出品者のアドレス：{this.props.seller_addr}</p>
        <p>購入者のアドレス：{this.props.buyer_addr}</p>
        <p>支払い：{this.props.payment}</p>
        <p>発送：{this.props.shipment}</p>
        <p>受取：{this.props.receivement}</p>
        <p>出品者評価：{this.props.seller_reputate}</p>
        <p>購入者評価：{this.props.buyer_reputate}</p>

        <div className="button-box">
          <p>
            <Button variant="primary" onClick={this.props.buy_button}>この商品を購入</Button>
          </p>
          <p>
            <Button variant="primary" onClick={this.props.ship_button}>発送完了通知</Button>
          </p>
          <p>
            <Button variant="primary" onClick={this.props.receive_button}>受取完了通知</Button>
          </p>
          <p>
            <label>出品者を評価して下さい：</label>
            <select value={this.state.sellerValue} onChange={this.handleChange_1}>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
            </select>

            <Button variant="primary" onClick={this.props.sellerEvaluate_button}>出品者を評価
          </Button>
          </p>

          <p>
            <label>購入者を評価して下さい：</label>
            <select value={this.state.buyerValue} onChange={this.handleChange_2}>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
            </select>

            <Button variant="primary" onClick={this.props.buyerEvaluate_button}>購入者を評価
          </Button>
          </p>
        </div>
      </div >
    );
  }
}
export default Card;
