import React, { PureComponent } from "react";
import { View, StatusBar, ScrollView, StyleSheet } from "react-native";

import { default as ItemPageTheme } from "./../../theme/views/ItemPage";
import { CacheableImage } from "../../components/trivial/CacheableImage";
import { StylableText } from "../../components/trivial/text/StylableText";
import { Button } from "../../components/trivial/buttons/Button";
import { ButtonStyle } from "../../theme/components/Button";

const variantsButtonSelected: ButtonStyle = {
  button: {
    flex: 1,
    justifyContent: "center",
    borderColor: "red",
    borderRadius: 3,
    borderWidth: 2,
    height: 30,
    width: 60,
    marginRight: 10
  },
  text: {
    textAlign: "center",
    fontSize: 10,
    fontFamily: "Roboto",
    color: "black"
  },
  buttonDisabled: {
    elevation: 0,
    backgroundColor: "#dfdfdf"
  },
  textDisabled: {
    color: "#a1a1a1"
  }
};

const variantsButton: ButtonStyle = {
  button: {
    flex: 1,
    justifyContent: "center",
    borderColor: "#dfdfdf",
    borderRadius: 3,
    borderWidth: 1,
    height: 30,
    width: 60,
    marginRight: 10
  },
  text: {
    textAlign: "center",
    fontSize: 10,
    fontFamily: "Roboto",
    color: "black"
  },
  buttonDisabled: {
    elevation: 0,
    backgroundColor: "#dfdfdf"
  },
  textDisabled: {
    color: "#a1a1a1"
  }
};

const amountButton: ButtonStyle = {
  button: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#f1f1f1",
    borderRadius: 15,
    borderWidth: 0,
    height: 30,
    width: 30
  },
  text: {
    textAlign: "center",
    fontSize: 15,
    fontFamily: "sans-serif-medium",
    color: "black",
    marginBottom: 3
  },
  buttonDisabled: {
    elevation: 0,
    backgroundColor: "#dfdfdf"
  },
  textDisabled: {
    color: "#a1a1a1"
  }
};

export default class ItemPage extends PureComponent {
  public render() {
    return (
      <View style={ItemPageTheme.container}>
        <StatusBar
          backgroundColor={ItemPageTheme.statusBar.backgroundColor}
          barStyle="light-content"
        />
        <View style={ItemPageTheme.toolBar} />
        <ScrollView style={{height: 550}}>
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
          <View style={{ paddingLeft: 10 }}>
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
            <View
              style={{
                marginRight: 10,
                marginTop: 8,
                marginBottom: 8,
                borderBottomWidth: StyleSheet.hairlineWidth * 2,
                borderBottomColor: "#dfdfdf"
              }}
            />
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
            {/* <View
              style={{
                marginRight: 10,
                marginTop: 14,
                marginBottom: 8,
                borderBottomWidth: StyleSheet.hairlineWidth * 2,
                borderBottomColor: "#dfdfdf"
              }}
            /> */}
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                marginTop: 14,
                justifyContent: "space-between",
                alignItems: "center",
                borderColor: "#ADB1B8",
                borderRadius: 3,
                borderWidth: 1,
                backgroundColor: "#ECEEF1",
                height: 70,
                // width: 20,
                marginRight: 10,
                padding: 10
              }}
            >
              <View style={{ flex: 1, flexDirection: "column" }}>
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
              width: 100,
              height: 100
            }}
          />
        </ScrollView>
        <View style={ItemPageTheme.buyBar}>
        <StylableText
                style={{
                  fontFamily: "Arial Cyr Bold",
                  fontSize: 15,
                  color: "#F44336"
                }}
              >
                ДОБАВИТЬ В КОРЗИНУ
              </StylableText>
        </View>
      </View>
    );
  }
}

/**
 * 
 *             <Button
              style={ItemPageTheme.variantsButton}
              textStyle={ItemPageTheme.variantsButtonText}
              bordered
              danger
              onPress={() => {}}
            >
              <Text>250гр</Text>
            </Button>
            <Button bordered danger onPress={() => {}}>
              <Text>350гр</Text>
            </Button>
            <Button bordered danger onPress={() => {}}>
              <Text>2кг</Text>
            </Button>
            <Button bordered danger onPress={() => {}}>
              <Text>7.5кг</Text>
            </Button>
 */
