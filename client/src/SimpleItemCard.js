import React from "react";
import { Card, Badge } from "react-bootstrap"; // 
import "bootstrap/dist/css/bootstrap.min.css"; // 


class SimpleItemCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div id="simple_card_item">
        <Card style={{ width: '18rem' }}>
          <Card.Img
            variant="top"
            src={"http://drive.google.com/uc?export=view&id=" + this.props.image}
          />

          <Card.Body>
            <Card.Title>商品名：{this.props.name}</Card.Title>
            <Card.Text>価格：{this.props.price}(wei)</Card.Text>
            <Card.Text>商品説明：{this.props.introduction}</Card.Text>
            <Card.Text>商品状態：<Badge variant="success">{this.props.goods_status}</Badge>{' '}</Card.Text>
            <Card.Text>出品者：{this.props.seller}</Card.Text>
            {/* <Card.Text>出品者のアドレス：{this.props.seller_addr}</Card.Text> */}
            {/* <Card.Text>購入者のアドレス：{this.props.buyer_addr}</Card.Text> */}
            {/* <Card.Text>支払い：{this.props.payment}</Card.Text>
            <Card.Text>発送：{this.props.shipment}</Card.Text>
            <Card.Text>受取：{this.props.receivement}</Card.Text>
            <Card.Text>出品者評価：{this.props.seller_reputate}</Card.Text>
            <Card.Text>購入者評価：{this.props.buyer_reputate}</Card.Text> */}

          </Card.Body>

          <Card.Footer className="text-center">
            <small className="text-muted">Product No.{this.props.num + 1}</small>
          </Card.Footer>
        </Card>
        <br />
      </div >

    );
  }
}
export default SimpleItemCard;