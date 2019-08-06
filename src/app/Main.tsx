import React, { PureComponent } from "react";

// import MainPage from "./views/MainPage";
import ProductPage from "./views/ProductPage";
import { ProductModel } from "./models/ProductModels";

const product: ProductModel = {
  id: "1",
  name:
    "New Dog Cat Bowls Stainless Steel Travel Footprint Feeding One & Only (Ван & Онли) Sterilized Cat для стерилизованных кошек с индейкой и рисом",
  price: {
    title: "Вес",
    properties: [
      { price: 250, property: "250гр" },
      { price: 320, property: "350гр" },
      { price: 1200, property: "2кг" },
      { price: 2500, property: "7.5кг" }
    ]
    // prices: [250, 320, 1200, 2500],
    // price_properties: ["250гр", "350гр", "2кг", "7.5кг"]
  },
  category_id: "1",
  image_url: [
    "http://termokot.ru/wa-data/public/shop/products/55/35/3555/images/3128/3128.200x0.jpg"
  ]
};

export default class Main extends PureComponent {
  public render() {
    // return <MainPage />;
    return <ProductPage product={product} />;
  }
}
