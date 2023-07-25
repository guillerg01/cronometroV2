'use client'
import ContextProdvider from "@/context/GlobalContext";

import "./globals.css";

import { Flowbite } from 'flowbite-react';




export const metadata = {
  title: "Cronometro",
  description: "Cromprueba tu habilidad",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Flowbite >
      <ContextProdvider>
        <body>{children}</body>
      </ContextProdvider>
      </Flowbite>
    </html>
  );
}
