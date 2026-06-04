// import React from "react";
// import { Outlet } from "react-router-dom";
// import Admin from "../Component/Admin.jsx"; // your navbar

// const AdminLayout = () => {
//   return (
//     <div>
//       <Admin />   {/* Navbar always visible */}
//       <div className="container mt-4">
//         <Outlet /> {/* Child pages will render here */}
//       </div>
//     </div>
//   );
// };

// export default AdminLayout;

import React from "react";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return <Outlet />;
};

export default AdminLayout;
