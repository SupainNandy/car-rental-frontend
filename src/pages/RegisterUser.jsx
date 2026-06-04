import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterUser = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },

    onSubmit: async (values) => {
      try {
        const userData = {
          name: values.firstName + " " + values.lastName,
          email: values.email,
          password: values.password,
        };

        const response = await axios.post(
          "http://localhost:8000/users/register",
          userData
        );

        console.log(response.data);
        alert("Registration Successful!");
        navigate("/login-user");
      } catch (error) {
        console.error("Registration Error:", error);
        if (error.response) {
          alert(error.response.data.message || "Registration Failed");
        } else {
          alert("Something went wrong!");
        }
      }
    },

    validationSchema: Yup.object({
      firstName: Yup.string()
        .matches(/^[A-Za-z]+$/, "Only alphabets allowed")
        .required("First Name is required"),

      lastName: Yup.string()
        .matches(/^[A-Za-z]+$/, "Only alphabets allowed")
        .required("Last Name is required"),

      email: Yup.string()
        .email("Invalid Email")
        .required("Email is required"),

      password: Yup.string()
        .matches(
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])/,
          "Must contain uppercase, lowercase, number & special character"
        )
        .min(6, "Minimum 6 characters")
        .required("Password is required"),

      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
    }),
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Barlow:wght@300;400;500;600&family=Cinzel+Decorative:wght@700&display=swap');
        
        body {
          background: #000;
          font-family: 'Barlow', sans-serif;
        }

        /* ── Structural Animation Array ── */
        @keyframes interactiveGlow {
          from { box-shadow: 0 0 4px rgba(212,175,55,0.3); }
          to { box-shadow: 0 0 16px rgba(212,175,55,0.8); }
        }
        @keyframes premiumShineTrack {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes frameBreathe {
          from { border-color: rgba(212, 175, 55, 0.12); box-shadow: 0 30px 60px rgba(0,0,0,0.8); }
          to { border-color: rgba(212, 175, 55, 0.3); box-shadow: 0 30px 60px rgba(212,175,55,0.02); }
        }
        @keyframes errorFadeIn {
          from { opacity: 0; transform: translateY(-3px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* ── Input Design Overhaul ── */
        .premium-input {
          background-color: rgba(14, 14, 14, 0.85) !important;
          color: #fff !important;
          border: 1px solid rgba(212, 175, 55, 0.2) !important;
          border-radius: 4px !important;
          padding: 0.7rem 1rem;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        .premium-input:focus {
          border-color: #D4AF37 !important;
          box-shadow: 0 0 12px rgba(212, 175, 55, 0.2) !important;
          background-color: rgba(20, 20, 20, 0.95) !important;
        }
        .premium-input.is-invalid-field {
          border-color: #ff4d4d !important;
          box-shadow: 0 0 8px rgba(255, 77, 77, 0.15) !important;
        }
        .error-message {
          color: #ff4d4d;
          font-size: 0.78rem;
          letter-spacing: 0.5px;
          margin-top: 5px;
          display: block;
          font-weight: 400;
          animation: errorFadeIn 0.25s ease forward;
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
          animation: premiumShineTrack 6s ease infinite, interactiveGlow 2s ease-in-out infinite alternate;
        }
        .gold-gradient-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(212,175,55,0.35) !important;
        }

        .gold-outline-btn {
          border: 1px solid rgba(212, 175, 55, 0.4) !important;
          color: #D4AF37 !important;
          background: transparent !important;
          font-weight: 500;
          letter-spacing: 2px;
          text-transform: uppercase;
          transition: all 0.3s ease !important;
        }
        .gold-outline-btn:hover {
          background: rgba(212, 175, 55, 0.03) !important;
          border-color: #D4AF37 !important;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(212,175,55,0.15) !important;
        }
      `}</style>

      <div
        className="d-flex justify-content-center align-items-center p-3 p-md-4"
        style={{
          minHeight: "100vh",
          background: "linear-gradient(to right, rgba(0, 0, 0, 0.9) 25%, rgba(0, 0, 0, 0.4) 100%), url('https://images.unsplash.com/photo-1617469767053-d3b508a0d825?auto=format&fit=crop&w=2070&q=80') center/cover no-repeat",
        }}
      >
        {/* Structural wireframe architectural corner layers */}
        <div style={{ position: "absolute", top: "2.5rem", left: "2.5rem", width: "40px", height: "40px", borderTop: "1px solid rgba(212,175,55,0.25)", borderLeft: "1px solid rgba(212,175,55,0.25)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "2.5rem", right: "2.5rem", width: "40px", height: "40px", borderBottom: "1px solid rgba(212,175,55,0.25)", borderRight: "1px solid rgba(212,175,55,0.25)", pointerEvents: "none" }} />

        <div
          className="card border-0"
          style={{
            width: "100%",
            maxWidth: "640px",
            background: "rgba(10, 10, 10, 0.8)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            borderRadius: "6px",
            overflow: "hidden",
            border: "1px solid rgba(212,175,55,0.15)",
            animation: "frameBreathe 4s ease-in-out infinite alternate"
          }}
        >
          <div className="card-body p-4 p-md-5">
            <div className="text-center mb-4">
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 700,
                  color: "#fff",
                  letterSpacing: "1px",
                  fontSize: "2.3rem"
                }}
              >
                Create <span style={{ color: "#D4AF37" }}>Account</span>
              </h2>
              <div 
                style={{ 
                  width: "30%", 
                  height: "1px", 
                  background: "linear-gradient(90deg, transparent, #D4AF37, transparent)", 
                  margin: "8px auto 14px" 
                }} 
              />
              <p className="mb-0" style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.95rem", fontWeight: 300 }}>
                Register to initialize your telemetry control metrics
              </p>
            </div>

            <form onSubmit={formik.handleSubmit}>
              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label className="form-label small text-uppercase" style={{ color: "rgba(212,175,55,0.85)", letterSpacing: "1.5px", fontWeight: 500 }}>
                    First Name
                  </label>
                  <input
                    type="text"
                    className={`form-control premium-input ${formik.touched.firstName && formik.errors.firstName ? 'is-invalid-field' : ''}`}
                    name="firstName"
                    placeholder="John"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.firstName && formik.errors.firstName && (
                    <span className="error-message">{formik.errors.firstName}</span>
                  )}
                </div>

                <div className="col-md-6">
                  <label className="form-label small text-uppercase" style={{ color: "rgba(212,175,55,0.85)", letterSpacing: "1.5px", fontWeight: 500 }}>
                    Last Name
                  </label>
                  <input
                    type="text"
                    className={`form-control premium-input ${formik.touched.lastName && formik.errors.lastName ? 'is-invalid-field' : ''}`}
                    name="lastName"
                    placeholder="Doe"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.lastName && formik.errors.lastName && (
                    <span className="error-message">{formik.errors.lastName}</span>
                  )}
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label small text-uppercase" style={{ color: "rgba(212,175,55,0.85)", letterSpacing: "1.5px", fontWeight: 500 }}>
                  Email Address
                </label>
                <input
                  type="email"
                  className={`form-control premium-input ${formik.touched.email && formik.errors.email ? 'is-invalid-field' : ''}`}
                  name="email"
                  placeholder="name@domain.com"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email && (
                  <span className="error-message">{formik.errors.email}</span>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label small text-uppercase" style={{ color: "rgba(212,175,55,0.85)", letterSpacing: "1.5px", fontWeight: 500 }}>
                  Password
                </label>
                <input
                  type="password"
                  className={`form-control premium-input ${formik.touched.password && formik.errors.password ? 'is-invalid-field' : ''}`}
                  name="password"
                  placeholder="••••••••"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password && (
                  <span className="error-message">{formik.errors.password}</span>
                )}
              </div>

              <div className="mb-4">
                <label className="form-label small text-uppercase" style={{ color: "rgba(212,175,55,0.85)", letterSpacing: "1.5px", fontWeight: 500 }}>
                  Confirm Password
                </label>
                <input
                  type="password"
                  className={`form-control premium-input ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'is-invalid-field' : ''}`}
                  name="confirmPassword"
                  placeholder="••••••••"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                  <span className="error-message">{formik.errors.confirmPassword}</span>
                )}
              </div>

              <button
                type="submit"
                className="btn gold-gradient-btn w-100 py-25 mb-4"
                style={{ borderRadius: "4px", fontSize: "0.85rem", padding: "0.8rem" }}
              >
                Register Identity
              </button>
            </form>

            <div className="text-center mt-2">
              <p className="small mb-3" style={{ color: "rgba(255,255,255,0.45)", fontWeight: 300 }}>
                Already possess an active profile identity?
              </p>
              <button
                className="btn gold-outline-btn w-100 py-25"
                style={{ borderRadius: "4px", fontSize: "0.85rem", padding: "0.75rem" }}
                onClick={() => navigate("/login-user")}
              >
                Login Here
              </button>
            </div>
          </div>

          {/* Consistent Structural Footer Alignment */}
          <div
            className="text-center"
            style={{
              background: "rgba(5, 5, 5, 0.9)",
              borderTop: "1px solid rgba(212,175,55,0.15)",
              padding: "1.25rem",
              fontFamily: "'Cinzel Decorative', serif",
              position: "relative"
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: "50%",
                transform: "translateX(-50%)",
                width: "50%",
                height: "1px",
                background: "linear-gradient(90deg, transparent, #D4AF37, transparent)"
              }}
            />
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

export default RegisterUser;