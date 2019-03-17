import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Hello } from './components/Hello';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>The first page. Hello!</Text>
        <Text>Аз есмь реакт натив апликация!</Text>
        <Hello name='Press buttons'></Hello>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    color: "red"
  },
});
