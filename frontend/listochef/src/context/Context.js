import { createContext, useState } from "react";
const Context = createContext();

export const Provider = ({ children }) => {
  const [lastRecipeSeen, setLastRecipeSeen] = useState({
    id: "5",
    recipeName: "Potato Omelette",
    type: "Breakfast",
    tags: ["Potato", "Eggs"],
    time: 20,
    difficulty: "Medium",
    photo: "https://mojo.generalmills.com/api/public/content/9xIHKwJDH0-1wbHPsVCCVQ_gmi_hi_res_jpeg.jpeg?v=2bfc22c6&t=16e3ce250f244648bef28c5949fb99ff",
    creationDate: "20/02/2026",
    isSaved: true,
  });

  return <Context.Provider value={{ lastRecipeSeen, setLastRecipeSeen }}>{children}</Context.Provider>;
};

export default Context;
