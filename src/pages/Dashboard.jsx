import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { authContext } from "../context/contextApi";

const Dashboard = () => {
  const { name } = React.useContext(authContext);
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [selectedImages, setSelectedImages] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const res = await axios.get("http://localhost:8000/cars");
      setCars(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getFirstName = (fullName) => fullName?.split(" ")[0] || "Guest";

  const handleBookNow = (car) => {
    navigate(`/user/booking/${car._id}`, { state: { car } });
  };


  const filteredCars = cars.filter((car) =>
    `${car.brand} ${car.model}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <>

      <style>{`
        .premium-search-wrapper{
  display:flex;
  justify-content:center;
  margin:40px 0;
}

.premium-search{
  width:100%;
  max-width:650px;
  position:relative;
}

.premium-search input{
  width:100%;
  height:65px;
  background:linear-gradient(
    145deg,
    rgba(10,10,10,0.95),
    rgba(20,20,20,0.95)
  );
  border:2px solid rgba(212,175,55,0.3);
  border-radius:50px;
  padding:0 70px 0 28px;
  color:#fff;
  font-size:16px;
  letter-spacing:1px;
  outline:none;
  transition:all .4s ease;
  box-shadow:
    0 0 25px rgba(212,175,55,0.08),
    inset 0 0 15px rgba(212,175,55,0.03);
}

.premium-search input::placeholder{
  color:rgba(255,255,255,.45);
}

.premium-search input:focus{
  border-color:#d4af37;
  box-shadow:
    0 0 10px rgba(212,175,55,.3),
    0 0 30px rgba(212,175,55,.15),
    inset 0 0 15px rgba(212,175,55,.08);
  transform:translateY(-2px);
}

.premium-search::before{
  content:"";
  position:absolute;
  inset:-2px;
  border-radius:50px;
  background:linear-gradient(
    90deg,
    transparent,
    rgba(212,175,55,.3),
    transparent
  );
  z-index:-1;
  animation:goldRun 3s linear infinite;
}

@keyframes goldRun{
  0%{
    transform:translateX(-100%);
  }
  100%{
    transform:translateX(100%);
  }
}

.search-icon{
  position:absolute;
  right:25px;
  top:50%;
  transform:translateY(-50%);
  color:#d4af37;
  font-size:24px;
  pointer-events:none;
}
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600&family=DM+Sans:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { overflow-x: hidden; }

        .dash-root {
          min-height: 100vh;
          width: 100%;
          background: #0a0a0a;
          font-family: 'DM Sans', sans-serif;
          color: #fff;
        }

        /* ── Hero ── */
        .dash-hero {
          width: 100%;
          background: #000;
          border-bottom: 1px solid rgba(212,175,55,0.25);
          padding: 64px 40px;
        }
        .dash-hero-inner {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 20px;
        }
        .dash-greeting-label {
          font-size: 11px;
          letter-spacing: 3.5px;
          text-transform: uppercase;
          color: #d4af37;
          margin-bottom: 10px;
          font-weight: 500;
        }
        .dash-greeting-name {
          font-family: 'Playfair Display', serif;
          font-size: clamp(30px, 4vw, 48px);
          font-weight: 600;
          line-height: 1.1;
          color: #fff;
        }
        .dash-greeting-name span { color: #d4af37; }
        .dash-hero-sub {
          font-size: 14px;
          color: rgba(255,255,255,0.4);
          margin-top: 10px;
          font-weight: 300;
        }
        .dash-hero-badge {
          border: 1px solid rgba(212,175,55,0.3);
          border-radius: 40px;
          padding: 12px 22px;
          display: flex;
          align-items: center;
          gap: 10px;
          color: #d4af37;
          font-size: 13px;
          font-weight: 500;
          white-space: nowrap;
          background: rgba(212,175,55,0.06);
        }
        .dash-badge-dot {
          width: 7px;
          height: 7px;
          background: #d4af37;
          border-radius: 50%;
          flex-shrink: 0;
        }

        /* ── Section ── */
        .dash-section {
          max-width: 1400px;
          margin: 0 auto;
          padding: 56px 40px;
        }
        .dash-section-header {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 36px;
          border-bottom: 1px solid rgba(212,175,55,0.12);
          padding-bottom: 20px;
        }
        .dash-section-title {
          font-family: 'Playfair Display', serif;
          font-size: 20px;
          font-weight: 500;
          color: #fff;
          white-space: nowrap;
        }
        .dash-count {
          background: rgba(212,175,55,0.1);
          color: #d4af37;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 1px;
          padding: 3px 12px;
          border-radius: 20px;
          border: 1px solid rgba(212,175,55,0.2);
        }

        /* ── Grid ── */
        .dash-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        /* ── Card ── */
        .car-card {
          background: #111;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          overflow: hidden;
          transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .car-card:hover {
          transform: translateY(-6px);
          border-color: rgba(212,175,55,0.35);
          box-shadow: 0 24px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(212,175,55,0.1);
        }
        .car-card.unavailable { opacity: 0.6; }
        .car-card.unavailable:hover {
          transform: none;
          border-color: rgba(255,255,255,0.07);
          box-shadow: none;
        }

        /* ── Image ── */
        .car-main-img-wrap {
          position: relative;
          height: 240px;
          background: #000;
          overflow: hidden;
        }
        .car-main-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.5s ease;
        }
        .car-card:hover .car-main-img { transform: scale(1.04); }
        .car-card.unavailable .car-main-img { filter: grayscale(70%); }

        /* ── Badges ── */
        .car-availability-badge,
        .unavailable-badge {
          position: absolute;
          top: 14px;
          left: 14px;
          z-index: 1;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          padding: 5px 12px;
          border-radius: 20px;
          backdrop-filter: blur(6px);
        }
        .car-availability-badge {
          background: rgba(0,0,0,0.7);
          color: #d4af37;
          border: 1px solid rgba(212,175,55,0.4);
        }
        .unavailable-badge {
          background: rgba(180,30,30,0.8);
          color: #fff;
        }

        /* ── Thumbnails ── */
        .car-thumbs {
          display: flex;
          gap: 8px;
          padding: 12px 16px;
          background: #0d0d0d;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          overflow-x: auto;
          scrollbar-width: none;
        }
        .car-thumbs::-webkit-scrollbar { display: none; }
        .car-thumb {
          width: 52px;
          height: 40px;
          flex-shrink: 0;
          object-fit: cover;
          border-radius: 6px;
          cursor: pointer;
          border: 2px solid transparent;
          transition: border-color 0.2s, opacity 0.2s;
          opacity: 0.6;
        }
        .car-thumb:hover { opacity: 1; }
        .car-thumb.active { border-color: #d4af37; opacity: 1; }
        .car-card.unavailable .car-thumb { pointer-events: none; }

        /* ── Body ── */
        .car-body { padding: 22px; }
        .car-name {
          font-family: 'Playfair Display', serif;
          font-size: 20px;
          font-weight: 500;
          color: #fff;
          margin-bottom: 4px;
        }
        .car-location {
          font-size: 12px;
          color: rgba(255,255,255,0.4);
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        /* ── Specs ── */
        .car-specs {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 20px;
        }
        .spec-pill {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.65);
          font-size: 12px;
          padding: 6px 12px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        /* ── Price ── */
        .car-price-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 0;
          margin-bottom: 16px;
          border-top: 1px solid rgba(255,255,255,0.06);
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .car-price {
          font-family: 'Playfair Display', serif;
          font-size: 30px;
          font-weight: 700;
          color: #d4af37;
        }
        .car-price-unit {
          font-size: 12px;
          color: rgba(255,255,255,0.35);
          margin-left: 4px;
        }
        .car-price-tag {
          font-size: 11px;
          font-weight: 600;
          padding: 4px 12px;
          border-radius: 20px;
          background: rgba(212,175,55,0.08);
          color: #d4af37;
          border: 1px solid rgba(212,175,55,0.2);
        }
        .booked-tag {
          font-size: 11px;
          color: #b94040;
          font-weight: 500;
        }

        /* ── Button ── */
        .book-btn {
          width: 100%;
          border: none;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.5px;
          padding: 14px;
          border-radius: 10px;
          transition: all 0.25s ease;
          background: #d4af37;
          color: #000;
        }
        .book-btn:hover {
          background: #e8c84a;
          transform: translateY(-2px);
        }
        .book-btn:active { transform: scale(0.98); }
        .book-btn.unavailable-btn {
          background: rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.3);
          cursor: not-allowed;
        }
        .book-btn.unavailable-btn:hover {
          background: rgba(255,255,255,0.08);
          transform: none;
        }

        .unavailable-notice {
          font-size: 11px;
          color: #b94040;
          text-align: center;
          margin-top: 10px;
        }

        /* ── Empty state ── */
        .empty-state {
          text-align: center;
          padding: 80px 20px;
          color: rgba(255,255,255,0.3);
        }
        .empty-state-icon { font-size: 48px; margin-bottom: 12px; }

        /* ── Footer ── */
        footer {
          background: #000;
          border-top: 1px solid rgba(212,175,55,0.2);
          padding: 28px 40px;
          text-align: center;
        }
        .footer-brand {
          color: #d4af37;
          font-weight: 600;
          font-size: 14px;
          margin-bottom: 4px;
        }
        .footer-credit { color: rgba(255,255,255,0.35); font-size: 12px; }

        /* ── Scrollbar ── */
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0a0a0a; }
        ::-webkit-scrollbar-thumb { background: #d4af37; border-radius: 20px; }

        /* ── Responsive ── */
        @media (max-width: 1100px) {
          .dash-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 700px) {
          .dash-grid { grid-template-columns: 1fr; }
          .dash-hero { padding: 44px 20px; }
          .dash-section { padding: 40px 20px; }
          footer { padding: 24px 20px; }
          .dash-hero-badge { width: 100%; justify-content: center; }
          .car-price-row { flex-direction: column; align-items: flex-start; gap: 8px; }
        }
      `}</style>


      <div className="dash-root">
        <div className="dash-hero">
          <div className="dash-hero-inner">
            <div>
              <p className="dash-greeting-label">Welcome back</p>
              <h1 className="dash-greeting-name">
                Hello, <span>{getFirstName(name)}</span>
              </h1>
              <p className="dash-hero-sub">Find your perfect ride for the journey ahead.</p>
            </div>



            <div className="dash-hero-badge">
              <span className="dash-badge-dot" />
              {filteredCars.length} {filteredCars.length === 1 ? "vehicle" : "vehicles"} listed
            </div>
          </div>
        </div>

        <div className="premium-search-wrapper">
          <div className="premium-search">
            <input
              type="text"
              placeholder="Search BMW, Audi, Mercedes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="search-icon"></span>
          </div>
        </div>

        <div className="dash-section">
          <div className="dash-section-header">
            <h2 className="dash-section-title">Available Cars</h2>
            {filteredCars.length > 0 && <span className="dash-count">{filteredCars.length}</span>}
          </div>

          {filteredCars.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">🔍</div>
              <p>No cars available at the moment.</p>
            </div>
          ) : (
            <div className="dash-grid">
              {filteredCars.map((car) => {
                const activeImg = selectedImages[car._id] ?? car.images?.[0];
                const isAvailable = car.available;

                return (
                  <div
                    className={`car-card ${!isAvailable ? "unavailable" : ""}`}
                    key={car._id}
                  >
                    <div className="car-main-img-wrap">
                      <img
                        src={activeImg}
                        alt={`${car.brand} ${car.model}`}
                        className="car-main-img"
                      />
                      {isAvailable
                        ? <div className="car-availability-badge">Available</div>
                        : <div className="unavailable-badge">Unavailable</div>
                      }
                    </div>



                    {car.images?.length > 1 && (
                      <div className="car-thumbs">
                        {car.images.map((img, index) => (
                          <img
                            key={index}
                            src={img}
                            alt={`view-${index + 1}`}
                            className={`car-thumb ${activeImg === img ? "active" : ""}`}
                            onClick={() => {
                              if (!isAvailable) return;
                              setSelectedImages((prev) => ({
                                ...prev,
                                [car._id]: img
                              }));
                            }}
                          />
                        ))}
                      </div>
                    )}
                    <div className="car-body">
                      <h3 className="car-name">{car.brand} {car.model}</h3>
                      <p className="car-location"><span>📍</span> {car.location}</p>

                      <div className="car-specs">
                        <span className="spec-pill">⚙️ {car.transmission}</span>
                        <span className="spec-pill">⛽ {car.fuelType}</span>
                        <span className="spec-pill">💺 {car.seats} seats</span>
                        <span className="spec-pill">📅 {car.year}</span>
                      </div>

                      <div className="car-price-row">
                        <div>
                          <span className="car-price">₹{car.pricePerDay}</span>
                          <span className="car-price-unit">/ day</span>
                        </div>
                        {isAvailable
                          ? <span className="car-price-tag">Best Price</span>
                          : <span className="booked-tag">Currently Booked</span>
                        }
                      </div>

                      <button
                        className={`book-btn ${!isAvailable ? "unavailable-btn" : ""}`}
                        onClick={() => isAvailable && handleBookNow(car)}
                        disabled={!isAvailable}
                      >
                        {isAvailable ? <>View &amp; Book →</> : <>Not Available</>}
                      </button>

                      {!isAvailable && (
                        <p className="unavailable-notice">This car is currently unavailable for booking.</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <footer>
        <p className="footer-brand">© {new Date().getFullYear()} Royal Route. All rights reserved.</p>
        <p className="footer-credit">Designed &amp; Developed by Supain Nandy</p>
      </footer>
    </>
  );
};

export default Dashboard;