import React from 'react'
import Navbar from "./Header";
import Home from "./Home";
import Footer from "./Footer";
import getCookie from "./Cookies/Cookies.js"

function Layout() {
  return (
    <div className="App">
      {
        console.log(getCookie("user"))
      }
      <Navbar />
      <Home />
      <Footer />
    </div>
  );
}

export default Layout;
