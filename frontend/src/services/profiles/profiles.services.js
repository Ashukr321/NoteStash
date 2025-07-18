const baseUrl = process.env.NEXT_PUBLIC_PUBLIC_API;
import Cookies from "js-cookie";
import toast from "react-hot-toast";
const profileServices = {
  //updateProfilePic
  //getProfileDetails
  async getProfileDetails() {
    try {
      const token = Cookies.get('token');
      if (!token) {
        toast.error('Auth Token Not Found!');
        return;
      }
      const response = await fetch(`${baseUrl}/api/profiles/me`, {
        method: "GET",
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
  },

  // createUserProfile 
  // All arguments are optional, so we filter out undefined/null values before sending
  async createUserProfile({ bio, dob, location, address, pin_code } = {}) {
    try {
      const token = Cookies.get('token');
      if (!token) {
        toast.error("Token Not Found!");

        return;
      }
      // Only include fields that are not undefined or null
      const bodyData = {};
      if (bio !== undefined) bodyData.bio = bio;
      if (dob !== undefined) bodyData.dob = dob;
      if (location !== undefined) bodyData.location = location;
      if (address !== undefined) bodyData.address = address;
      if (pin_code !== undefined) bodyData.pin_code = pin_code;

      const response = await fetch(`${baseUrl}/api/profiles`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(bodyData)
      });
      const resData = await response.json();
      return resData;
    } catch (error) {
      return { success: true, message: error.message }
    }
  },
  // updateUserProfile 
  async updateUserProfile ({ bio, dob, location, address, pin_code }={}){
    try {
      const token = Cookies.get('token');
      if (!token) {
        toast.error("Token Not Found!");

        return;
      }
      // Only include fields that are not undefined or null
      const bodyData = {};
      if (bio !== undefined) bodyData.bio = bio;
      if (dob !== undefined) bodyData.dob = dob;
      if (location !== undefined) bodyData.location = location;
      if (address !== undefined) bodyData.address = address;
      if (pin_code !== undefined) bodyData.pin_code = pin_code;

      const response = await fetch(`${baseUrl}/api/profiles/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(bodyData)
      });
      const resData = await response.json();
      return resData;
    } catch (error) {
      return { success: true, message: error.message }
    }
  } 
};

export default profileServices;
