import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { Link, Redirect } from "expo-router";

import { useAuth } from "@/context/AuthContext";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { session, signin } = useAuth();
  if (session) {
    return <Redirect href="/" />;
  }

  const handleSignIn = async () => {
    const response = await signin({ email, password });
    console.log(response);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <LinearGradient
          colors={["#7F77FE", "#A573FF"]}
          style={styles.gradientContainer}
        >
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Welcome Back to Jama r dokan</Text>
            <Text style={styles.subTitle}>
              Don't have an account?{" "}
              <Link className="underline" href={"/register"}>
                Register
              </Link>
            </Text>
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.sectionTitle}>Sign In</Text>

            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#ffffffa0"
              keyboardType="email-address"
              onChangeText={setEmail}
              value={email}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#ffffffa0"
              secureTextEntry
              onChangeText={setPassword}
              value={password}
            />

            <TouchableOpacity
              style={styles.button}
              onPress={() => handleSignIn()}
            >
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
    minHeight: "100%",
    padding: 30,
  },
  headerContainer: {
    paddingVertical: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  subTitle: {
    color: "white",
    marginTop: 10,
  },
  formContainer: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: "#ffffffa0",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    color: "white",
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#ffff",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#7F77FE",
    fontWeight: "bold",
  },
});
