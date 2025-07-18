
const baseUrl = process.env.NEXT_PUBLIC_PUBLIC_API;

import toast from 'react-hot-toast';
import Cookies from 'js-cookie';


const userServices = {
  // 1. registerUser 
  async registerUser({ UserName, email, password }) {
    try {
      const response = await fetch(`${baseUrl}/api/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ UserName, email, password })
      });
      const resData = await response.json();
      return resData;
    } catch (error) {
      return { success: false, message: error.message };
    }
  },

  // 2. loginUser
  async loginUser({ email, password }) {
    try {
      const response = await fetch(`${baseUrl}/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      })
      const resData = await response.json();
      return resData;
    } catch (error) {
      return { success: false, message: error.message }
    }
  },


  // 3. change-username
  async changeUserName({ UserName }) {
    try {
      const token = Cookies.get("token");
      const response = await fetch(`${baseUrl}/api/users/change-username`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(UserName)
      })
      const resData = await response.json();
      return resData;
    } catch (error) {
      return { success: false, message: error.message };
    }
  },



  // 4. change-password
  async changePassword(currentPassword, newPassword, confirmNewPassword) {
    console.log(currentPassword, newPassword, confirmNewPassword);
    try {
      const token = Cookies.get("token");
      if (!token) {
        toast.error("Token not Found!")
      }
      const response = await fetch(`${baseUrl}/api/users/change-password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ currentPassword, newPassword, confirmNewPassword })
      })
      const resData = await response.json();
      return resData;
    } catch (error) {
      return { success: false, message: error.message };
    }
  },


  // 5. delete Account 
  async deleteAccount() {
    const token = Cookies.get('token');
    try {
      const response = await fetch(`${baseUrl}/api/users/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      })
      const resData = await response.json();
      return resData;
    } catch (error) {
      return { success: false, message: error.message }
    }
  }
}

export default userServices;

