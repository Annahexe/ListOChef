import { createContext, useState } from "react";

/**
 * Global app context used to share user data, backend route,
 * authentication token, recipes, pantry, grocery list and tickets
 * across the application.
 */
const Context = createContext();

/** Default recipe used as initial value for the last recipe seen. */
const INITIAL_LAST_RECIPE_SEEN = {
  id: "5",
  recipeName: "Potato Omelette",
  ingredients: ["Potatoes", "Eggs", "Onion", "Olive oil", "Salt"],
  tag: ["eggs", "potato"],
  category: "Dinner",
  time: 20,
  difficulty: "Low",
  steps:
    "1. Peel and slice the potatoes. \n2. Heat olive oil in a frying pan over medium heat.  \n3. Add the potatoes and onion and cook slowly until soft.  \n4. Beat the eggs in a bowl and add salt.  \n5. Drain the potatoes and mix them with the eggs.  \n6. Pour the mixture into the pan and cook until set on both sides.",
  photo:
    "https://mojo.generalmills.com/api/public/content/9xIHKwJDH0-1wbHPsVCCVQ_gmi_hi_res_jpeg.jpeg?v=2bfc22c6&t=16e3ce250f244648bef28c5949fb99ff",
  creationDate: "17/02/2026",
  isSaved: true,
};

/** Default user used before real user data is loaded after login. */
const INITIAL_USER = {
  name: "John",
  surname: "Doe",
  email: "user@gmail.com",
  password: "micontraseña",
};

/** Default grocery list ingredients used as initial app data. */
const INITIAL_SELECTED_INGREDIENTS = [
  { ingredientName: "Potatoes", ingredientAmount: 5, ingredientTag: "" },
  { ingredientName: "Tomatoes", ingredientAmount: 1, ingredientTag: "" },
  { ingredientName: "Water", ingredientAmount: 3, ingredientTag: "" },
];

/** Default pantry ingredients used as initial app data. */
const INITIAL_PANTRY_ITEMS = [
  {
    ingredientName: "Potatoes",
    ingredientAmount: 5,
    ingredientTag: "vegetable",
  },
  {
    ingredientName: "Tomatoes",
    ingredientAmount: 2,
    ingredientTag: "vegetable",
  },
  { ingredientName: "Whole Milk", ingredientAmount: 4, ingredientTag: "Dairy" },
];

/**
 * Provider component that stores and exposes global app state.
 * Wraps the application so any screen or component can access shared data
 * through useContext(Context).
 *
 * @param {Object} props - Component props.
 * @param {JSX.Element} props.children - App content wrapped by the provider.
 * @returns {JSX.Element} Context provider with shared state values.
 */
export const Provider = ({ children }) => {
  const [route, setRoute] = useState(process.env.EXPO_PUBLIC_URL);
  const [user, setUser] = useState(INITIAL_USER);
  const [token, setToken] = useState("");

  const [recipesSaved, setRecipesSaved] = useState([]);
  const [lastRecipeSeen, setLastRecipeSeen] = useState(
    INITIAL_LAST_RECIPE_SEEN,
  );

  const [ingredientTags, setIngredientTags] = useState([]);
  const [listRecipesTags, setListRecipesTags] = useState([]);
  const [listRecipesCategories, setListRecipesCategories] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState(
    INITIAL_SELECTED_INGREDIENTS,
  );
  const [pantryItems, setPantryItems] = useState(INITIAL_PANTRY_ITEMS);

  const [ticketsSaved, setTicketsSaved] = useState([]);

  return (
    <Context.Provider
      value={{
        route,
        setRoute,
        ingredientTags,
        setIngredientTags,
        listRecipesTags,
        setListRecipesTags,
        listRecipesCategories,
        setListRecipesCategories,
        lastRecipeSeen,
        setLastRecipeSeen,
        user,
        setUser,
        token,
        setToken,
        selectedIngredients,
        setSelectedIngredients,
        pantryItems,
        setPantryItems,
        recipesSaved,
        setRecipesSaved,
        ticketsSaved,
        setTicketsSaved,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Context;
