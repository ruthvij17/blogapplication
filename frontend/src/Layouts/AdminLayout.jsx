import React from "react";
import AdminNavbarComponent from "../Components/AdminNavbarComponent";

const DefaultLayout =
  (Component) =>
  ({ ...props }) => {
    return (
      <div>
        <AdminNavbarComponent />
        <Component {...props} />
      </div>
    );
  };

export default DefaultLayout;
