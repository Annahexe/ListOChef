import { StyleSheet, Text, View, Pressable } from 'react-native';

import OnboardingCard from "../../../components/OnboardingCard";

const TermsConditions = (props) => {
  return (
      <OnboardingCard pageTitle="Terms and Conditions">
      <Text style={styles.title}>Terms Conditions</Text>
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
  title: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },boton: {
    alignSelf: 'center',
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 10,
    marginVertical: 2,
  },
});
export default TermsConditions;
