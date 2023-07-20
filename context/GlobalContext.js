"use client";

import { createContext, useState } from "react";

export const GlobalContext = createContext();

const defaultFrase =
  "Hola esto es un test para ver que tan rapido escribes ¡Comprueba tu habilidad ahora!";

export default function ContextProdvider({ children }) {
  const [frase, setFrase] = useState(defaultFrase);
  const [curPanel, setCurPanel] = useState('none');

  return (
    <GlobalContext.Provider value={{ frase, setFrase, curPanel, setCurPanel }}>{children}</GlobalContext.Provider>
  );
}
