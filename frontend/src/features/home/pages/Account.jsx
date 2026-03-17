import { useState } from "react";
import useAuth from "@/features/auth/hooks/useAuth";
import "../styles/music/account.scss";

const Account = () => {
  const { user } = useAuth();

  const [form, setForm] = useState({
    username: user?.username || "",
    email: user?.email || "",
    avatar: user?.avatar || "",
  });

  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const sessions = [
    {
      id: 1,
      device: "Chrome - Windows",
      location: "Pune, India",
      active: true,
      current: true,
    },
    {
      id: 2,
      device: "iPhone 13",
      location: "Mumbai, India",
      active: false,
      current: false,
    },
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };

  const handleAvatar = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, avatar: URL.createObjectURL(file) });
    }
  };

  return (
    <div className="account-container">
      {/* PROFILE */}
      <div className="settings-section">
        <h2>Profile</h2>

        <div className="settings-row">
          <div className="label">Profile Picture</div>

          <div className="content avatar-row">
            <img
              src={
                form.avatar ||
                "https://ui-avatars.com/api/?name=" + form.username
              }
              alt="avatar"
            />

            <label className="avatar-btn">
              Change
              <input type="file" accept="image/*" onChange={handleAvatar} hidden />
            </label>
          </div>
        </div>

        <div className="settings-row">
          <div className="label">Username</div>
          <div className="content">
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="settings-row">
          <div className="label">Email</div>
          <div className="content">
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="actions">
          <button className="primary">Save Changes</button>
        </div>
      </div>

      {/* PASSWORD */}
      <div className="settings-section">
        <h2>Password</h2>

        {!showPassword ? (
          <button
            className="secondary"
            onClick={() => setShowPassword(true)}
          >
            Change Password
          </button>
        ) : (
          <>
            <div className="settings-row">
              <div className="label">Old Password</div>
              <div className="content">
                <input
                  type="password"
                  name="oldPassword"
                  onChange={handlePasswordChange}
                />
              </div>
            </div>

            <div className="settings-row">
              <div className="label">New Password</div>
              <div className="content">
                <input
                  type="password"
                  name="newPassword"
                  onChange={handlePasswordChange}
                />
              </div>
            </div>

            <div className="settings-row">
              <div className="label">Confirm Password</div>
              <div className="content">
                <input
                  type="password"
                  name="confirmPassword"
                  onChange={handlePasswordChange}
                />
              </div>
            </div>

            <div className="actions">
              <button className="primary">Update Password</button>
              <button
                className="ghost"
                onClick={() => setShowPassword(false)}
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>

      {/* SESSIONS */}
      <div className="settings-section">
        <div className="section-header">
          <h2>Sessions</h2>
          <button className="ghost">Logout All</button>
        </div>

        <div className="sessions-list">
          {sessions.map((s) => (
            <div
              key={s.id}
              className={`session-item ${s.current ? "current" : ""}`}
            >
              <div>
                <div className="device">{s.device}</div>
                <div className="location">{s.location}</div>
              </div>

              <div className="session-right">
                <span
                  className={`badge ${
                    s.current ? "current" : s.active ? "active" : ""
                  }`}
                >
                  {s.current
                    ? "This device"
                    : s.active
                    ? "Active"
                    : "Inactive"}
                </span>

                {!s.current && (
                  <button className="danger-text">Logout</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DELETE */}
      <div className="settings-section danger">
        <h2>Danger Zone</h2>
        <p>Once you delete your account, there is no going back.</p>
        <button className="danger-btn">Delete Account</button>
      </div>
    </div>
  );
};

export default Account;