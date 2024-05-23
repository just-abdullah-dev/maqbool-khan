import React from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { getAll } from "@/services/utils";

export default async function Layout({ children }) {
  
  const aboutData = await getAll("maqboolkhan", "personal");

  return (
    <div>
      <Header />
      {children}
      <Footer socials={aboutData?.data?.socials} />
    </div>
  );
}
