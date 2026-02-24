import { createContext, useState } from "react";
const Context = createContext();

export const Provider = ({ children }) => {
  const [lastRecipeSeen, setLastRecipeSeen] = useState({
    id: "5",
    recipeName: "Potato Omelette",
    ingredients: ["Potatoes", "Eggs", "Onion", "Olive oil", "Salt"],
    tag: ["eggs", "potato"],
    type: "Dinner",
    time: 20,
    difficulty: "Low",
    steps:
      "1. Peel and slice the potatoes. \n2. Heat olive oil in a frying pan over medium heat.  \n3. Add the potatoes and onion and cook slowly until soft.  \n4. Beat the eggs in a bowl and add salt.  \n5. Drain the potatoes and mix them with the eggs.  \n6. Pour the mixture into the pan and cook until set on both sides.",
    photo:
      "https://mojo.generalmills.com/api/public/content/9xIHKwJDH0-1wbHPsVCCVQ_gmi_hi_res_jpeg.jpeg?v=2bfc22c6&t=16e3ce250f244648bef28c5949fb99ff",
    creationDate: "17/02/2026",
    isSaved: true,
  });

  return (
    <Context.Provider value={{ lastRecipeSeen, setLastRecipeSeen }}>
      {children}
    </Context.Provider>
  );
};

export default Context;
