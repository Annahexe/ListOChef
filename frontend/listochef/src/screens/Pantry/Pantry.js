import { StyleSheet, Text, View, } from 'react-native';

const Pantry = (props) => {
  return (
    <View style={styles.layout}>
      <Text style={styles.title}>Recipes List</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  layout: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    padding: 8,
  },
  title: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
export default Pantry;