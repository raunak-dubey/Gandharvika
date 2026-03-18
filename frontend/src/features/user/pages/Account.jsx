import { useState } from "react";
import "../styles/account.scss";
import useUser from "../hooks/queries/useUser";
import {
  updateUserSchema,
  updatePasswordSchema,
  avatarSchema,
} from "../validators/user.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

const Account = () => {
  const {
    user,
    updateUser,
    updatePassword,
    deleteUser,
    logoutUser,

    logoutSession,
    sessions,
    isLoading,
  } = useUser();

  // ? ============= State ============= //
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  // ? ============= Profile Form =============== //

  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    reset,
    setValue,
    formState: { errors: profileErrors },
  } = useForm({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      username: user?.username || "Anonymous",
      email: user?.email || "Anonymous",
      avatarFile: null,
    },
  });

  useEffect(() => {
    if (!user) return;

    reset({
      username: user.username,
      email: user.email,
      avatarFile: null,
    });
  }, [user, reset]);

  const onProfileSubmit = async (data) => {
    await updateUser.mutateAsync({
      username: data.username.trim(),
      email: data.email.trim(),
      avatarFile: data.avatarFile,
    });
  };

  const handleAvatar = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      avatarSchema.parse({
        mimetype: file.type,
        size: file.size,
      });

      const previewUrl = URL.createObjectURL(file);
      if (avatarPreview?.startsWith("blob:")) {
        URL.revokeObjectURL(avatarPreview);
      }
      setAvatarPreview(previewUrl);
      setValue("avatarFile", file);
    } catch (err) {
      console.error(err);
    }
  };

  // ? ============= Password Form =============== //
  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    reset: resetPasswordForm,
    formState: { errors: passwordErrors },
  } = useForm({
    resolver: zodResolver(updatePasswordSchema),
  });

  const onPasswordSubmit = async (data) => {
    await updatePassword.mutateAsync({
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    });
    resetPasswordForm();
    setShowPassword(false);
  };
  // ? ============= Logout All ============= //
  const handleLogoutAll = async () => {
    const others = sessions.filter((s) => !s.current);
    await Promise.all(others.map((s) => logoutSession.mutateAsync(s._id)));
  };

  const handleLogoutCurrent = async () => {
    await logoutUser.mutateAsync();
  };

  return (
    <div className="account-container">
      <div className="account-header">
        <div>
          <h1>Account Settings</h1>
          <p>Manage your profile, security and sessions</p>
        </div>

        <button
          className="danger-btn"
          onClick={handleLogoutCurrent}
          disabled={logoutSession.isPending}
        >
          {logoutSession.isPending ? "Logging out..." : "Logout"}
        </button>
      </div>

      {/* PROFILE */}
      <div className="settings-section">
        <h2>Profile</h2>

        <form onSubmit={handleProfileSubmit(onProfileSubmit)}>
          <div className="settings-row">
            <div className="label">Profile Picture</div>

            <div className="content avatar-row">
              <img
                src={
                  avatarPreview ||
                  user?.avatar ||
                  `https://ui-avatars.com/api/?name=${user?.username}`
                }
                alt="avatar"
              />

              <label className="avatar-btn">
                Change
                <input
                  required
                  type="file"
                  accept="image/*"
                  onChange={handleAvatar}
                  hidden
                />
              </label>
            </div>
          </div>

          {profileErrors.avatarFile && (
            <p className="error">{profileErrors.avatarFile.message}</p>
          )}
          <div className="settings-row">
            <div className="label">Username</div>
            <div className="content">
              <input {...registerProfile("username")} required />
            </div>
          </div>
          {profileErrors.username && (
            <p className="error">{profileErrors.username.message}</p>
          )}

          <div className="settings-row">
            <div className="label">Email</div>
            <div className="content">
              <input required {...registerProfile("email")} />
            </div>
          </div>
          {profileErrors.email && (
            <p className="error">{profileErrors.email.message}</p>
          )}

          <div className="actions">
            <button
              className="primary"
              type="submit"
              disabled={updateUser.isPending}
            >
              {updateUser.isPending ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>

      {/* PASSWORD */}
      <div className="settings-section">
        <h2>Password</h2>

        <form onSubmit={handlePasswordSubmit(onPasswordSubmit)}>
          {!showPassword ? (
            <button className="secondary" onClick={() => setShowPassword(true)}>
              Change Password
            </button>
          ) : (
            <>
              <div className="settings-row">
                <div className="label">Old Password</div>
                <div className="content">
                  <input
                    required
                    type="password"
                    {...registerPassword("oldPassword")}
                  />
                </div>
              </div>
              {passwordErrors.oldPassword && (
                <p className="error">{passwordErrors.oldPassword.message}</p>
              )}

              <div className="settings-row">
                <div className="label">New Password</div>
                <div className="content">
                  <input
                    required
                    type="password"
                    {...registerPassword("newPassword")}
                  />
                </div>
              </div>
              {passwordErrors.newPassword && (
                <p className="error">{passwordErrors.newPassword.message}</p>
              )}

              <div className="settings-row">
                <div className="label">Confirm Password</div>
                <div className="content">
                  <input
                    required
                    type="password"
                    {...registerPassword("confirmPassword")}
                  />
                </div>
              </div>
              {passwordErrors.confirmPassword && (
                <p className="error">
                  {passwordErrors.confirmPassword.message}
                </p>
              )}

              <div className="actions">
                <button
                  className="primary"
                  type="submit"
                  disabled={updatePassword.isPending}
                >
                  Update Password
                </button>
                <button
                  className="ghost"
                  onClick={() => setShowPassword(false)}
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </form>
      </div>

      {/* SESSIONS */}
      <div className="settings-section">
        <div className="section-header">
          <h2>Sessions</h2>
          <button className="ghost" onClick={handleLogoutAll}>
            Logout All
          </button>
        </div>

        <div className="sessions-list">
          {isLoading && <p>Loading Sessions...</p>}
          {!isLoading && sessions.length === 0 && (
            <p>No active sessions found.</p>
          )}

          {sessions.map((s) => (
            <div
              key={s._id}
              className={`session-item ${s.current ? "current" : ""}`}
            >
              <div>
                <div className="device">{s.device}</div>
                <div className="location">
                  {new Date(s.createdAt).toLocaleString()}
                </div>
              </div>

              <div className="session-right">
                <span
                  className={`badge ${
                    s.current ? "current" : s.active ? "active" : ""
                  }`}
                >
                  {s.current ? "This device" : s.active ? "Active" : "Inactive"}
                </span>

                {!s.current && (
                  <button
                    className="danger-text"
                    onClick={() => {
                      logoutSession.mutateAsync(s._id);
                    }}
                    disabled={logoutSession.isPending}
                  >
                    Logout
                  </button>
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
        <button
          className="danger-btn"
          onClick={() => deleteUser.mutate()}
          disabled={deleteUser.isPending}
        >
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default Account;
