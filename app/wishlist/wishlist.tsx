import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { deleteWishList, fetchWishlist } from "@/lib/appwrite";
import { SafeAreaView } from "react-native-safe-area-context";
import { useIsFocused } from "@react-navigation/native";
import { useRouter } from "expo-router";
type DocumentType = {
  $id: string;
  productId: string;
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
  const router = useRouter();
  const [data, setData] = useState<DocumentType[]>();
  const isFocused = useIsFocused();
  const handleDelete = async (id: string) => {
    const response = await deleteWishList(id);
    setData((prevData) => prevData?.filter((item) => item.$id !== id));
    console.log("delete response", response);
  };
  useEffect(() => {
    const wishlistfetch = async () => {
      try {
        const result = await fetchWishlist();
        console.log("Fetched wishlist data:", result);
        setData(result);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    wishlistfetch();
  }, [isFocused]);

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

      {data.length === 0 ? (
        <Text className="text-center text-gray-600">
          click on add wishlist to see products here
        </Text>
      ) : (
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
                  <View className="flex-row gap-1 my-4">
                    <TouchableOpacity
                      onPress={() => {
                        handleDelete(item.$id);
                      }}
                      className="p-2 bg-purple-600 rounded-2xl "
                    >
                      <Text className="text-white">Delete</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {}}
                      className="p-2 bg-purple-600 rounded-2xl "
                    >
                      <Text className="text-white">Add to Cart</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        router.push(`/details/${item.productId}`);
                      }}
                      className="p-2 bg-purple-600 rounded-2xl "
                    >
                      <Text className="text-white">Details</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View>
                  <Text className="font-bold text-2xl">${item.price}</Text>
                </View>
              </View>
            );
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default wishlist;
