import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { fetchUser } from "@/lib/appwrite";
import { useRouter } from "expo-router";

const edit = () => {
  const { user } = useAuth();
  const [data, setData] = useState();
  const router = useRouter();
  useEffect(() => {
    const userDetails = async () => {
      const result = await fetchUser(user?.email);
      setData(...result);
    };
    userDetails();
  }, []);

  console.log("fetch user", data);

  return (
    <SafeAreaView className="flex-1 bg-gray-100 items-center justify-center p-4">
      <View className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-sm items-center">
        {data?.image ? (
          <Image
            source={{ uri: `${data?.image}` }}
            className="w-32 h-32 rounded-full border-4 border-gray-300"
          />
        ) : (
          <Image
            source={{ uri: "https://i.ibb.co/nqpJrWtt/avatar.jpg" }}
            className="w-32 h-32 rounded-full border-4 border-gray-300"
          />
        )}

        <Text className="text-xl font-bold mt-4">{data?.name}</Text>
        <Text className="text-gray-500">gmail: {data?.email}</Text>
        {data?.phone ? (
          <Text className="text-gray-500 mt-1">phone: {data?.phone}</Text>
        ) : (
          <Text className="text-gray-500 mt-1">phone: not provided</Text>
        )}
        {data?.address ? (
          <Text className="text-gray-500 mt-1">address: {data?.address}</Text>
        ) : (
          <Text className="text-gray-500 mt-1">address: not provided</Text>
        )}

        <TouchableOpacity
          className="mt-6 bg-blue-500 px-6 py-2 rounded-lg"
          onPress={() => {
            router.push("/userEdit/userEdit");
          }}
        >
          <Text className="text-white font-semibold">Edit Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default edit;
