
const baseUrl = process.env.NEXT_PUBLIC_PUBLIC_API;

const userServices = {
  // registerUser 
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
  }
}

export default userServices;

