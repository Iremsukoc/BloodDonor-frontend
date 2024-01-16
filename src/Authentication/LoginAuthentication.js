export const LoginAuthentication = async () => {
    const token = localStorage.getItem("token");
  
    if (token) {
      try {
        console.log("Before fetch");
        const response = await fetch("http://localhost:1010/api/check-user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        console.log("After fetch");
  
        if (!response.ok) {
          throw new Error("Failed to checkLoggedIn");
        }
  
        const data = await response.json();
  
        console.log("Data:", data);
  
        if (data && data.userId) {
          return {
            userId: data.userId,
          };
        } else {
          throw new Error("Failed to checkLoggedIn: Missing userId");
        }
      } catch (error) {
        console.error("Error in LoginAuthentication:", error);
        throw new Error("Failed to checkLoggedIn");
      }
    } else {
      return null;
    }
  };
  