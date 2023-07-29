
import ContextProdvider from "@/context/GlobalContext";

import "./globals.css";






export const metadata = {
  title: "Cronometro",
  description: "Cromprueba tu habilidad",
};

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning={true} lang="en">
     
      <ContextProdvider>
       
        <body  >
        
          {children}</body>
      </ContextProdvider>
     
    </html>
  );
}
