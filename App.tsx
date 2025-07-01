/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen'
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native'
import ContactsNumbers from './components/base-container'

export default function App() {
  const isDarkMode = useColorScheme() === 'dark'
  
  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NewAppScreen templateFileName="App.tsx" />
      <ContactsNumbers />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
