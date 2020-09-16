import React from "react";
import Card from "./Card";

class Main extends React.Component {
  render() {
    const ItemList = [
      [
        {
          image:
            "https://s3-ap-northeast-1.amazonaws.com/progate/shared/images/lesson/react/html.svg",
          name: "HTML&CSS",
          price: "100",
          introduction: "Webページの見た目をつくるプログラミング言語",
          goods_status: "売り切れ",
          seller: "かっぱ",
          seller_addr: "1111110",
          buyer_addr: "22222222",
          payment: "済み",
          shipment: "済み",
          receivement: "済み",
          seller_reputate: "済み",
          buyer_reputate: "済み",
        },
        {
          image:
            "https://s3-ap-northeast-1.amazonaws.com/progate/shared/images/lesson/react/html.svg",
          name: "HTML&CSS",
          price: "100",
          introduction: "Webページの見た目をつくるプログラミング言語",
          goods_status: "売り切れ",
          seller: "かっぱ",
          seller_addr: "1111111",
          buyer_addr: "22222222",
          payment: "済み",
          shipment: "済み",
          receivement: "済み",
          seller_reputate: "済み",
          buyer_reputate: "済み",
        },
        {
          image:
            "https://s3-ap-northeast-1.amazonaws.com/progate/shared/images/lesson/react/html.svg",
          name: "HTML&CSS",
          price: "100",
          introduction: "Webページの見た目をつくるプログラミング言語",
          goods_status: "売り切れ",
          seller: "かっぱ",
          seller_addr: "1111112",
          buyer_addr: "22222222",
          payment: "済み",
          shipment: "済み",
          receivement: "済み",
          seller_reputate: "済み",
          buyer_reputate: "済み",
        },
      ],
    ];

    return (
      <div className="main-wrapper">
        <div className="card-container">
          {/*Item1*/}
          {ItemList[0].map((GoodsItem) => {
            return (
              <Card
                image={GoodsItem.image}
                name={GoodsItem.name}
                price={GoodsItem.price}
                introduction={GoodsItem.introduction}
                goods_status={GoodsItem.goods_status}
                seller={GoodsItem.seller}
                seller_addr={GoodsItem.seller_addr}
                buyer_addr={GoodsItem.buyer_addr}
                payment={GoodsItem.payment}
                shipment={GoodsItem.shipment}
                receivement={GoodsItem.receivement}
                seller_reputate={GoodsItem.seller_reputate}
                buyer_reputate={GoodsItem.buyer_reputate}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
export default Main;
