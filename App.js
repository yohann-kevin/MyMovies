import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Search from './Components/Search'
import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Hello plop</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

export default class App extends React.Component {
  render () {
    return (
      <Search/>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#36393f',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
