import { StyleSheet, Text, View, Pressable } from 'react-native';
const Login = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Pressable
        style={styles.boton}
        onPress={() => props.navigation.navigate('Register')}>
        <Text>Ir a Register</Text>
      </Pressable>
      <Pressable
        style={styles.boton}
        onPress={() => props.navigation.navigate('Home')}>
        <Text>Ir a Home</Text>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
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
export default Login;
