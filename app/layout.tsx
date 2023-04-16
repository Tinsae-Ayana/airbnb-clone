import ClientOnly from "./components/ClientOnly";
import RegisterModel from "./components/models/RegisterModel";
import Navbar from "./components/Navbar/Navbar";
import "./globals.css";
import { Nunito } from "next/font/google";
import ToasterProvider from "./providers/ToasterProvider";
import LoginModel from "./components/models/LoginModel";
import getCurrentUser from "./actions/getCurrentUser";

export const metadata = {
   title: "Airbnb",
   description: "Airbnb clone",
};

const font = Nunito({
   subsets: ["latin"],
});

export default async function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   const currentUser = await getCurrentUser();
   return (
      <html lang='en'>
         <body className={font.className}>
            <ClientOnly>
               <ToasterProvider></ToasterProvider>
               <LoginModel></LoginModel>
               <RegisterModel></RegisterModel>
               <Navbar currentUser={currentUser}></Navbar>
            </ClientOnly>
            {children}
         </body>
      </html>
   );
}
