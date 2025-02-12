import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { editUser, fetchUser } from "@/lib/appwrite";
import { useAuth } from "@/context/AuthContext";

const UserEdit = () => {
  const router = useRouter();
  const { user } = useAuth();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState("https://i.ibb.co/nqpJrWtt/avatar.jpg");

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userDetails = async () => {
      try {
        const result = await fetchUser(user?.email);
        console.log("Fetched user data:", result); // Debugging
        setData(result[0]); // Assuming `result` is an array
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user details:", error);
        setIsLoading(false);
      }
    };
    userDetails();
  }, []);

  const handleEditUser = async (id: string) => {
    if (!id) {
      Alert.alert("Error", "User data is not loaded yet. Please try again.");
      return;
    }

    try {
      const response = await editUser(
        id,
        name,
        address,
        image,
        parseInt(phone)
      );
      console.log("Edited:", response);
      if (response) {
        Alert.alert(
          "Successfully Updated",
          "Your profile has been updated successfully.",
          [
            {
              text: "OK",
              onPress: () => {
                router.push("/");
              },
            },
          ]
        );
      }
    } catch (error) {
      console.error("Error updating user:", error);
      Alert.alert("Error", "Failed to update user. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <View className="flex-1 bg-gray-100 items-center justify-center">
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!data) {
    return (
      <View className="flex-1 bg-gray-100 items-center justify-center">
        <Text>Failed to load user data. Please try again later.</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-100 items-center justify-center p-4">
      <View className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-sm items-center">
        <Image
          source={{ uri: image }}
          className="w-32 h-32 rounded-full border-4 border-gray-300"
        />

        <TextInput
          className="mt-4 w-full border-b border-gray-300 p-2 text-center"
          value={name}
          onChangeText={setName}
          placeholder="Enter Name"
        />

        <TextInput
          className="mt-4 w-full border-b border-gray-300 p-2 text-center"
          value={phone}
          onChangeText={setPhone}
          placeholder="Enter Phone"
          keyboardType="numeric"
        />

        <TextInput
          className="mt-4 w-full border-b border-gray-300 p-2 text-center"
          value={address}
          onChangeText={setAddress}
          placeholder="Enter Address"
        />

        <TextInput
          className="mt-4 w-full border-b border-gray-300 p-2 text-center"
          onChangeText={setImage}
          placeholder="Enter image address"
        />

        <TouchableOpacity
          className="mt-6 bg-blue-500 px-6 py-2 rounded-lg"
          onPress={() => handleEditUser(data?.$id)}
          disabled={isLoading || !data?.$id}
        >
          <Text className="text-white font-semibold">
            {isLoading ? "Loading..." : "Save Changes"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserEdit;
