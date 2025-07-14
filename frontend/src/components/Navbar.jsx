import React from "react";
import { Link, useNavigate } from "react-router-dom";
import * as bootstrap from "bootstrap";
import logo from "../assets/favicon.ico"; 
import './Navbar.css';


const Navbar = () => {
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem("userId");
  const role = localStorage.getItem("role");

  const handleNavItemClick = () => {
    const collapseEl = document.getElementById("navbarNav");
    const bsCollapse = bootstrap.Collapse.getInstance(collapseEl);
    if (bsCollapse) {
      bsCollapse.hide();
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
      <div className="container">
        <Link
  className="navbar-brand d-flex align-items-center gap-2"
  to="/"
  onClick={handleNavItemClick}
>
  <img src={logo} alt="Rentify Logo" style={{ height: "28px" }} />
  <span>Home Rentify</span>
</Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={handleNavItemClick}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              {isLoggedIn ? (
                <Link className="nav-link" to="/properties" onClick={handleNavItemClick}>
                  Properties
                </Link>
              ) : (
                <button
                  className="nav-link btn btn-link text-#1a1a1a text-decoration-none"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    handleNavItemClick();
                    navigate("/login");
                  }}
                >
                  Properties
                </button>
              )}
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/about"
                onClick={handleNavItemClick}
              >
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/contact"
                onClick={handleNavItemClick}
              >
                Contact
              </Link>
            </li>

            {!isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/login"
                    onClick={handleNavItemClick}
                  >
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/signup"
                    onClick={handleNavItemClick}
                  >
                    Signup
                  </Link>
                </li>
              </>
            ) : (
              <>
                {role === "owner" && (
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/owner-dashboard"
                      onClick={handleNavItemClick}
                    >
                      Dashboard
                    </Link>
                  </li>
                )}
                {role === "tenant" && (
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/tenant-dashboard"
                      onClick={handleNavItemClick}
                    >
                      Dashboard
                    </Link>
                  </li>
                )}
                <li className="nav-item">
                  <button
                    className="btn btn-danger btn-sm ms-3 mt-1"
                    onClick={() => {
                      handleLogout();
                      handleNavItemClick();
                    }}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import * as bootstrap from 'bootstrap';

// const Navbar = () => {
//   const navigate = useNavigate();

//   const isLoggedIn = !!localStorage.getItem('userId');
//   const role = localStorage.getItem('role');

//   const handleNavItemClick = () => {
//     const collapseEl = document.getElementById('navbarNav');
//     const bsCollapse = bootstrap.Collapse.getInstance(collapseEl);
//     if (bsCollapse) {
//       bsCollapse.hide();
//     }
//   };

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate('/');
//   };

//   const handleProtectedProperties = (e) => {
//     e.preventDefault();
//     handleNavItemClick();
//     if (!isLoggedIn) {
//       alert('Please login to view properties.');
//       navigate('/login');
//     } else {
//       navigate('/properties');
//     }
//   };

//   return (
//     <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
//       <div className="container">
//         <Link className="navbar-brand" to="/" onClick={handleNavItemClick}>Rentify</Link>

//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarNav"
//           aria-controls="navbarNav"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         <div className="collapse navbar-collapse" id="navbarNav">
//           <ul className="navbar-nav ms-auto">
//             <li className="nav-item">
//               <Link className="nav-link" to="/" onClick={handleNavItemClick}>Home</Link>
//             </li>

//             <li className="nav-item">
//               <a href="/properties" className="nav-link" onClick={handleProtectedProperties}>
//                 Properties
//               </a>
//             </li>

//             <li className="nav-item">
//               <Link className="nav-link" to="/about" onClick={handleNavItemClick}>About</Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/contact" onClick={handleNavItemClick}>Contact</Link>
//             </li>

//             {!isLoggedIn ? (
//               <>
//                 <li className="nav-item">
//                   <Link className="nav-link" to="/login" onClick={handleNavItemClick}>Login</Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link className="nav-link" to="/signup" onClick={handleNavItemClick}>Signup</Link>
//                 </li>
//               </>
//             ) : (
//               <>
//                 {role === 'owner' && (
//                   <li className="nav-item">
//                     <Link className="nav-link" to="/owner-dashboard" onClick={handleNavItemClick}>Dashboard</Link>
//                   </li>
//                 )}
//                 {role === 'tenant' && (
//                   <li className="nav-item">
//                     <Link className="nav-link" to="/tenant-dashboard" onClick={handleNavItemClick}>Dashboard</Link>
//                   </li>
//                 )}
//                 <li className="nav-item">
//                   <button className="btn btn-danger btn-sm ms-3 mt-1" onClick={() => { handleLogout(); handleNavItemClick(); }}>
//                     Logout
//                   </button>
//                 </li>
//               </>
//             )}
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
