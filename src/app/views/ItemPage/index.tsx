import React, { PureComponent } from "react";
import { View, StatusBar, ScrollView } from "react-native";

import { default as ItemPageTheme } from "./../../theme/views/ItemPage";
import { CacheableImage } from "../../components/trivial/CacheableImage";
import { StylableText } from "../../components/trivial/text/StylableText";
import { Button } from "../../components/trivial/buttons/Button";

export default class ItemPage extends PureComponent {
  public render() {
    return (
      <View style={ItemPageTheme.container}>
        <StatusBar
          backgroundColor={ItemPageTheme.statusBar.backgroundColor}
          barStyle="light-content"
        />
        <View style={ItemPageTheme.toolBar} />
        <ScrollView>
          <CacheableImage
            style={ItemPageTheme.image}
            src={
              "http://termokot.ru/wa-data/public/shop/products/55/35/3555/images/3128/3128.200x0.jpg"
            }
          />
          <View style={ItemPageTheme.priceContainer}>
            <StylableText style={ItemPageTheme.price}>250 - 2 500 руб.</StylableText>
          </View>
          <View style={ItemPageTheme.variantsContainer}>
            <Button title="250гр" onPress={()=>{}} />
            <Button title="350гр" onPress={()=>{}} />
            <Button title="2кг" onPress={()=>{}} />
            <Button title="7.5кг" onPress={()=>{}} />
          </View>
        </ScrollView>
      </View>
    );
  }
}
