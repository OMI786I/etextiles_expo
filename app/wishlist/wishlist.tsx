import { View, Text, FlatList, Image, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { fetchWishlist } from "@/lib/appwrite";
import { SafeAreaView } from "react-native-safe-area-context";
type DocumentType = {
  $id: string;
  description: string;
  image: string;
  price: number;
  rating: number;
  seller: string;
  size: string[];
  title: string;
  type: string;
};
const wishlist = () => {
  const [data, setData] = useState<DocumentType[]>();

  useEffect(() => {
    try {
      const wishlistfetch = async () => {
        const result = await fetchWishlist();
        setData(result);
      };

      wishlistfetch();
    } catch (error) {
      console.error(error);
    }
  }, []);

  console.log("fetch data wishlist", data);

  if (!data) {
    return (
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
    );
  }

  return (
    <SafeAreaView className="flex-1">
      <Text className="text-center font-bold   text-lg my-5">Wishlist</Text>

      <FlatList
        data={data}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => {
          return (
            <View className="flex-row bg-gray-200 rounded-t-3xl rounded-b-3xl p-4  items-center justify-evenly gap-3">
              <View className="">
                <Image
                  source={{ uri: item.image }}
                  style={{ width: 100, height: 120, resizeMode: "contain" }}
                />
              </View>
              <View>
                {" "}
                <Text className="text-lg font-bold text-purple-600">
                  {item.title}
                </Text>
                <Text className="text-gray-500">{item.buyer}</Text>
              </View>
              <View>
                <Text className="font-bold text-2xl">${item.price}</Text>
              </View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default wishlist;
