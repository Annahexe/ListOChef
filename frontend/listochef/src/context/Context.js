import { createContext, useState } from "react";
const Context = createContext();

export const Provider = ({ children }) => {
  const [route, setRoute] = useState("http://32.193.224.11:8080/ListOChef");
  const [ingredientTags, setIngredientTags] = useState([]);
  const [lastRecipeSeen, setLastRecipeSeen] = useState({
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
  });
  const [user, setUser] = useState({
    name: "John",
    surname: "Doe",
    email: "user@gmail.com",
    password: "micontraseña",
  });
  const [token, setToken] = useState("");

  const [selectedIngredients, setSelectedIngredients] = useState([
    { name: "Potatoes", amount: 5, ingredientTag: "" },
    { name: "Tomatoes", amount: 1, ingredientTag: "" },
    { name: "Water", amount: 3, ingredientTag: "" },
  ]);
  const [pantryItems, setPantryItems] = useState([
    { name: "Potatoes", amount: 5, ingredientTag: "vegetable" },
    { name: "Tomatoes", amount: 2, ingredientTag: "vegetable" },
    { name: "Whole Milk", amount: 4, ingredientTag: "Dairy" },
  ]);

  const [recipesSaved, setRecipesSaved] = useState([]);

  return (
    <Context.Provider
      value={{
        lastRecipeSeen,
        setLastRecipeSeen,
        user,
        setUser,
        token,
        setToken,
        route,
        setRoute,
        ingredientTags,
        setIngredientTags,
        selectedIngredients,
        setSelectedIngredients,
        pantryItems,
        setPantryItems,
        recipesSaved, 
        setRecipesSaved
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Context;
