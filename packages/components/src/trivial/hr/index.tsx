import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {Color} from 'csstype';

export interface HrProps {
  color?: Color;
}

export class Hr extends Component<HrProps> {
  private styles = StyleSheet.create({
    hrStyle: {
      marginRight: 10,
      marginTop: 8,
      marginBottom: 8,
      borderBottomWidth: StyleSheet.hairlineWidth * 2,
      borderBottomColor: this.props.color || '#dfdfdf'
    }
  });

  public render() {
    return <View style={this.styles.hrStyle} />;
  }
}
