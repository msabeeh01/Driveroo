import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

//page imports
import Instructors from './src/pages/Instructors'

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.instructorContainer}>
        <Instructors />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  instructorContainer: {
    flex: 1,
    backgroundColor: '#00FFFF',
    alignItems: 'flex-start',
    paddingTop: 50,
    paddingLeft: 20,
    paddingBottom: 50,
  }
});
