import { StyleSheet, Text, View, Pressable } from 'react-native';

const Start = (props) => {
  return (
    <View style={styles.layout}>
      <Text style={styles.title}>Inicio</Text>
      <Pressable
        style={styles.boton}
        onPress={() => props.navigation.navigate('Login')}>
        <Text >Ir a Login</Text>
      </Pressable>
      <Pressable
        style={styles.boton}
        onPress={() => props.navigation.navigate('Register')}>
        <Text >Ir a Register</Text>
      </Pressable>
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
  boton: {
    alignSelf: 'center',
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 10,
    marginVertical: 2,
  },
});
export default Start;
