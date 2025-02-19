import React from "react";
import NavbarComponent from "../Components/NavbarComponent";
import FooterComponent from "../Components/FooterComponent";

const DefaultLayout =
  (Component) =>
  ({ ...props }) => {
    return (
      <div>
        <NavbarComponent />
        <Component {...props} />
        <FooterComponent />
      </div>
    );
  };

export default DefaultLayout;
