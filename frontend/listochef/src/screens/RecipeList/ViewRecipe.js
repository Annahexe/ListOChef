import { View, Text, Pressable, StyleSheet } from 'react-native';

const ViewRecipe = ({ navigation }) => {
  return (
    <View style={styles.container}>
        <Text style={styles.title}>Ver Receta</Text>
        <Pressable onPress={() => navigation.goBack()} style={styles.button}>
          <Text>Cerrar</Text>
        </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 105,
    position: 'relative',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#4B643F',
    padding: 10,
    borderRadius: 8,
    textAlign: 'center',
  },
});


export default ViewRecipe;