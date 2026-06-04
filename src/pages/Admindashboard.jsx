import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useContext } from "react";
import { authContext } from "../context/contextApi";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:8000";




// ─── helpers ───────────────────────────────────────────────
const authHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
});

const multipartHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
    "Content-Type": "multipart/form-data",
});

// ─── small reusable components ──────────────────────────────
const Badge = ({ status }) => {
    const map = {
        pending: { bg: "#fff8e6", color: "#b8860b", label: "Pending" },
        confirmed: { bg: "#e8f5e9", color: "#2e7d32", label: "Confirmed" },
        cancelled: { bg: "#fce4e4", color: "#c62828", label: "Cancelled" },
        completed: { bg: "#e3f2fd", color: "#1565c0", label: "Completed" },
    };
    const s = map[status] || { bg: "#f0f0f0", color: "#555", label: status };
    return (
        <span style={{
            background: s.bg, color: s.color,
            fontSize: 11, fontWeight: 600, padding: "3px 10px",
            borderRadius: 20, letterSpacing: "0.5px",
        }}>{s.label}</span>
    );
};

const Modal = ({ title, onClose, children }) => (
    <div style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 1000, padding: 20,
    }}>
        <div style={{
            background: "#fff", borderRadius: 18, width: "100%",
            maxWidth: 560, maxHeight: "90vh", overflowY: "auto",
            padding: "28px 28px 24px",
        }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, fontWeight: 600, color: "#0f1117", margin: 0 }}>{title}</h3>
                <button onClick={onClose} style={{
                    background: "#f2f1ee", border: "none", borderRadius: "50%",
                    width: 32, height: 32, cursor: "pointer", fontSize: 16,
                    display: "flex", alignItems: "center", justifyContent: "center",
                }}>×</button>
            </div>
            {children}
        </div>
    </div>
);

const Field = ({ label, children }) => (
    <div style={{ marginBottom: 14 }}>
        <label style={{
            display: "block", fontSize: 11, fontWeight: 600,
            letterSpacing: "0.8px", textTransform: "uppercase",
            color: "#999", marginBottom: 5,
        }}>{label}</label>
        {children}
    </div>
);

const inputStyle = {
    width: "100%", padding: "10px 13px",
    border: "1.5px solid #e8e5e0", borderRadius: 10,
    fontSize: 14, fontFamily: "'DM Sans',sans-serif",
    color: "#0f1117", background: "#fafaf8",
    outline: "none", boxSizing: "border-box",
};

const btnPrimary = {
    padding: "11px 24px", background: "#0f1117", color: "#fff",
    border: "none", borderRadius: 10, fontFamily: "'DM Sans',sans-serif",
    fontSize: 14, fontWeight: 600, cursor: "pointer",
    display: "inline-flex", alignItems: "center", gap: 6,
};

const btnDanger = {
    ...btnPrimary, background: "#c62828",
};

const btnGold = {
    ...btnPrimary, background: "#d4af37", color: "#0f1117",
};

// ────────────────────────────────────────────────────────────
//  SECTION: Cars
// ────────────────────────────────────────────────────────────
const CarsSection = () => {
    const [cars, setCars] = useState([]);
    const [showAdd, setShowAdd] = useState(false);
    const [editCar, setEditCar] = useState(null);
    const [loading, setLoading] = useState(false);

    const emptyForm = {
        brand: "", model: "", fuelType: "petrol",
        transmission: "Manual", seats: 4,
        location: "", year: new Date().getFullYear(),
        pricePerDay: "", available: true,
    };
    const [form, setForm] = useState(emptyForm);
    const [images, setImages] = useState([]);
    const fileRef = useRef();

    const fetchCars = async () => {
        const res = await axios.get(`${API}/cars`);
        setCars(res.data.data);
    };
    useEffect(() => { fetchCars(); }, []);

    const handleField = (k, v) => setForm(p => ({ ...p, [k]: v }));

    const openAdd = () => { setForm(emptyForm); setImages([]); setShowAdd(true); };
    const openEdit = (car) => {
        setEditCar(car);

        setForm({
            brand: car.brand || "",
            model: car.model || "",
            fuelType: car.fuelType || "petrol",
            transmission: car.transmission || "Manual",
            seats: car.seats || 4,
            location: car.location || "",
            year: car.year || new Date().getFullYear(),
            pricePerDay: car.pricePerDay || "",
            available: car.available ?? true,
        });

        setImages([]);
    };

    const handleAdd = async () => {
        try {
            setLoading(true);
            const fd = new FormData();
            Object.entries(form).forEach(([k, v]) => fd.append(k, v));
            images.forEach(f => fd.append("images", f));
            await axios.post(`${API}/cars/add-cars`, fd, { headers: multipartHeaders() });
            setShowAdd(false); fetchCars();
        } catch (e) { alert(e.response?.data?.message || "Error adding car"); }
        finally { setLoading(false); }
    };

    const handleUpdate = async () => {
        try {
            setLoading(true);
            const fd = new FormData();
            Object.entries(form).forEach(([k, v]) => fd.append(k, v));
            images.forEach(f => fd.append("images", f));
            await axios.put(`${API}/cars/update-car/${editCar._id}`, fd, { headers: multipartHeaders() });
            setEditCar(null); fetchCars();
        } catch (e) { alert(e.response?.data?.message || "Error updating car"); }
        finally { setLoading(false); }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this car?")) return;
        await axios.delete(`${API}/cars/delete-car/${id}`, { headers: authHeaders() });
        fetchCars();
    };



    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <div>
                    <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 600, color: "#0f1117", margin: 0 }}>Fleet Management</h2>
                    <p style={{ fontSize: 13, color: "#999", margin: "4px 0 0" }}>{cars.length} cars in fleet</p>
                </div>
                <button style={btnGold} onClick={openAdd}>+ Add Car</button>
            </div>

            {/* Cars table */}
            <div style={{ background: "#fff", borderRadius: 16, border: "1px solid rgba(0,0,0,0.07)", overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        <tr style={{ background: "#0f1117" }}>
                            {["Car", "Fuel / Trans.", "Seats", "Location", "Year", "Price/Day", "Status", "Actions"].map(h => (
                                <th key={h} style={{ padding: "14px 16px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "#d4af37", letterSpacing: "0.8px", textTransform: "uppercase", whiteSpace: "nowrap" }}>{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {cars.map((car, i) => (
                            <tr key={car._id} style={{ background: i % 2 === 0 ? "#fff" : "#fafaf8", borderBottom: "1px solid #f0ede8" }}>
                                <td style={{ padding: "14px 16px" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                        {car.images?.[0] && <img src={car.images[0]} alt="" style={{ width: 52, height: 40, objectFit: "cover", borderRadius: 8 }} />}
                                        <div>
                                            <p style={{ margin: 0, fontWeight: 600, fontSize: 14, color: "#0f1117" }}>{car.brand} {car.model}</p>
                                        </div>
                                    </div>
                                </td>
                                <td style={{ padding: "14px 16px", fontSize: 13, color: "#555" }}>{car.fuelType} / {car.transmission}</td>
                                <td style={{ padding: "14px 16px", fontSize: 13, color: "#555" }}>{car.seats}</td>
                                <td style={{ padding: "14px 16px", fontSize: 13, color: "#555" }}>{car.location}</td>
                                <td style={{ padding: "14px 16px", fontSize: 13, color: "#555" }}>{car.year}</td>
                                <td style={{ padding: "14px 16px", fontSize: 14, fontWeight: 600, color: "#0f1117" }}>₹{car.pricePerDay}</td>
                                <td style={{ padding: "14px 16px" }}>
                                    <span style={{
                                        background: car.available ? "#e8f5e9" : "#fce4e4",
                                        color: car.available ? "#2e7d32" : "#c62828",
                                        fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20,
                                    }}>{car.available ? "Available" : "Booked"}</span>
                                </td>
                                <td style={{ padding: "14px 16px" }}>
                                    <div style={{ display: "flex", gap: 8 }}>
                                        <button
                                            onClick={() => openEdit(car)}
                                            style={{ padding: "7px 14px", background: "#f2f1ee", border: "none", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer", color: "#0f1117" }}
                                        >Edit</button>
                                        <button
                                            onClick={() => handleDelete(car._id)}
                                            style={{ padding: "7px 14px", background: "#fce4e4", border: "none", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer", color: "#c62828" }}
                                        >Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {cars.length === 0 && (
                            <tr><td colSpan={8} style={{ padding: 40, textAlign: "center", color: "#bbb", fontSize: 14 }}>No cars found</td></tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Add modal */}
            {showAdd && (
                <Modal title="Add New Car" onClose={() => setShowAdd(false)}>
                    <CarForm form={form}
                        handleField={handleField}
                        images={images}
                        setImages={setImages}
                        fileRef={fileRef}
                        loading={loading} onSubmit={handleAdd} submitLabel="Add Car" />
                </Modal>
            )}

            {/* Edit modal */}
            {editCar && (
                <Modal
                    title={`Edit — ${editCar.brand} ${editCar.model}`}
                    onClose={() => setEditCar(null)}
                >
                    <CarForm
                        form={form}
                        handleField={handleField}
                        images={images}
                        setImages={setImages}
                        fileRef={fileRef}
                        loading={loading}
                        onSubmit={handleUpdate}
                        submitLabel="Save Changes"
                    />
                </Modal>
            )}
        </div>
    );
};


//Car form used for both add and edit
const CarForm = ({ form,
    handleField,
    images,
    setImages,
    fileRef,
    loading,
    onSubmit,
    submitLabel, }) => {
    return (
        <div>
            {/* Basic Info */}
            <div
                style={{
                    background: "#fafaf8",
                    padding: "20px",
                    borderRadius: "14px",
                    marginBottom: "20px",
                }}
            >
                <h4
                    style={{
                        marginBottom: "16px",
                        color: "#0f1117",
                    }}
                >
                    Car Information
                </h4>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fit,minmax(220px,1fr))",
                        gap: "16px",
                    }}
                >
                    <Field label="Brand">
                        <input
                            style={inputStyle}
                            value={form.brand}
                            onChange={(e) =>
                                handleField("brand", e.target.value)
                            }
                            placeholder="BMW"
                        />
                    </Field>

                    <Field label="Model">
                        <input
                            style={inputStyle}
                            value={form.model}
                            onChange={(e) =>
                                handleField("model", e.target.value)
                            }
                            placeholder="X5"
                        />
                    </Field>

                    <Field label="Location">
                        <input
                            style={inputStyle}
                            value={form.location}
                            onChange={(e) =>
                                handleField("location", e.target.value)
                            }
                            placeholder="Kolkata"
                        />
                    </Field>

                    <Field label="Fuel Type">
                        <select
                            style={inputStyle}
                            value={form.fuelType}
                            onChange={(e) =>
                                handleField(
                                    "fuelType",
                                    e.target.value
                                )
                            }
                        >
                            <option value="petrol">
                                Petrol
                            </option>
                            <option value="diesel">
                                Diesel
                            </option>
                            <option value="electric">
                                Electric
                            </option>
                            <option value="hybrid">
                                Hybrid
                            </option>
                        </select>
                    </Field>

                    <Field label="Transmission">
                        <select
                            style={inputStyle}
                            value={form.transmission}
                            onChange={(e) =>
                                handleField(
                                    "transmission",
                                    e.target.value
                                )
                            }
                        >
                            <option value="Manual">
                                Manual
                            </option>
                            <option value="Automatic">
                                Automatic
                            </option>
                        </select>
                    </Field>

                    <Field label="Seats">
                        <input
                            style={inputStyle}
                            type="number"
                            value={form.seats}
                            onChange={(e) =>
                                handleField(
                                    "seats",
                                    e.target.value
                                )
                            }
                        />
                    </Field>

                    <Field label="Year">
                        <input
                            style={inputStyle}
                            type="number"
                            value={form.year}
                            onChange={(e) =>
                                handleField(
                                    "year",
                                    e.target.value
                                )
                            }
                        />
                    </Field>

                    <Field label="Price Per Day">
                        <input
                            style={inputStyle}
                            type="number"
                            value={form.pricePerDay}
                            onChange={(e) =>
                                handleField(
                                    "pricePerDay",
                                    e.target.value
                                )
                            }
                            placeholder="2000"
                        />
                    </Field>

                    <Field label="Available">
                        <select
                            style={inputStyle}
                            value={form.available}
                            onChange={(e) =>
                                handleField(
                                    "available",
                                    e.target.value === "true"
                                )
                            }
                        >
                            <option value="true">
                                Available
                            </option>
                            <option value="false">
                                Not Available
                            </option>
                        </select>
                    </Field>
                </div>
            </div>

            {/* Upload Images */}
            <div
                style={{
                    background: "#fafaf8",
                    padding: "20px",
                    borderRadius: "14px",
                    marginBottom: "20px",
                }}
            >
                <h4
                    style={{
                        marginBottom: "16px",
                        color: "#0f1117",
                    }}
                >
                    Car Images
                </h4>

                <div
                    onClick={() =>
                        fileRef.current?.click()
                    }
                    style={{
                        border:
                            "2px dashed #d4af37",
                        borderRadius: "12px",
                        padding: "30px",
                        textAlign: "center",
                        cursor: "pointer",
                        background: "#fff",
                    }}
                >
                    <input
                        ref={fileRef}
                        type="file"
                        multiple
                        accept="image/*"
                        style={{
                            display: "none",
                        }}
                        onChange={(e) =>
                            setImages(
                                Array.from(
                                    e.target.files
                                ).slice(0, 5)
                            )
                        }
                    />

                    <h4>
                        Click To Upload Images
                    </h4>

                    <p
                        style={{
                            color: "#777",
                        }}
                    >
                        Maximum 5 images
                    </p>

                    {images.length > 0 && (
                        <p
                            style={{
                                color: "#2e7d32",
                                fontWeight: "600",
                            }}
                        >
                            {images.length} files selected
                        </p>
                    )}
                </div>
            </div>

            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-end",
                }}
            >
                <button
                    style={{
                        ...btnGold,
                        minWidth: "180px",
                    }}
                    onClick={onSubmit}
                    disabled={loading}
                >
                    {loading
                        ? "Saving..."
                        : submitLabel}
                </button>
            </div>
        </div>
    );
};
// ────────────────────────────────────────────────────────────
//  SECTION: Bookings
// ────────────────────────────────────────────────────────────
const BookingsSection = () => {
    const [history, setHistory] =
        useState([]);
    const [bookings, setBookings] = useState([]);
    const [statusModal, setStatusModal] = useState(null);
    const [newStatus, setNewStatus] = useState("");

    const fetchBookings = async () => {
        try {
            const res = await axios.get(`${API}/bookings/all`, { headers: authHeaders() });
            setBookings(res.data.bookings);
        } catch (e) { console.log(e); }
    };
    useEffect(() => { fetchBookings(); }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this booking? The car will become available again.")) return;
        await axios.delete(`${API}/bookings/delete/${id}`, { headers: authHeaders() });
        fetchBookings();
    };

    const openStatus = (booking) => {
        if (!booking) return;

        setStatusModal(booking);
        setNewStatus(
            booking.bookingStatus || "Pending"
        );
    };

    const handleUpdateStatus = async () => {
        try {
            if (!statusModal?._id) return;

            if (newStatus === "Approved") {
                await axios.put(
                    `${API}/admin/booking/approve/${statusModal._id}`,
                    {},
                    { headers: authHeaders() }
                );
            }

            if (newStatus === "Rejected") {
                await axios.put(
                    `${API}/admin/booking/reject/${statusModal._id}`,
                    {},
                    { headers: authHeaders() }
                );
            }

            setStatusModal(null);

            fetchBookings();
            fetchHistory();

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        const res = await axios.get(
            `${API}/admin/booking-history`,
            {
                headers: {
                    Authorization:
                        `Bearer ${localStorage.getItem("adminToken")}`
                }
            }
        );

        setHistory(res.data.history);
    };

    const fmt = (d) => d ? new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—";

    return (
        <div>
            <div style={{ marginBottom: 20 }}>
                <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 600, color: "#0f1117", margin: 0 }}>Booking Management</h2>
                <p style={{ fontSize: 13, color: "#999", margin: "4px 0 0" }}>{bookings.length} total bookings</p>
            </div>

            <div style={{ background: "#fff", borderRadius: 16, border: "1px solid rgba(0,0,0,0.07)", overflow: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 760 }}>
                    <thead>
                        <tr style={{ background: "#0f1117" }}>
                            {["Customer", "Car", "Pickup", "Return", "Amount", "Status", "Actions"].map(h => (
                                <th key={h} style={{ padding: "14px 16px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "#d4af37", letterSpacing: "0.8px", textTransform: "uppercase", whiteSpace: "nowrap" }}>{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((b, i) => (
                            <tr key={b._id} style={{ background: i % 2 === 0 ? "#fff" : "#fafaf8", borderBottom: "1px solid #f0ede8" }}>
                                <td style={{ padding: "14px 16px" }}>
                                    <p style={{ margin: 0, fontWeight: 600, fontSize: 14, color: "#0f1117" }}>{b.userId?.name || "—"}</p>
                                    <p style={{ margin: 0, fontSize: 12, color: "#999" }}>{b.userId?.email || ""}</p>
                                </td>
                                <td style={{ padding: "14px 16px" }}>
                                    <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: "#0f1117" }}>{b.carId?.brand} {b.carId?.model}</p>
                                    <p style={{ margin: 0, fontSize: 12, color: "#999" }}>₹{b.carId?.pricePerDay}/day</p>
                                </td>
                                <td style={{ padding: "14px 16px", fontSize: 13, color: "#555" }}>{fmt(b.pickupDate)}</td>
                                <td style={{ padding: "14px 16px", fontSize: 13, color: "#555" }}>{fmt(b.returnDate)}</td>
                                <td style={{ padding: "14px 16px", fontSize: 14, fontWeight: 700, color: "#0f1117" }}>₹{b.totalAmount?.toLocaleString()}</td>
                                <td style={{ padding: "14px 16px" }}><Badge status={b.bookingStatus || "pending"} /></td>
                                <td style={{ padding: "14px 16px" }}>
                                    <div style={{ display: "flex", gap: 8 }}>
                                        <button
                                            onClick={() => openStatus(b)}
                                            style={{ padding: "7px 12px", background: "#e3f2fd", border: "none", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer", color: "#1565c0" }}
                                        >Status</button>
                                        <button
                                            onClick={() => handleDelete(b._id)}
                                            style={{ padding: "7px 12px", background: "#fce4e4", border: "none", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer", color: "#c62828" }}
                                        >Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {bookings.length === 0 && (
                            <tr><td colSpan={7} style={{ padding: 40, textAlign: "center", color: "#bbb", fontSize: 14 }}>No bookings found</td></tr>
                        )}
                    </tbody>
                </table>
            </div>

            {statusModal && (
                <Modal
                    title="Update Booking Status"
                    onClose={() => setStatusModal(null)}
                >
                    <div style={{ marginBottom: 16 }}>
                        <p
                            style={{
                                fontSize: 14,
                                color: "#555",
                                margin: "0 0 4px",
                            }}
                        >
                            <strong>
                                {statusModal?.userId?.name || "User"}
                            </strong>
                            {" - "}
                            {statusModal?.carId?.brand || ""}
                            {" "}
                            {statusModal?.carId?.model || ""}
                        </p>

                        <p
                            style={{
                                fontSize: 13,
                                color: "#999",
                                margin: 0,
                            }}
                        >
                            Current Status :
                            {" "}
                            {statusModal?.bookingStatus || "Pending"}
                        </p>
                    </div>

                    <Field label="New Status">
                        <select
                            style={inputStyle}
                            value={newStatus}
                            onChange={(e) =>
                                setNewStatus(e.target.value)
                            }
                        >
                            <option value="Pending">
                                Pending
                            </option>

                            <option value="Approved">
                                Approved
                            </option>

                            <option value="Rejected">
                                Rejected
                            </option>
                        </select>
                    </Field>

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: 10,
                            marginTop: 20,
                        }}
                    >
                        <button
                            onClick={() =>
                                setStatusModal(null)
                            }
                            style={{
                                padding: "10px 16px",
                                border: "none",
                                borderRadius: 8,
                                cursor: "pointer",
                            }}
                        >
                            Cancel
                        </button>

                        <button
                            onClick={handleUpdateStatus}
                            style={btnGold}
                        >
                            Update
                        </button>
                    </div>
                </Modal>
            )}
        </div>
    );
};

// ────────────────────────────────────────────────────────────
//  SECTION: Overview stats
// ────────────────────────────────────────────────────────────
const OverviewSection = () => {
    const [cars, setCars] = useState([]);
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        axios.get(`${API}/cars`).then(r => setCars(r.data.data)).catch(() => { });
        axios.get(`${API}/bookings/all`, { headers: authHeaders() }).then(r => setBookings(r.data.bookings)).catch(() => { });
    }, []);

    const totalRevenue = bookings.reduce((acc, b) => acc + (b.totalAmount || 0), 0);
    const availableCars = cars.filter(c => c.available).length;
    const bookedCars = cars.length - availableCars;
    const activeBookings = bookings.filter(b => b.bookingStatus === "confirmed").length;

    const historyBookings = bookings.filter(
        (b) =>
            b.bookingStatus === "Completed" ||
            b.bookingStatus === "Rejected" ||
            b.bookingStatus === "Cancelled"
    ).length;

    const stats = [
        {
            label: "Total Cars",
            value: cars.length,
            icon: "",
        },
        {
            label: "Total Bookings",
            value: bookings.length,
            icon: "",
        },
        {
            label: "History Bookings",
            value: historyBookings,
            icon: "",
        },
        {
            label: "Revenue",
            value: `₹${totalRevenue.toLocaleString()}`,
            icon: "",
        },
    ];
    // Recent 5 bookings
    const recent = [...bookings].slice(0, 5);
    const fmt = (d) => d ? new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short" }) : "—";

    return (
        <div>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 600, color: "#0f1117", margin: "0 0 24px" }}>Overview</h2>

            {/* Stat cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 16, marginBottom: 32 }}>
                {stats.map(s => (
                    <div key={s.label} style={{
                        background: "#fff", borderRadius: 14,
                        border: "1px solid rgba(0,0,0,0.07)",
                        padding: "20px 18px",
                    }}>
                        <div style={{ fontSize: 26, marginBottom: 10 }}>{s.icon}</div>
                        <p style={{ margin: 0, fontSize: 11, fontWeight: 600, letterSpacing: "0.8px", textTransform: "uppercase", color: "#999", marginBottom: 4 }}>{s.label}</p>
                        <p style={{ margin: 0, fontSize: 24, fontFamily: "'Playfair Display',serif", fontWeight: 600, color: "#0f1117" }}>{s.value}</p>
                    </div>
                ))}
            </div>

            {/* Recent bookings */}
            <div>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 18, fontWeight: 500, color: "#0f1117", margin: "0 0 16px" }}>Recent Bookings</h3>
                <div style={{ background: "#fff", borderRadius: 16, border: "1px solid rgba(0,0,0,0.07)", overflow: "hidden" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                            <tr style={{ background: "#0f1117" }}>
                                {["Customer", "Car", "Pickup", "Amount", "Status"].map(h => (
                                    <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "#d4af37", letterSpacing: "0.8px", textTransform: "uppercase" }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {recent.map((b, i) => (
                                <tr key={b._id} style={{ background: i % 2 === 0 ? "#fff" : "#fafaf8", borderBottom: "1px solid #f0ede8" }}>
                                    <td style={{ padding: "12px 16px", fontSize: 14, fontWeight: 500, color: "#0f1117" }}>{b.userId?.name || "—"}</td>
                                    <td style={{ padding: "12px 16px", fontSize: 13, color: "#555" }}>{b.carId?.brand} {b.carId?.model}</td>
                                    <td style={{ padding: "12px 16px", fontSize: 13, color: "#555" }}>{fmt(b.pickupDate)}</td>
                                    <td style={{ padding: "12px 16px", fontSize: 14, fontWeight: 700, color: "#0f1117" }}>₹{b.totalAmount?.toLocaleString()}</td>
                                    <td style={{ padding: "12px 16px" }}><Badge status={b.bookingStatus || "pending"} /></td>
                                </tr>
                            ))}
                            {recent.length === 0 && (
                                <tr><td colSpan={5} style={{ padding: 32, textAlign: "center", color: "#bbb", fontSize: 14 }}>No recent bookings</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

//******************History Bookings */
const HistorySection = () => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        try {
            const res = await axios.get(
                `${API}/admin/booking-history`,
                {
                    headers: authHeaders(),
                }
            );

            setHistory(res.data.history || []);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <h2
                style={{
                    fontSize: "28px",
                    marginBottom: "20px",
                }}
            >
                Booking History
            </h2>

            <div
                style={{
                    background: "#fff",
                    borderRadius: "16px",
                    overflow: "hidden",
                    border: "1px solid #eee",
                }}
            >
                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                    }}
                >
                    <thead>
                        <tr
                            style={{
                                background: "#0f1117",
                            }}
                        >
                            <th style={{ padding: "15px", color: "#d4af37" }}>
                                Customer
                            </th>

                            <th style={{ padding: "15px", color: "#d4af37" }}>
                                Car
                            </th>

                            <th style={{ padding: "15px", color: "#d4af37" }}>
                                Amount
                            </th>

                            <th style={{ padding: "15px", color: "#d4af37" }}>
                                Status
                            </th>

                            <th style={{ padding: "15px", color: "#d4af37" }}>
                                Date
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {history.length > 0 ? (
                            history.map((item) => (
                                <tr key={item._id}>
                                    <td style={{ padding: "15px" }}>
                                        {item.customerName}
                                    </td>

                                    <td style={{ padding: "15px" }}>
                                        {item.carName}
                                    </td>

                                    <td style={{ padding: "15px" }}>
                                        ₹{item.totalAmount}
                                    </td>

                                    <td style={{ padding: "15px" }}>
                                        {item.status}
                                    </td>

                                    <td style={{ padding: "15px" }}>
                                        {new Date(
                                            item.actionDate
                                        ).toLocaleString()}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="5"
                                    style={{
                                        textAlign: "center",
                                        padding: "40px",
                                    }}
                                >
                                    No Booking History Found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// ────────────────────────────────────────────────────────────
//  MAIN AdminDashboard
// ────────────────────────────────────────────────────────────
const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState("overview");

    const adminName = (() => {
        try {
            const token = localStorage.getItem("adminToken");
            if (!token) return "Admin";
            const payload = JSON.parse(atob(token.split(".")[1]));
            return payload.name || "Admin";
        } catch { return "Admin"; }
    })();

    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        navigate("/login-admin");
    };

    const tabs = [
        { id: "overview", label: "Overview", icon: "📊" },
        { id: "cars", label: "Fleet", icon: "🚗" },
        { id: "bookings", label: "Bookings", icon: "📋" },
        { id: "history", label: "History", icon: "📜" },
    ];

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600&family=DM+Sans:wght@300;400;500;600&display=swap');
                *, *::before, *::after { box-sizing: border-box; }
                body { margin: 0; }

                .adm-root {
                min-height: 100vh;
                background: #f6f5f2;
                font-family: 'DM Sans', sans-serif;
                display: flex;
                flex-direction: column;
                }

                /* Topbar */
                .adm-topbar {
                background: #0f1117;
                padding: 0 32px;
                height: 64px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                position: sticky;
                top: 0;
                z-index: 100;
                border-bottom: 1px solid rgba(212,175,55,0.15);
                }
                .adm-brand {
                font-family: 'Playfair Display', serif;
                font-size: 20px;
                font-weight: 600;
                color: #fff;
                display: flex;
                align-items: center;
                gap: 10px;
                }
                .adm-brand span { color: #d4af37; }
                .adm-topright {
                display: flex;
                align-items: center;
                gap: 16px;
                }
                .adm-admin-name {
                font-size: 13px;
                color: rgba(255,255,255,0.6);
                }
                .adm-admin-name strong { color: #fff; }
                .adm-logout {
                background: rgba(255,255,255,0.07);
                border: 1px solid rgba(255,255,255,0.12);
                color: rgba(255,255,255,0.7);
                border-radius: 8px;
                padding: 7px 14px;
                font-family: 'DM Sans', sans-serif;
                font-size: 13px;
                cursor: pointer;
                transition: background 0.2s;
                }
                .adm-logout:hover { background: rgba(255,255,255,0.13); }

                /* Tab nav */
                .adm-tabnav {
                background: #fff;
                border-bottom: 1px solid #ede9e3;
                padding: 0 32px;
                display: flex;
                gap: 4px;
                }
                .adm-tab {
                padding: 16px 20px;
                border: none;
                background: none;
                font-family: 'DM Sans', sans-serif;
                font-size: 14px;
                font-weight: 500;
                color: #999;
                cursor: pointer;
                border-bottom: 3px solid transparent;
                transition: color 0.2s, border-color 0.2s;
                display: flex;
                align-items: center;
                gap: 7px;
                }
                .adm-tab:hover { color: #0f1117; }
                .adm-tab.active {
                color: #0f1117;
                border-bottom-color: #d4af37;
                font-weight: 600;
                }

                /* Content */
                .adm-content {
                flex: 1;
                max-width: 1300px;
                margin: 0 auto;
                padding: 36px 24px 60px;
                width: 100%;
                }

                /* Scrollbar */
                ::-webkit-scrollbar { width: 6px; height: 6px; }
                ::-webkit-scrollbar-track { background: #f6f5f2; }
                ::-webkit-scrollbar-thumb { background: #d4af37; border-radius: 3px; }
            `}</style>

            <div className="adm-root">
                {/* Topbar */}
                <div className="adm-topbar">
                    <div className="adm-brand">
                        🚗 <span>Royal Route </span>Admin
                    </div>
                    <div className="adm-topright">
                        <span className="adm-admin-name">
                            Logged in as <strong>{adminName}</strong>
                        </span>
                        <button className="adm-logout" onClick={handleLogout}>Logout</button>
                    </div>

                    <button
                        onClick={() => navigate("/admin/admin-ai")}
                        style={{
                            background: "linear-gradient(135deg, #d4af37, #f5d76e)",
                            color: "#000",
                            border: "none",
                            padding: "14px 30px",
                            borderRadius: "12px",
                            fontSize: "15px",
                            fontWeight: "700",
                            cursor: "pointer",
                            boxShadow: "0 4px 15px rgba(212,175,55,0.3)",
                            transition: "all 0.3s ease",
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.transform = "translateY(-3px)";
                            e.target.style.boxShadow =
                                "0 8px 25px rgba(212,175,55,0.5)";
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = "translateY(0)";
                            e.target.style.boxShadow =
                                "0 4px 15px rgba(212,175,55,0.3)";
                        }}
                    >
                        🤖 Open AI Agent
                    </button>
                </div>

                {/* Tab nav */}
                <div className="adm-tabnav">
                    {tabs.map(t => (
                        <button
                            key={t.id}
                            className={`adm-tab ${activeTab === t.id ? "active" : ""}`}
                            onClick={() => setActiveTab(t.id)}
                        >
                            {t.icon} {t.label}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="adm-content">
                    {activeTab === "overview" &&
                        <OverviewSection />}

                    {activeTab === "cars" &&
                        <CarsSection />}

                    {activeTab === "bookings" &&
                        <BookingsSection />}

                    {activeTab === "history" &&
                        <HistorySection />}
                </div>
            </div>
        </>
    );
};

export default AdminDashboard;