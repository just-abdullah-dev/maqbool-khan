import { Toaster } from "react-hot-toast";
import "./globals.css";
import Providers from "./providers";
import ReduxProvider from "@/store/ReduxProvider";

export const metadata = {
  title: "Maqbool Khan",
  description: "Maqbool Khan POrtfolio Website",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en" suppressHydrationWarning>
      <body className=" dark:bg-gray-900 bg-gray-100 text-gray-900 dark:text-white">
        <Providers>
          <ReduxProvider>
          {children}
          <Toaster />
          </ReduxProvider>
        </Providers>
      </body>
    </html>
  );
}