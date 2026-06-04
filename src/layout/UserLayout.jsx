  import React from "react";
  import { Outlet } from "react-router-dom";
  import User from "../Component/User.jsx"; // your navbar


  const UserLayout = () => {
    return (
      <div>
        <User />   {/* Navbar always visible */}
        <div className="container mt-4">
          <Outlet /> {/* Child pages will render here */}
        </div>
      </div>
    );
  };

  export default UserLayout;
