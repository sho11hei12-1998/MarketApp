import React from "react";

class Card extends React.Component {
  render() {
    return (
      <div className="card">
        <img key={"image"} src={this.props.image} />
        <p key={"name"}>商品名：{this.props.name}</p>
        <p key={"price"}>価格：{this.props.price}</p>
        <p key={"introduction"}>商品説明：{this.props.introduction}</p>
        <p key={"goods_status"}>商品状態：{this.props.goods_status}</p>
        <p key={"seller"}>出品者：{this.props.seller}</p>
        <p key={"seller_addr"}>出品者のアドレス：{this.props.seller_addr}</p>
        <p key={"buyer_addr"}>購入者のアドレス：{this.props.buyer_addr}</p>
        <p key={"payment"}>支払い：{this.props.payment}</p>
        <p key={"shipment"}>発送：{this.props.shipment}</p>
        <p key={"receivement"}>受取：{this.props.receivement}</p>
        <p key={"seller_reputate"}>出品者評価：{this.props.seller_reputate}</p>
        <p key={"buyer_reputate"}>購入者評価：{this.props.buyer_reputate}</p>

        <div className="button-box">
          <p>
            <button>この商品を購入</button>
          </p>
          <p>
            <button>発送完了通知</button>
          </p>
          <p>
            <button>受取完了通知</button>
          </p>
          <p>
            <button>出品者を評価</button>
          </p>
          <p>
            <button>購入者を評価</button>
          </p>
        </div>
      </div>
    );
  }
}
export default Card;
