import React, { useEffect, useState } from "react";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("userToken");

      const res = await fetch(
        "http://localhost:8000/users/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (res.ok) {
        setUser(data);
        setName(data.name);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateProfile = async () => {
    try {
      const token = localStorage.getItem("userToken");

      const body = {
        name,
      };

      if (password.trim()) {
        body.password = password;
      }

      const res = await fetch(
        "http://localhost:8000/users/update",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("Profile Updated Successfully");
        setUser(data.user);
        setPassword("");
        setEditMode(false);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("userToken");

      const res = await fetch(
        "http://localhost:8000/users/delete",
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("Account Deleted Successfully");

        localStorage.removeItem("userToken");

        window.location.href = "/login-user";
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!user) {
    return (
      <div
        style={{
          color: "white",
          textAlign: "center",
          marginTop: "50px",
        }}
      >
        Loading...
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#000,#111,#1a1a1a)",
        padding: "40px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "700px",
          background: "#111",
          border: "1px solid #FFD700",
          borderRadius: "25px",
          padding: "35px",
          boxShadow: "0 0 30px rgba(255,215,0,.2)",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <img
            src={`https://ui-avatars.com/api/?name=${user.name}&background=FFD700&color=000`}
            alt=""
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              border: "4px solid #FFD700",
            }}
          />

          {editMode ? (
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "20px",
                borderRadius: "10px",
              }}
            />
          ) : (
            <h1
              style={{
                color: "#FFD700",
                marginTop: "15px",
              }}
            >
              {user.name}
            </h1>
          )}

          <p style={{ color: "#aaa" }}>
            Premium Member
          </p>
        </div>

        <div
          style={{
            marginTop: "30px",
            display: "grid",
            gap: "20px",
          }}
        >
          <div
            style={{
              background: "#1a1a1a",
              padding: "15px",
              borderRadius: "12px",
            }}
          >
            <h4 style={{ color: "#FFD700" }}>
              Email
            </h4>
            <p style={{ color: "white" }}>
              {user.email}
            </p>
          </div>

          <div
            style={{
              background: "#1a1a1a",
              padding: "15px",
              borderRadius: "12px",
            }}
          >
            <h4 style={{ color: "#FFD700" }}>
              Role
            </h4>
            <p style={{ color: "white" }}>
              {user.role}
            </p>
          </div>

          {editMode && (
            <div
              style={{
                background: "#1a1a1a",
                padding: "15px",
                borderRadius: "12px",
              }}
            >
              <h4 style={{ color: "#FFD700" }}>
                New Password
              </h4>

              <input
                type="password"
                placeholder="Enter New Password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "10px",
                }}
              />
            </div>
          )}
        </div>

        {!editMode ? (
          <button
            onClick={() => setEditMode(true)}
            style={{
              width: "100%",
              marginTop: "25px",
              padding: "15px",
              background: "#FFD700",
              color: "#000",
              border: "none",
              borderRadius: "12px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Edit Profile
          </button>
        ) : (
          <button
            onClick={updateProfile}
            style={{
              width: "100%",
              marginTop: "25px",
              padding: "15px",
              background: "#FFD700",
              color: "#000",
              border: "none",
              borderRadius: "12px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Save Changes
          </button>
        )}

        <button
          onClick={deleteAccount}
          style={{
            width: "100%",
            marginTop: "15px",
            padding: "15px",
            background: "#ff3b30",
            color: "#fff",
            border: "none",
            borderRadius: "12px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default UserProfile;