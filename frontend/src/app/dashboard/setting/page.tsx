"use client";
import React, { useState, ChangeEvent, FormEvent ,useEffect} from "react";
import userServices from "@/services/users/users.services.js";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash, FaEdit, FaSave } from "react-icons/fa";
const baseUrl = process.env.NEXT_PUBLIC_PUBLIC_API;

const ProfilePage = () => {


  type UserType = { user?: { UserName?: string; email?: string } };

  const [userInfo, setUser] = useState<UserType>({});

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userInfo = await userServices.getUserInfo();
      setUser(userInfo);
    };
    fetchUserInfo();
  }, []);


  const [profile, setProfile] = useState({
    bio: "",
    dob: "",
    location: "",
    address: "",
    pin_code: "",
    profilePic: "",
  });
  const [profilePicFile, setProfilePicFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  
  const [userNameInput, setUserNameInput] = useState(userInfo?.user?.UserName || "");
  const [isEditingUserName, setIsEditingUserName] = useState(false);
  // Modals
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  // change password
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  // Handle profile form change
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // Fetch profile details (optional: on mount)
  // useEffect(() => { ... }, []);

  // Save profile info only
  const handleSaveProfile = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token =
        typeof window !== "undefined"
          ? document.cookie
              .split("; ")
              .find(row => row.startsWith("token="))
              ?.split("=")[1]
          : null;
      const response = await fetch(`${baseUrl}/api/profile/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(profile),
      });
      const res = await response.json();
      setLoading(false);
      if (res.success) {
      } else {
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setLoading(false);
      }
    }
  };

  // Handle profile pic change and upload
  const handlePicChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePicFile(e.target.files[0]);
      setLoading(true);
      try {
        const token =
          typeof window !== "undefined"
            ? document.cookie
                .split("; ")
                .find(row => row.startsWith("token="))
                ?.split("=")[1]
            : null;
        const formData = new FormData();
        formData.append("profilePic", e.target.files[0]);
        const response = await fetch(`${baseUrl}/api/profile/profile-pic`, {
          method: "PATCH",
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: formData,
        });
        const res = await response.json();
        setLoading(false);
        if (res.success) {
          setProfile({ ...profile, profilePic: res.profilePic });
          setProfilePicFile(null);
        } else {
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          setLoading(false);
        }
      }
    }
  };

  // Ref for file input
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Handle password form change
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };

  // update userName;
  const updateUserNameHandler = async () => {
    try {
      setLoading(true);
      const resData = await userServices.changeUserName(userNameInput);
      if (resData.success) {
        setLoading(false);
        toast.success(resData.message);
        // Fetch updated user info after successful name change
        const updatedUserInfo = await userServices.getUserInfo();
        setUser(updatedUserInfo);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  // Change password
  const handleChangePassword = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const resData = await userServices.changePassword(
      passwordForm.currentPassword,
      passwordForm.newPassword,
      passwordForm.confirmNewPassword
    );

    if (resData.success) {
      setLoading(false);
      setShowPasswordModal(false);
      toast.success(resData.message);
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
    }
    if (!resData.success) {
      setLoading(false);
      setShowPasswordModal(false);
      toast.error(resData.message);
    }
  };

  // Delete account
  const handleDeleteAccount = async () => {
    setLoading(true);
    const resData = await userServices.deleteAccount();
    setLoading(false);

    if (resData.success) {
      Cookies.remove("token");
      Cookies.remove("userInfo");
      toast.success(resData.message);
      return router.push("/");
    }
    setShowDeleteModal(false);
  };

  
  return (
    <div className="w-full mx-auto p-4 sm:p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Profile Picture & Username Card */}
      <div className="w-full bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-xl p-6 flex flex-col items-center sm:col-span-1 md:col-span-1 md:w-full border border-blue-200 relative">
        {/* Decorative background circle */}
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-32 h-32 bg-blue-200 opacity-20 rounded-full z-0"></div>
        {/* Profile Picture */}
        <div className="relative z-10 mt-2">
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-white shadow-lg mb-2 mx-auto flex items-center justify-center bg-white">
            {profilePicFile ? (
              <Image
                src={URL.createObjectURL(profilePicFile)}
                alt="Profile"
                className="w-full h-full object-cover"
                width={128}
                height={128}
                unoptimized
              />
            ) : profile.profilePic ? (
              <Image
                src={profile.profilePic}
                alt="Profile"
                className="w-full h-full object-cover"
                width={128}
                height={128}
                unoptimized
              />
            ) : (
              <span className="w-full h-full flex items-center justify-center text-gray-400 text-4xl bg-blue-100">
                👤
              </span>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handlePicChange}
            className="hidden"
            ref={fileInputRef}
            placeholder="Upload profile photo"
          />
          <button
            type="button"
            className="absolute bottom-2 right-2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-md transition-colors duration-200 text-lg"
            disabled={loading}
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
            aria-label="Add or update profile photo"
          >
            <FaEdit />
          </button>
        </div>
        {/* Username Section */}
        <div className="w-full mt-6 flex flex-col items-center z-10">
          <label className="block text-base font-semibold mb-1 text-center w-full text-blue-900">
            {isEditingUserName ? "Edit Username:" : "Username:"} <span className="font-bold text-blue-700">{userInfo?.user?.UserName}</span>
          </label>
          <div className="flex items-center w-full justify-center gap-2 mt-1">
            <input
              type="text"
              className="border border-blue-200 rounded px-3 py-2 text-sm sm:text-base w-2/3 text-center focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              value={userNameInput}
              onChange={e => setUserNameInput(e.target.value)}
              disabled={!isEditingUserName}
            />
            <button
              type="button"
              className={`ml-2 px-3 py-2 rounded-full text-lg font-semibold flex items-center justify-center shadow transition-colors duration-200 ${
                isEditingUserName
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-700"
              }`}
              onClick={() => {
                if (isEditingUserName) {
                  updateUserNameHandler();
                }
                setIsEditingUserName(!isEditingUserName);
              }}
              disabled={loading}
              aria-label={isEditingUserName ? "Save username" : "Edit username"}
            >
              {isEditingUserName ? <><FaSave className="mr-1" />Save</> : <FaEdit />}
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1 text-center">
            {isEditingUserName
              ? "Enter new username and click Save"
              : "Click Edit to change your username"}
          </p>
          {/* Email display if available */}
          {userInfo?.user?.email && (
            <div className="mt-2 text-sm text-blue-800 bg-blue-50 rounded px-2 py-1 w-fit mx-auto shadow-sm">
              <span className="font-medium">Email:</span> {userInfo.user.email}
            </div>
          )}
        </div>
        {/* Divider */}
        <div className="w-full border-t border-blue-200 my-6"></div>
        {/* Add more profile actions/info here if needed */}
      </div>
      {/* Profile Info Card */}
      <div className="col-span-1 md:col-span-2 bg-white rounded-lg shadow p-4 sm:p-6 mt-4 md:mt-0">
        <h2 className="text-lg font-semibold mb-4">Profile Information</h2>
        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Bio</label>
            <textarea
              name="bio"
              value={profile.bio}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 text-sm sm:text-base"
              placeholder="Enter your bio"
              rows={3}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Date of Birth
              </label>
              <input
                type="date"
                name="dob"
                value={profile.dob}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 text-sm sm:text-base"
                placeholder="Date of Birth"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              <input
                type="text"
                name="location"
                value={profile.location}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 text-sm sm:text-base"
                placeholder="Location"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Address</label>
              <input
                type="text"
                name="address"
                value={profile.address}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 text-sm sm:text-base"
                placeholder="Address"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Pin Code</label>
              <input
                type="text"
                name="pin_code"
                value={profile.pin_code}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 text-sm sm:text-base"
                placeholder="Pin Code"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded mt-2 text-sm sm:text-base"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Profile"}
          </button>
        </form>
      </div>
      {/* Account Actions Card */}
      <div className="col-span-1 md:col-span-3 mt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          <button
            onClick={() => setShowPasswordModal(true)}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded transition-colors duration-200 text-sm sm:text-base mb-2 sm:mb-0"
          >
            Change Password
          </button>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded transition-colors duration-200 text-sm sm:text-base"
          >
            Delete Account
          </button>
        </div>
      </div>

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-2">
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-8 w-full max-w-sm relative">
            <button
              className="absolute top-2 right-2 text-2xl text-gray-500 hover:text-red-700"
              onClick={() => setShowPasswordModal(false)}
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4">Change Password</h2>
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="currentPassword"
                    value={passwordForm.currentPassword}
                    onChange={handlePasswordChange}
                    className="w-full border rounded px-3 py-2 text-sm sm:text-base pr-10"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 focus:outline-none"
                    tabIndex={-1}
                    onClick={() => setShowPassword(prev => !prev)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="newPassword"
                    value={passwordForm.newPassword}
                    onChange={handlePasswordChange}
                    className="w-full border rounded px-3 py-2 text-sm sm:text-base pr-10"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 focus:outline-none"
                    tabIndex={-1}
                    onClick={() => setShowPassword(prev => !prev)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="confirmNewPassword"
                    value={passwordForm.confirmNewPassword}
                    onChange={handlePasswordChange}
                    className="w-full border rounded px-3 py-2 text-sm sm:text-base pr-10"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 focus:outline-none"
                    tabIndex={-1}
                    onClick={() => setShowPassword(prev => !prev)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded text-sm sm:text-base"
                disabled={loading}
              >
                {loading ? "Changing..." : "Change Password"}
              </button>
            </form>
          </div>
        </div>
      )}
      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-2">
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-8 w-full max-w-sm relative">
            <button
              className="absolute top-2 right-2 text-2xl text-gray-500 hover:text-red-700"
              onClick={() => setShowDeleteModal(false)}
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4 text-red-600">
              Delete Account
            </h2>
            <p className="mb-4">
              Are you sure you want to delete your account? This action cannot
              be undone.
            </p>
            <div className="flex gap-4 flex-col sm:flex-row">
              <button
                onClick={handleDeleteAccount}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded text-sm sm:text-base mb-2 sm:mb-0"
                disabled={loading}
              >
                {loading ? "Deleting..." : "Yes, Delete"}
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 rounded text-sm sm:text-base"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
