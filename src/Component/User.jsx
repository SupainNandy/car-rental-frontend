import React, { useContext, useState, useEffect } from "react";
import { authContext } from "../context/contextApi";
import { Link } from "react-router-dom";

const User = () => {
  const { setLoggedIn, setName } = useContext(authContext);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [cars, setCars] = useState([]);

 

  // Search
  useEffect(() => {
  const fetchCars = async () => {
    try {
      let url;

      if (searchTerm.trim() === "") {
        url = "https://car-rental-backend-7bgb.onrender.com/cars";
      } else {
        url = `https://car-rental-backend-7bgb.onrender.com/cars/search?q=${searchTerm}`;
      }

      const res = await fetch(url);
      const data = await res.json();

      setCars(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const timer = setTimeout(fetchCars, 500);

  return () => clearTimeout(timer);
}, [searchTerm]);



  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    setLoggedIn(false);
    setName("");
    window.location.href = "/login-user";
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Raleway:wght@300;400;500&display=swap');

        :root {
          --gold: #C9A84C;
          --gold-light: #E8C97A;
          --gold-dim: #8a6f30;
          --black: #0a0a0a;
          --black-mid: #111111;
          --black-soft: #1a1a1a;
        }

        .cr-navbar {
          position: sticky;
          top: 0;
          z-index: 1000;
          background: var(--black);
          border-bottom: 1px solid transparent;
          transition: all 0.4s ease;
          font-family: 'Raleway', sans-serif;
        }

        .cr-navbar.scrolled {
          background: rgba(10, 10, 10, 0.97);
          border-bottom: 1px solid var(--gold-dim);
          box-shadow: 0 4px 30px rgba(201, 168, 76, 0.08);
          backdrop-filter: blur(12px);
        }

        .cr-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 68px;
        }

        /* Brand */
        .cr-brand {
          text-decoration: none;
          display: flex;
          flex-direction: column;
          line-height: 1;
          gap: 1px;
        }
        .cr-brand-main {
          font-family: 'Cinzel', serif;
          font-size: 1.15rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          color: var(--gold);
          text-transform: uppercase;
        }
        .cr-brand-sub {
          font-size: 0.55rem;
          letter-spacing: 0.35em;
          color: #666;
          text-transform: uppercase;
          font-weight: 400;
        }
        .cr-brand:hover .cr-brand-main {
          color: var(--gold-light);
        }

        /* Divider ornament */
        .cr-ornament {
          height: 32px;
          width: 1px;
          background: linear-gradient(to bottom, transparent, var(--gold-dim), transparent);
          display: none;
        }

        /* Nav links */
        .cr-nav-links {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .cr-nav-links a,
        .cr-nav-links button {
          display: inline-block;
          padding: 0.45rem 1rem;
          font-family: 'Raleway', sans-serif;
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #aaa;
          text-decoration: none;
          background: none;
          border: none;
          cursor: pointer;
          position: relative;
          transition: color 0.25s ease;
        }

        .cr-nav-links a::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%) scaleX(0);
          width: 60%;
          height: 1px;
          background: var(--gold);
          transition: transform 0.3s ease;
          transform-origin: center;
        }

        .cr-nav-links a:hover { color: var(--gold-light); }
        .cr-nav-links a:hover::after { transform: translateX(-50%) scaleX(1); }

        /* Logout special style */
        .cr-logout {
          margin-left: 0.5rem;
          padding: 0.4rem 1.2rem !important;
          border: 1px solid var(--gold-dim) !important;
          border-radius: 2px;
          color: var(--gold) !important;
          transition: all 0.25s ease !important;
        }
        .cr-logout:hover {
          background: var(--gold) !important;
          color: var(--black) !important;
          border-color: var(--gold) !important;
        }
        .cr-logout::after { display: none !important; }

        /* Hamburger */
        .cr-hamburger {
          display: none;
          flex-direction: column;
          justify-content: center;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 6px;
        }
        .cr-hamburger span {
          display: block;
          width: 22px;
          height: 1.5px;
          background: var(--gold);
          transition: all 0.3s ease;
          transform-origin: center;
        }
        .cr-hamburger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
        .cr-hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .cr-hamburger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

        /* Mobile menu */
        @media (max-width: 768px) {
          .cr-ornament { display: none !important; }
          .cr-hamburger { display: flex; }

          .cr-nav-links {
            position: absolute;
            top: 68px;
            left: 0; right: 0;
            flex-direction: column;
            align-items: stretch;
            background: var(--black-mid);
            border-top: 1px solid var(--gold-dim);
            border-bottom: 1px solid var(--gold-dim);
            padding: 0.5rem 0;
            gap: 0;
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.4s ease, padding 0.3s ease;
          }
          .cr-nav-links.open {
            max-height: 300px;
            padding: 0.75rem 0;
          }
          .cr-nav-links li { width: 100%; }
          .cr-nav-links a,
          .cr-nav-links button {
            display: block;
            width: 100%;
            text-align: center;
            padding: 0.75rem 1.5rem;
            font-size: 0.7rem;
          }
          .cr-nav-links a::after { display: none; }
          .cr-logout {
            margin: 0.5rem auto 0 !important;
            width: calc(100% - 3rem) !important;
            display: block !important;
            text-align: center;
          }
        }

        @media (min-width: 769px) {
          .cr-ornament { display: block; }
          .cr-nav-links { position: static; max-height: none; overflow: visible; }
        }
      `}</style>

      <nav className={`cr-navbar${scrolled ? " scrolled" : ""}`}>
        <div className="cr-inner">
          <a href="/" className="cr-brand">
            <span className="cr-brand-main">Royal Route</span>
            <span className="cr-brand-sub">Premium Fleet Services</span>
          </a>

          <div className="cr-ornament" />

          <button
            className={`cr-hamburger${menuOpen ? " open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
          >
            <span /><span /><span />
          </button>

          <ul className={`cr-nav-links${menuOpen ? " open" : ""}`}>
            <li>
  <Link to="/user/dashboard" onClick={() => setMenuOpen(false)}>
    Home
  </Link>
</li>

<li>
  <Link to="/user/mybookings" onClick={() => setMenuOpen(false)}>
    My Bookings
  </Link>
</li>

<li>
  <Link to="/user/user-profile" onClick={() => setMenuOpen(false)}>
    Profile
  </Link>
</li>
            <div className="cars-grid">
 
</div>
            <li>
              <button className="cr-logout" onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      </nav>
      
    </>
  );
};

export default User;  