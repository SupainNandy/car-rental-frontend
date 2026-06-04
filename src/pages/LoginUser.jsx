import React, { useContext, useState } from "react";
import axios from "axios";
import { authContext } from "../context/contextApi";
import { useNavigate } from "react-router-dom";

const LoginUser = () => {
  const { setLoggedIn, setName } = useContext(authContext);
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://car-rental-backend-7bgb.onrender.com/users/login",
        loginData
      );

      setLoggedIn(true);
      setName(response.data.user.name);

      localStorage.setItem("userToken", response.data.token);
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("name", response.data.user.name);

      alert("Login Successful!");

      navigate("/user/dashboard", {
        replace: true,
      });
    } catch (error) {
      console.error(error);
      alert("Login Failed!");
    }
  };

  return (
    <>
      <style>{`
      /* ===== Royal Route Golden Scrollbar ===== */

::-webkit-scrollbar {
  width: 12px;
}

::-webkit-scrollbar-track {
  background: #050505;
  border-left: 1px solid rgba(212,175,55,0.15);
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(
    180deg,
    #fff4b0 0%,
    #ffe97a 20%,
    #D4AF37 60%,
    #b8860b 100%
  );
  border-radius: 20px;
  border: 2px solid #050505;
  box-shadow:
    0 0 10px rgba(212,175,55,0.5),
    inset 0 0 5px rgba(255,255,255,0.3);
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(
    180deg,
    #ffffff 0%,
    #fff4b0 15%,
    #ffd700 50%,
    #D4AF37 100%
  );
  box-shadow:
    0 0 20px rgba(212,175,55,0.8),
    0 0 40px rgba(212,175,55,0.4);
}

/* Firefox */
html {
  scrollbar-width: thin;
  scrollbar-color: #D4AF37 #050505;
}
  body {
  overflow-y: overlay;
}

::-webkit-scrollbar-thumb {
  animation: goldGlow 3s ease-in-out infinite alternate;
}

@keyframes goldGlow {
  from {
    box-shadow: 0 0 8px rgba(212,175,55,0.4);
  }
  to {
    box-shadow: 0 0 22px rgba(212,175,55,0.9);
  }
}

        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Barlow:wght@300;400;500;600&family=Cinzel+Decorative:wght@700&display=swap');
        
        body {
          background: #000;
          font-family: 'Barlow', sans-serif;
        }

        /* ── Core Animations Hub ── */
        @keyframes luxuryBtnGlow {
          from { box-shadow: 0 0 4px rgba(212,175,55,0.4); }
          to { box-shadow: 0 0 16px rgba(212,175,55,0.85); }
        }
        @keyframes smoothGoldShine {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes containerPulse {
          from { border-color: rgba(212, 175, 55, 0.15); box-shadow: 0 20px 40px rgba(0,0,0,0.7); }
          to { border-color: rgba(212, 175, 55, 0.35); box-shadow: 0 20px 40px rgba(212,175,55,0.03); }
        }

        /* ── Input Interaction Engineering ── */
        .premium-input {
          background-color: rgba(15, 15, 15, 0.8) !important;
          color: #fff !important;
          border: 1px solid rgba(212, 175, 55, 0.25) !important;
          border-radius: 4px !important;
          padding: 0.75rem 1rem;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        .premium-input:focus {
          border-color: #D4AF37 !important;
          box-shadow: 0 0 10px rgba(212, 175, 55, 0.25) !important;
          background-color: rgba(22, 22, 22, 0.95) !important;
          transform: translateY(-1px);
        }
        .premium-input::placeholder {
          color: rgba(255, 255, 255, 0.3) !important;
          font-size: 0.9rem;
        }

        /* ── Shared Component Classes ── */
        .gold-gradient-btn {
          background: linear-gradient(270deg, #D4AF37, #ffe97a, #D4AF37);
          background-size: 400% 400%;
          color: #000;
          border: none;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          transition: all 0.3s ease;
          animation: smoothGoldShine 6s ease infinite, luxuryBtnGlow 2s ease-in-out infinite alternate;
        }
        .gold-gradient-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(212,175,55,0.4) !important;
        }

        .gold-outline-btn {
          border: 1px solid rgba(212, 175, 55, 0.45) !important;
          color: #D4AF37 !important;
          background: transparent !important;
          font-weight: 500;
          letter-spacing: 2px;
          text-transform: uppercase;
          transition: all 0.3s ease !important;
        }
        .gold-outline-btn:hover {
          background: rgba(212, 175, 55, 0.04) !important;
          border-color: #D4AF37 !important;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(212,175,55,0.2) !important;
        }
      `}</style>

      <div
        className="d-flex justify-content-center align-items-center p-3"
        style={{
          minHeight: "100vh",
          // background: "linear-gradient(to right, rgba(0, 0, 0, 0.85) 30%, rgba(0, 0, 0, 0.4) 100%), url('https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=2070&q=80') center/cover no-repeat",
        }}
      >
        {/* Decorative structural vector corner frames */}
        <div style={{ position: "absolute", top: "2.5rem", left: "2.5rem", width: "40px", height: "40px", borderTop: "1px solid rgba(212,175,55,0.3)", borderLeft: "1px solid rgba(212,175,55,0.3)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "2.5rem", right: "2.5rem", width: "40px", height: "40px", borderBottom: "1px solid rgba(212,175,55,0.3)", borderRight: "1px solid rgba(212,175,55,0.3)", pointerEvents: "none" }} />

        <div
          className="card border-0"
          style={{
            width: "100%",
            maxWidth: "460px",
            background: "rgba(10, 10, 10, 0.75)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            borderRadius: "8px",
            overflow: "hidden",
            border: "1px solid rgba(212,175,55,0.15)",
            animation: "containerPulse 4s ease-in-out infinite alternate"
          }}
        >
          <div className="card-body p-4 p-md-5">
            <div className="text-center mb-5">
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 700,
                  color: "#fff",
                  letterSpacing: "1px",
                  fontSize: "2.2rem"
                }}
              >
                Welcome <span style={{ color: "#D4AF37" }}>Back</span>
              </h2>
              <div 
                style={{ 
                  width: "40%", 
                  height: "1px", 
                  background: "linear-gradient(90deg, transparent, #D4AF37, transparent)", 
                  margin: "10px auto 14px" 
                }} 
              />
              <p className="mb-0" style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.95rem", fontWeight: 300 }}>
                Secure telemetry access terminal
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  className="form-label small text-uppercase"
                  style={{ color: "rgba(212,175,55,0.8)", letterSpacing: "2px", fontWeight: 500 }}
                >
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-control premium-input"
                  placeholder="name@domain.com"
                  value={loginData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-5">
                <label
                  className="form-label small text-uppercase"
                  style={{ color: "rgba(212,175,55,0.8)", letterSpacing: "2px", fontWeight: 500 }}
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  className="form-control premium-input"
                  placeholder="••••••••••••"
                  value={loginData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn gold-gradient-btn w-100 py-25 mb-4"
                style={{ borderRadius: "4px", fontSize: "0.85rem", padding: "0.8rem" }}
              >
                Initialize Login
              </button>
            </form>

            <div className="text-center mt-2">
              <p className="small mb-3" style={{ color: "rgba(255,255,255,0.45)", fontWeight: 300 }}>
                Don't have an authenticated account?
              </p>
              <button
                className="btn gold-outline-btn w-100 py-25"
                style={{ borderRadius: "4px", fontSize: "0.85rem", padding: "0.75rem" }}
                onClick={() => navigate("/register-user")}
              >
                Create Account
              </button>
            </div>
          </div>

          {/* Integrated Footer Module */}
          <div
            className="text-center"
            style={{
              background: "rgba(5, 5, 5, 0.85)",
              borderTop: "1px solid rgba(212,175,55,0.15)",
              padding: "1.25rem",
              fontFamily: "'Cinzel Decorative', serif"
            }}
          >
            <small
              style={{
                color: "rgba(212,175,55,0.7)",
                fontSize: "0.75rem",
                letterSpacing: "1px",
                display: "block",
                marginBottom: "4px"
              }}
            >
              © {new Date().getFullYear()} Royal Route. All rights reserved.
            </small>
            <small
              style={{
                fontSize: "0.7rem",
                fontStyle: "italic",
                letterSpacing: "1px",
                color: "rgba(255,255,255,0.3)",
                fontFamily: "'Barlow', sans-serif"
              }}
            >
              System Architect: Supain Nandy
            </small>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginUser;