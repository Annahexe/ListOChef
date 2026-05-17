import { useContext, useState } from "react";
import { StyleSheet, Text, ScrollView, View, Image } from "react-native";
import Toast from "react-native-toast-message";
import Context from "../../../context/Context";
import PrimaryButton from "../../../components/PrimaryButton";
import { postDataOnboarding } from "../../../services/services";
import OnboardingCard from "../../../components/OnboardingCard";

/**
 * Terms and Conditions screen shown during onboarding/registration.
 * This screen is part of the register onboarding flow and is wrapped inside
 * the OnboardingCard layout component.
 *
 * @module TermsConditions
 */

/**
 * Renders the Terms and Conditions content for the ListOChef app.
 * @component
 * @param {Object} props - Component props passed by the navigator.
 * @returns {JSX.Element} A scrollable view containing the app's terms and conditions
 */
const TermsConditions = (props) => {
  const {
    route,
    setToken,
    setIngredientTags,
    setUser,
    setRecipesSaved,
    setListRecipesTags,
    setSelectedIngredients,
    setPantryItems,
    setListRecipesCategories,
    setTicketsSaved,
  } = useContext(Context);

  const [isLoading, setIsLoading] = useState(false);

  /**
   * Performs a hidden guest login used for demo/testing purposes.
   *
   * This function first attempts to authenticate using a predefined
   * guest account from the backend. If the server is unavailable,
   * it falls back to locally generated mock data so the user can
   * still explore the application without an internet connection.
   *
   * The function populates the global app context with:
   * - Guest user information
   * - Demo recipes
   * - Demo expense tickets
   * - Ingredient tags
   * - Recipe categories and tags
   * - Pantry and grocery list placeholders
   *
   * It is mainly intended for:
   * - Academic demonstrations
   * - Offline presentations
   * - Long term testing without backend dependency
   *
   * On success, the user is redirected to the Home screen.
   *
   * @async
   * @function secretGuestLogin
   * @returns {Promise<void>}
   */
  const secretGuestLogin = async () => {
    const guestCredentials = {
      email: "guest@listochef.app",
      password: "12345",
    };

    setIsLoading(true);

    const response = await postDataOnboarding(route + "/login", guestCredentials);

    setIsLoading(false);

    if (!response) {
      Toast.show({
        type: "error",
        text1: "Server offline",
        text2: "Continuing as guest with limited data.",
      });
      setUser({
        name: "Guest",
        surname: "User",
        email: "guest@listochef.app",
        myTicketsList: [
          {
            ticketPictureUri: Image.resolveAssetSource(require("../../../../assets/icons/ListoChefLogo.png")).uri,
            supermarket: "Mercadona",
            ticketDate: "2026-05-06T19:05:21.360+00:00",
            amountProducts: 1,
            totalPrice: 10.8,
          },
        ],
        myGroceryList: [],
        myPantryList: [],
      });

      setToken("guest-token");
      setIngredientTags([
        { name: "All", icon: "" },
        { name: "Proteins", icon: "🥩" },
      ]);
      setListRecipesTags([{ name: "Pasta" }, { name: "Dessert" }]);
      setListRecipesCategories([{ name: "Breakfast" }, { name: "Lunch" }]);
      setRecipesSaved([
        {
          id: "6a0377e43e56873dbe285369",
          recipeName: "Spanish Omelette",
          ingredients: ["Egg", "Potato", "Onion", "Olive Oil", "Salt"],
          steps: "Fry the potatoes.\nMix with beaten eggs.\nCook in a pan on both sides until set.",
          category: "Egg",
          time: 40,
          difficulty: "Medium",
          photo: Image.resolveAssetSource(require("../../../../assets/icons/ListoChefLogo.png")).uri,
          creationDate: "2025-12-19T00:00:00Z",
          tags: ["Egg", "Traditional", "Spanish"],
          saved: true,
        },
        {
          id: "6a0377e43e56873dbe28536f",
          recipeName: "Baked Salmon With Honey Mustard",
          ingredients: ["Salmon", "Mustard", "Honey", "Olive Oil", "Lemon", "Salt", "Pepper"],
          steps: "Mix the sauce.\nCoat the salmon.\nBake for 12–15 minutes.\nServe.",
          category: "Fish",
          time: 25,
          difficulty: "Easy",
          photo: Image.resolveAssetSource(require("../../../../assets/icons/ListoChefLogo.png")).uri,
          creationDate: "2026-02-18T00:00:00Z",
          tags: ["Fish", "Oven", "Healthy"],
          saved: true,
        },
      ]);

      setTicketsSaved([
        {
          ticketPictureUri: Image.resolveAssetSource(require("../../../../assets/icons/ListoChefLogo.png")).uri,
          supermarket: "Mercadona",
          ticketDate: "2026-05-06T19:05:21.360+00:00",
          amountProducts: 1,
          totalPrice: 10.8,
        },
      ]);

      props.navigation.navigate("Home");
      return;
    }

    const [status, jsonResponse] = response;

    if (status === 200) {
      setIngredientTags([
        { name: "All", icon: "" },
        ...jsonResponse.listIngredientsTags.map((ingredient) => ({
          name: ingredient.ingredientCategoryName,
          icon: ingredient.icon,
        })),
      ]);

      setUser(jsonResponse.user);
      setToken(jsonResponse.token);
      setRecipesSaved(jsonResponse.recipesSavedList);
      setTicketsSaved(jsonResponse.user.myTicketsList);

      setListRecipesTags([
        { name: "All", icon: "" },
        ...jsonResponse.listRecipesTags.map((tag) => ({
          name: tag.name,
          icon: "",
        })),
      ]);

      setListRecipesCategories(jsonResponse.listRecipesCategories);
      setSelectedIngredients(jsonResponse.user.myGroceryList);
      setPantryItems(jsonResponse.user.myPantryList);

      props.navigation.navigate("Home");
      return;
    }

    Toast.show({
      type: "error",
      text1: "Guest login failed",
    });
    props.navigation.navigate("Home");
  };

  return (
    /**
     * OnboardingCard provides consistent layout and styling
     * for onboarding-related screens (title + content container)
     */
    <OnboardingCard pageTitle="Terms and Conditions">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Introduction text */}
        <Text style={styles.text}>
          Welcome to <Text style={styles.bold}>ListOChef</Text>. By using this application, you agree to the following terms and conditions.
        </Text>

        {/* Section 1 */}
        <Text style={styles.sectionTitle} onPress={() => secretGuestLogin()}>
          1. Use of the App
        </Text>
        <Text style={styles.text}>
          ListOChef has been developed solely for <Text style={styles.bold}>educational purposes</Text> as part of a group academic project. By using this app,
          you agree to these <Text style={styles.bold}>Terms and Conditions</Text>.
        </Text>

        {/* Section 2 */}
        <Text style={styles.sectionTitle}>2. Purpose of the Application</Text>
        <Text style={styles.text}>
          {
            "ListOChef is a non-commercial application created for learning and demonstration purposes.\nIts main features include:\n• Browsing and saving recipes;\n• Creating and managing grocery lists;\n• Basic user interaction features related to cooking and meal planning. \nThe app is not intended for professional, commercial, or medical use."
          }
        </Text>

        {/* Section 3 */}
        <Text style={styles.sectionTitle}>3. User Accounts</Text>
        <Text style={styles.text}>
          {
            "• The app may allow users to create a basic account for testing purposes.\n• All data stored is for demonstration only.\n• Users should not enter real personal, financial, or sensitive information."
          }
        </Text>

        {/* Section 4 */}
        <Text style={styles.sectionTitle}>4. Data Collection and Storage</Text>
        <Text style={styles.text}>
          {
            "• Any data collected (such as usernames, saved recipes, or grocery lists) is used only within the app.\n• Data is stored temporarily and may be deleted at any time.\n• We do not guarantee data persistence or backup."
          }
        </Text>

        {/* Section 5 */}
        <Text style={styles.sectionTitle}>5. Intellectual Property</Text>
        <Text style={styles.text}>
          {
            "• All content created by the development team (design, code, text, features) belongs to the project authors.\n• Recipes included may be:\n   • Created by the team, or\n   • Used for educational demonstration only"
          }
        </Text>

        {/* Section 6 */}
        <Text style={styles.sectionTitle}>6. User Responsibilities</Text>
        <Text style={styles.text}>
          {
            "By using the app, you agree:\n• Not to misuse the app or attempt to exploit its features\n• Not to upload harmful, illegal, or inappropriate content\n• To understand that the app may contain bugs or incomplete features"
          }
        </Text>

        {/* Section 7 */}
        <Text style={styles.sectionTitle}>7. Disclaimer</Text>
        <Text style={styles.text}>
          {
            "• The app is provided “as is”, without warranties of any kind.\n• We do not guarantee accuracy of recipes, nutritional values, or cooking results.\n• The developers are not responsible for any issues arising from the use of the app."
          }
        </Text>

        {/* Section 8 */}
        <Text style={styles.sectionTitle}>8. Limitation of Liability</Text>
        <Text style={styles.text}>
          {
            "Since this app is an academic project:\n• The developers are not liable for any damages, losses, or issues resulting from its use.\n• Use of the app is entirely at your own risk."
          }
        </Text>

        {/* Section 9 */}
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

/**
 * Styles used in the TermsConditions screen
 */
const styles = StyleSheet.create({
  /** Default paragraph text */
  text: {
    fontSize: 16,
    fontFamily: "MontserratRegular",
    marginBottom: 12,
    lineHeight: 20,
  },

  /** Bold text for emphasis */
  bold: {
    fontFamily: "MontserratSemiBold",
  },

  /** Section titles (e.g., "1. Use of the App") */
  sectionTitle: {
    fontSize: 18,
    fontFamily: "MontserratSemiBold",
    marginTop: "1%",
    marginBottom: 5,
  },
});

export default TermsConditions;
