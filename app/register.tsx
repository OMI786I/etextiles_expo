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
import { Link } from "expo-router";
import { signUp } from "@/lib/appwrite";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    const result = await signUp(email, password, name);
    console.log("clicked register", result);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <LinearGradient
          colors={["#7F77FE", "#A573FF"]}
          style={styles.gradientContainer}
        >
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Get Started with Jama r dokan</Text>
            <Text style={styles.subTitle}>
              Already have an account?{" "}
              <Link className="underline" href={"/sign-in"}>
                Log in
              </Link>
            </Text>
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.sectionTitle}>Register</Text>

            <TextInput
              style={styles.input}
              placeholder="Name"
              placeholderTextColor="#ffffffa0"
              onChangeText={setName}
              value={name}
            />
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

            <TouchableOpacity style={styles.button} onPress={handleRegister}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;

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
