import { StyleSheet, Text, View, ImageBackground } from 'react-native';

const Profile = (props) => {
  return (
    <ImageBackground source={require("../../../assets/fondoApp.png")} style={styles.background} resizeMode="cover">
      <View style={styles.overlay}>
        <View style={styles.container}>
        <Text style={styles.title}>Profile</Text>
        </View>
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 235, 0.7)",
  },
  container: {
    flex: 1,
    marginTop: 50,
    position: "relative",
    alignItems: "center",
  },
  title: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
export default Profile;