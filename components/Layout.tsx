import { FC } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";

export const Layout: FC = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};
