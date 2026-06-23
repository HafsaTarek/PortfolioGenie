import { useState, useRef, useEffect } from "react";
import {
  LuMail as Mail,
  LuMapPin as MapPin,
  LuGlobe as Globe,
  LuPhone as Phone,
  LuBriefcase as Briefcase,
  LuCamera as Camera,
  LuPencil as Pencil,
  LuCheck as Check,
  LuX as X,
  LuLock as Lock,
  LuUser as UserIcon,
} from "react-icons/lu";

import CTAButton from "../../components/shared/button/CTAButton";
import { useAuth } from "../../context/AuthContext";
import styles from "./ProfileSetting.module.css";

import { API_BASE_URL } from "../../config/api";

export default function ProfileSetting() {
  const { user, updateUserProfile, changeUserPassword } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [isSavingPassword, setIsSavingPassword] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    jobTitle: "",
    bio: "",
    website: "",
    location: "",
  });

  const fileInputRef = useRef(null);

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });


  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        phone: user.phone || "",
        jobTitle: user.jobTitle || "",
        bio: user.bio || "",
        website: user.website || "",
        location: user.location || "",
      });
    }
  }, [user]);


  useEffect(() => {
    return () => {
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Instant preview
    const localPreview = URL.createObjectURL(file);
    setPreviewImage(localPreview);

    try {
      setIsSaving(true);
      setSaveError(null);

      const formData = new FormData();
      formData.append("profileImage", file);

      await updateUserProfile(formData);

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      setSaveError(err.message);

      // Restore old image if upload fails
      setPreviewImage(null);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveProfile = async () => {
    try {
      setIsSaving(true);

      const formData = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });

      await updateUserProfile(formData);

      setSaveSuccess(true);
      setIsEditing(false);

      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      setSaveError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (
      passwordForm.newPassword !==
      passwordForm.confirmNewPassword
    ) {
      return setPasswordError("Passwords do not match");
    }

    try {
      setIsSavingPassword(true);

      await changeUserPassword(
        passwordForm.currentPassword,
        passwordForm.newPassword
      );

      setPasswordSuccess(true);

      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });

      setTimeout(() => setPasswordSuccess(false), 3000);
    } catch (err) {
      setPasswordError(err.message);
    } finally {
      setIsSavingPassword(false);
    }
  };

  const profileImageSrc = previewImage
    ? previewImage
    : user?.profileImage
      ? user.profileImage.startsWith("http")
        ? user.profileImage
        : `${API_BASE_URL}${user.profileImage}`
      : null;

  console.log("profileImage:", user?.profileImage);
  console.log("final src:", profileImageSrc);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>
          Profile
        </h1>

        <p className={styles.pageSubtitle}>
          Manage your account settings and profile information
        </p>

        {saveSuccess && (
          <div className={styles.success}>
            Profile updated successfully
          </div>
        )}

        {saveError && (
          <div className={styles.error}>
            {saveError}
          </div>
        )}

        {/* Profile Card */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>
              Profile Photo
            </h2>
          </div>

          <div className={styles.profileHeader}>
            <div className={styles.avatarWrapper}>
              {profileImageSrc ? (
                <img
                  src={profileImageSrc}
                  alt="Profile"
                  className={styles.avatar}
                />
              ) : (
                <div className={styles.avatarPlaceholder}>
                  <UserIcon size={50} />
                </div>
              )}

              <button
                type="button"
                className={styles.uploadBtn}
                onClick={() =>
                  fileInputRef.current?.click()
                }
                title="Change profile photo"
              >
                <Pencil size={14} />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>

            <div>
              <h3 className={styles.userName}>
                {user?.name}
              </h3>

              <p className={styles.jobTitle}>
                {user?.jobTitle || "No Job Title"}
              </p>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>
              Personal Information
            </h2>

            {!isEditing ? (
              <CTAButton
                onClick={() => setIsEditing(true)}
              >
                <Pencil /> Edit
              </CTAButton>
            ) : (
              <div>
                <CTAButton
                  onClick={handleSaveProfile}
                  disabled={isSaving}
                >
                  <Check />
                  Save
                </CTAButton>
              </div>
            )}
          </div>

          <div className={styles.formGrid}>
            <Field
              label="Full Name"
              value={form.name}
              editing={isEditing}
              onChange={(value) =>
                setForm({
                  ...form,
                  name: value,
                })
              }
            />

            <Field
              label="Phone"
              value={form.phone}
              editing={isEditing}
              onChange={(value) =>
                setForm({
                  ...form,
                  phone: value,
                })
              }
            />

            <Field
              label="Job Title"
              value={form.jobTitle}
              editing={isEditing}
              onChange={(value) =>
                setForm({
                  ...form,
                  jobTitle: value,
                })
              }
            />

            <Field
              label="Location"
              value={form.location}
              editing={isEditing}
              onChange={(value) =>
                setForm({
                  ...form,
                  location: value,
                })
              }
            />

            <Field
              label="Website"
              value={form.website}
              editing={isEditing}
              onChange={(value) =>
                setForm({
                  ...form,
                  website: value,
                })
              }
            />

            <div className={styles.field}>
              <label className={styles.label}>
                Email
              </label>

              <div className={styles.infoRow}>
                <Mail />
                {user?.email}
              </div>
            </div>
          </div>

          <div
            className={styles.field}
            style={{ marginTop: "24px" }}
          >
            <label className={styles.label}>
              Bio
            </label>

            {isEditing ? (
              <textarea
                className={styles.textarea}
                value={form.bio}
                onChange={(e) =>
                  setForm({
                    ...form,
                    bio: e.target.value,
                  })
                }
              />
            ) : (
              <p>{form.bio || "No bio added"}</p>
            )}
          </div>
        </div>

        {/* Password */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>
              <Lock /> Change Password
            </h2>
          </div>

          {passwordSuccess && (
            <div className={styles.success}>
              Password updated successfully
            </div>
          )}

          {passwordError && (
            <div className={styles.error}>
              {passwordError}
            </div>
          )}

          <form
            onSubmit={handleChangePassword}
            className={styles.passwordGrid}
          >
            <input
              type="password"
              placeholder="Current Password"
              className={styles.input}
              value={passwordForm.currentPassword}
              onChange={(e) =>
                setPasswordForm({
                  ...passwordForm,
                  currentPassword: e.target.value,
                })
              }
            />

            <input
              type="password"
              placeholder="New Password"
              className={styles.input}
              value={passwordForm.newPassword}
              onChange={(e) =>
                setPasswordForm({
                  ...passwordForm,
                  newPassword: e.target.value,
                })
              }
            />

            <input
              type="password"
              placeholder="Confirm Password"
              className={styles.input}
              value={passwordForm.confirmNewPassword}
              onChange={(e) =>
                setPasswordForm({
                  ...passwordForm,
                  confirmNewPassword:
                    e.target.value,
                })
              }
            />

            <CTAButton
              type="submit"
              disabled={isSavingPassword}
            >
              {isSavingPassword
                ? "Updating..."
                : "Update Password"}
            </CTAButton>
          </form>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  editing,
  onChange,
}) {
  return (
    <div className={styles.field}>
      <label className={styles.label}>
        {label}
      </label>

      {editing ? (
        <input
          className={styles.input}
          value={value}
          onChange={(e) =>
            onChange(e.target.value)
          }
        />
      ) : (
        <div className={styles.infoRow}>
          {value || "Not set"}
        </div>
      )}
    </div>
  );
}