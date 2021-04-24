import { FC } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";

export const Layout: FC = ({ children }) => {
  return (
    <div className="overflow-hidden	">
      <Header />
      <div className="flex justify-center py-10">
      {children}
      </div>
      <Footer />
    </div>
  );
};
