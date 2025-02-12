import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { editUser, fetchUser } from "@/lib/appwrite";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";

const userEdit = () => {
  const router = useRouter();
  const { user } = useAuth();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState("https://i.ibb.co/nqpJrWtt/avatar.jpg");

  const [data, setData] = useState();

  const toSendData = {
    name: name,
    address: address,
    image: image,
    phone: phone,
  };

  useEffect(() => {
    const userDetails = async () => {
      const result = await fetchUser(user?.email);
      setData(result[0]);
    };
    userDetails();
  }, []);
  console.log("data in edit page", data);

  const handleEditUser = async (id: string) => {
    const response = await editUser(
      id,
      toSendData.name,
      toSendData.address,
      toSendData.image,
      toSendData.phone
    );
    console.log(id, name, phone, address, image);
    console.log("edited", response);
    if (response) {
      Alert.alert(
        "Successfully Registered",
        "You are successfully registered",
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
  };

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
          keyboardType="phone-pad"
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
        >
          <Text className="text-white font-semibold">Save Changes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default userEdit;
