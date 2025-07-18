const baseUrl = process.env.NEXT_PUBLIC_PUBLIC_API;
import Cookies from "js-cookie";
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
  }
};

export default profileServices;
