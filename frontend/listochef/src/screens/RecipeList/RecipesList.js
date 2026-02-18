import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Pressable,
} from 'react-native';

const RecipesList = (props) => {
  return (
    <ImageBackground
      source={require('../../../assets/fondoApp2.png')}
      style={styles.background}
      resizeMode="cover">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Recipes List</Text>
          <View style={styles.seeker}>
            <Text>search</Text>
          </View>
          <View style={styles.tag}>
            <Text style={{ color: 'white' }}>search</Text>
            <Text style={styles.label}>search</Text>
          </View>
          <Pressable
            style={styles.button}
            onPress={() => props.navigation.navigate('AddRecipe')}>
            <Text style={styles.buttonText}> + </Text>
          </Pressable>
        </View>
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 235, 0.7)',
  },
  container: {
    marginTop: 60,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  seeker: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#2C5818',
    padding: 10,
    margin: 10,
  },
  tag: {
    borderRadius: 10,
    backgroundColor: '#4B7D33',
    padding: 10,
    margin: 10,
  },
  label: {
    borderRadius: 10,
    backgroundColor: '#77AF5C',
    padding: 10,
    margin: 10,
    color: 'white',
  },button: {
    marginTop: 10,
    backgroundColor: '#4B643F',
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 50,
    textAlign: 'center',
  }, buttonText:{
    fontSize: 40,
    color: 'white',
  }
});
export default RecipesList;
