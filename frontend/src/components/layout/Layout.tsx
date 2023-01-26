import React from "react";

import '../../index.scss';
import Header from "../header/Header";
import Footer from "../footer/Footer";

const Layout = ({children}: {children: React.ReactNode}) => {
  return (
    <>
      <Header />
      <div style={{minHeight: "80vh"}} className="--pad">
        {children}
      </div>
      <Footer />
    </>
  )
}

export default Layout;
