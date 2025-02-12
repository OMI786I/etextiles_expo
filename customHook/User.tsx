import { useEffect, useState } from "react";
import { fetchUser } from "@/lib/appwrite";
import { useAuth } from "@/context/AuthContext";

// Custom hook to fetch user data
const useUser = () => {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userDetails = async () => {
      if (!user?.email) {
        setIsLoading(false);
        setError("No user email found");
        return;
      }

      try {
        const result = await fetchUser(user?.email);
        console.log("Fetched user data:", result); // Debugging
        setData(result[0]); // Assuming `result` is an array
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user details:", error);
        setError(error.message || "An error occurred");
        setIsLoading(false);
      }
    };

    userDetails();
  }, [user?.email]); // Re-run effect when the user's email changes

  return { data, loading, error };
};

export default useUser;
