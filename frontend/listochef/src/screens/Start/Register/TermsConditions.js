import { StyleSheet, Text, ScrollView } from "react-native";

import OnboardingCard from "../../../components/OnboardingCard";

const TermsConditions = (props) => {
  return (
    <OnboardingCard pageTitle="Terms and Conditions">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.text}>
          Welcome to <Text style={styles.bold}>ListOChef</Text>. By using this application, you agree to the following terms and conditions.
        </Text>

        <Text style={styles.sectionTitle}>1. Use of the App</Text>
        <Text style={styles.text}>
          ListOChef has been developed solely for <Text style={styles.bold}>educational purposes</Text> as part of a group academic project. By using this app,
          you agree to these <Text style={styles.bold}>Terms and Conditions</Text>.
        </Text>

        <Text style={styles.sectionTitle}>2. Purpose of the Application</Text>
        <Text style={styles.text}>
          {
            "ListOChef is a non-commercial application created for learning and demonstration purposes.\nIts main features include:\n• Browsing and saving recipes;\n• Creating and managing grocery lists;\n• Basic user interaction features related to cooking and meal planning. \nThe app is not intended for professional, commercial, or medical use."
          }
        </Text>

        <Text style={styles.sectionTitle}>3. User Accounts</Text>
        <Text style={styles.text}>
          {
            "• The app may allow users to create a basic account for testing purposes.\n• All data stored is for demonstration only.\n• Users should not enter real personal, financial, or sensitive information."
          }
        </Text>

        <Text style={styles.sectionTitle}>4. Data Collection and Storage</Text>
        <Text style={styles.text}>
          {
            "• Any data collected (such as usernames, saved recipes, or grocery lists) is used only within the app.\n• Data is stored temporarily and may be deleted at any time.\n• We do not guarantee data persistence or backup."
          }
        </Text>

        <Text style={styles.sectionTitle}>5. Intellectual Property</Text>
        <Text style={styles.text}>
          {
            "• All content created by the development team (design, code, text, features) belongs to the project authors.\n• Recipes included may be:\n   • Created by the team, or\n   • Used for educational demonstration only"
          }
        </Text>

        <Text style={styles.sectionTitle}>6. User Responsibilities</Text>
        <Text style={styles.text}>
          {
            "By using the app, you agree:\n• Not to misuse the app or attempt to exploit its features\n• Not to upload harmful, illegal, or inappropriate content\n• To understand that the app may contain bugs or incomplete features"
          }
        </Text>

        <Text style={styles.sectionTitle}>7. Disclaimer</Text>
        <Text style={styles.text}>
          {
            "• The app is provided “as is”, without warranties of any kind.\n• We do not guarantee accuracy of recipes, nutritional values, or cooking results.\n• The developers are not responsible for any issues arising from the use of the app."
          }
        </Text>

        <Text style={styles.sectionTitle}>8. Limitation of Liabilitys</Text>
        <Text style={styles.text}>
          {
            "Since this app is an academic project:\n• The developers are not liable for any damages, losses, or issues resulting from its use.\n• Use of the app is entirely at your own risk."
          }
        </Text>

        <Text style={styles.sectionTitle}>9. Changes to These Terms</Text>
        <Text style={styles.text}>
          {
            "These Terms and Conditions may be updated at any time for academic or technical reasons.\nContinued use of the app after changes means you accept the updated terms."
          }
        </Text>
      </ScrollView>
    </OnboardingCard>
  );
};
const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontFamily: "MontserratRegular",
    marginBottom: 12,
    lineHeight: 20,
  },
  bold: {
    fontFamily: "MontserratSemiBold",
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "MontserratSemiBold",
    marginTop: "1%",
    marginBottom: 5,
  },
});
export default TermsConditions;
