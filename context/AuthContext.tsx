import { useContext, createContext, useState, useEffect } from "react";
import { View, Text, SafeAreaView, ActivityIndicator } from "react-native";
import { account } from "@/lib/appwrite";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    checkAuth();
  };

  const checkAuth = async () => {
    try {
      const response = await account.get();
      setUser(response);
      setSession(response);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const signin = async ({ email, password }) => {
    setLoading(true);
    try {
      const responseSession = await account.createEmailPasswordSession(
        email,
        password
      );
      setSession(responseSession);
      const responseUser = await account.get();
      setUser(responseUser);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  const signout = async () => {
    setLoading(true);
    await account.deleteSession("current");
    setSession(null);
    setLoading(false);
  };

  const contextData = { session, user, signin, signout };
  return (
    <AuthContext.Provider value={contextData}>
      {loading ? (
        <SafeAreaView>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 50,
            }}
          >
            <ActivityIndicator size="large" color="#6200EE" />
            <Text>Loading data...</Text>
          </View>
        </SafeAreaView>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { useAuth, AuthContext, AuthProvider };
