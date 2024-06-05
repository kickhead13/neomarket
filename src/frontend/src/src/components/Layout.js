import React from 'react'
import Navbar from "./Header";
import Home from "./Home";
import Footer from "./Footer";

function Layout() {
  return (
    <div className="App">
      <Navbar />
      <Home />
      <Footer />
    </div>
  );
}

export default Layout;