import { createContext, useState } from "react";
const Context = createContext();

export const Provider = ({ children }) => {
  const [lastRecipeSeen, setLastRecipeSeen] = useState("Potato Omelet");

  return (
    <Context.Provider value={{lastRecipeSeen, setLastRecipeSeen}}>
      {children}
    </Context.Provider>
  );
};

export default Context;
