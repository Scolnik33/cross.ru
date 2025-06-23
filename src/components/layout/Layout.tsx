import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { Provider } from "react-redux";
import store from "../../redux/store";

const Layout: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow pt-16">
          <Outlet />
        </main>
        <Footer />
      </div>
    </Provider>
  );
};

export default Layout;
