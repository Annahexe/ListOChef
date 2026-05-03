import { createContext, useState } from "react";

const Context = createContext();

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
  photo: "https://mojo.generalmills.com/api/public/content/9xIHKwJDH0-1wbHPsVCCVQ_gmi_hi_res_jpeg.jpeg?v=2bfc22c6&t=16e3ce250f244648bef28c5949fb99ff",
  creationDate: "17/02/2026",
  isSaved: true,
};

const INITIAL_USER = {
  name: "John",
  surname: "Doe",
  email: "user@gmail.com",
  password: "micontraseña",
};

const INITIAL_SELECTED_INGREDIENTS = [
  { ingredientName: "Potatoes", ingredientAmount: 5, ingredientTag: "" },
  { ingredientName: "Tomatoes", ingredientAmount: 1, ingredientTag: "" },
  { ingredientName: "Water", ingredientAmount: 3, ingredientTag: "" },
];

const INITIAL_PANTRY_ITEMS = [
  { ingredientName: "Potatoes", ingredientAmount: 5, ingredientTag: "vegetable" },
  { ingredientName: "Tomatoes", ingredientAmount: 2, ingredientTag: "vegetable" },
  { ingredientName: "Whole Milk", ingredientAmount: 4, ingredientTag: "Dairy" },
];

export const Provider = ({ children }) => {
  const [route, setRoute] = useState("http://32.193.224.11:8080/ListOChef");
  const [user, setUser] = useState(INITIAL_USER);
  const [token, setToken] = useState("");

  const [recipesSaved, setRecipesSaved] = useState([]);
  const [lastRecipeSeen, setLastRecipeSeen] = useState(INITIAL_LAST_RECIPE_SEEN);

  const [ingredientTags, setIngredientTags] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState(INITIAL_SELECTED_INGREDIENTS);
  const [pantryItems, setPantryItems] = useState(INITIAL_PANTRY_ITEMS);

  const [ticketsSaved, setTicketsSaved] = useState([]);

  return (
    <Context.Provider
      value={{
        route,
        setRoute,
        ingredientTags,
        setIngredientTags,
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
