import { StyleSheet, Text, View, Pressable } from 'react-native';

import OnboardingCard from "../../../components/OnboardingCard";

const ResetPassword = (props) => {
  return (
      <OnboardingCard pageTitle="Reset Password">
      <Text style={styles.text}>We will email you a link to reset your password.</Text>
      <Pressable
        style={styles.boton}
        onPress={() => props.navigation.navigate('Home')}>
        <Text>Ir a Home</Text>
      </Pressable>
      </OnboardingCard>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
  },boton: {
    alignSelf: 'center',
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 10,
    marginVertical: 2,
  },
});
export default ResetPassword;
