import React, { PureComponent } from "react";
import { View, StatusBar, ScrollView } from "react-native";

import {
  steelShitInstance as ItemPageTheme,
  variantsButtonSelected,
  variantsButton,
  amountButton,
  buyButton
} from "../../theme/views/ProductPage";
import { CacheableImage } from "../../components/trivial/CacheableImage";
import { StylableText } from "../../components/trivial/text/StylableText";
import { Button } from "../../components/trivial/buttons/Button";
import { Hr } from "../../components/trivial/hr";

export default class ItemPage extends PureComponent {
  public render() {
    return (
      <View style={ItemPageTheme.container}>
        <StatusBar
          backgroundColor={ItemPageTheme.statusBar.backgroundColor}
          barStyle="light-content"
        />
        <View style={ItemPageTheme.toolBar} />
        <ScrollView style={{ height: 550 }}>
          <CacheableImage
            style={ItemPageTheme.image}
            src={
              "http://termokot.ru/wa-data/public/shop/products/55/35/3555/images/3128/3128.200x0.jpg"
            }
          />
          <View style={ItemPageTheme.priceContainer}>
            <StylableText style={ItemPageTheme.price}>
              250 - 2 500 руб.
            </StylableText>
          </View>
          <View style={ItemPageTheme.infoContainer}>
            <StylableText style={ItemPageTheme.variantSelectedText}>
              Вес: 350гр
            </StylableText>
            <View style={ItemPageTheme.variantsContainer}>
              <Button style={variantsButton} title="250гр" onPress={() => {}} />
              <Button
                style={variantsButtonSelected}
                title="350гр"
                onPress={() => {}}
              />
              <Button style={variantsButton} title="2кг" onPress={() => {}} />
              <Button style={variantsButton} title="7.5кг" onPress={() => {}} />
            </View>
            <View style={ItemPageTheme.titleContainer}>
              <StylableText style={ItemPageTheme.title}>
                New Dog Cat Bowls Stainless Steel Travel Footprint Feeding One &
                Only (Ван & Онли) Sterilized Cat для стерилизованных кошек с
                индейкой и рисом
              </StylableText>
            </View>
            <Hr color="#dfdfdf" />
            <View style={ItemPageTheme.amountContainer}>
              <StylableText style={ItemPageTheme.variantSelectedText}>
                Количество:
              </StylableText>
              <View style={ItemPageTheme.amountSelectorContainer}>
                <Button style={amountButton} title="-" onPress={() => {}} />
                <StylableText style={ItemPageTheme.amountSelectorText}>
                  5
                </StylableText>
                <Button style={amountButton} title="+" onPress={() => {}} />
              </View>
            </View>
            <View style={ItemPageTheme.deliveryContainer}>
              <View style={{ flexDirection: "column" }}>
                <StylableText
                  style={{
                    fontFamily: "sans-serif-condensed",
                    fontSize: 15,
                    color: "black"
                  }}
                >
                  Доставка: 150 руб, 5 Мая
                </StylableText>
                <StylableText
                  style={{
                    fontFamily: "sans-serif-condensed",
                    fontSize: 15,
                    color: "black",
                    paddingBottom: 10
                  }}
                >
                  г.Ростов-на-Дону, ул. Освобождения, ...
                </StylableText>
              </View>
              <StylableText
                style={{
                  fontFamily: "Roboto",
                  fontSize: 20,
                  color: "black",
                  paddingBottom: 10
                }}
              >
                >
              </StylableText>
            </View>
          </View>
          <View
            style={{
              height: 10
            }}
          />
        </ScrollView>
        <Button
          style={buyButton}
          title="ДОБАВИТЬ В КОРЗИНУ"
          onPress={() => {}}
        />
      </View>
    );
  }
}
