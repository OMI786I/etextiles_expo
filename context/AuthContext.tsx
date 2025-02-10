import React, { createContext, useContext, useState, ReactNode } from "react";
import { Text, SafeAreaView } from "react-native";

interface AuthContextType {
  session: boolean;
  user: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [session, setSession] = useState<boolean>(false);
  const [user, setUser] = useState<boolean>(false);

  const contextData: AuthContextType = { session, user };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? (
        <SafeAreaView>
          <Text>Loading...</Text>
        </SafeAreaView>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { useAuth, AuthProvider };
