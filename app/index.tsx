import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Navbar from "@/components/Navbar";

import { useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function Index() {
  const [activeFilter, setActiveFilter] = useState("All");
  const types = ["All", "Women's", "Men's", "Sale"];
  const [check, setCheck] = useState("");
  const [check2, setCheck2] = useState("");

  console.log(check);
  console.log(check2);
  interface DataItem {
    id: number;
    title: string;
    price: number;
    description: string;
    rating: number;
    size: string[];
    seller: string;
    image: string;
  }

  const data: DataItem[] = [
    {
      id: 1,
      title: "Pink Hoodie",
      price: 20,
      description:
        "Pink hoodie. Guess what colors in pink. Giving you better comfort and warmth in cold winter",
      rating: 3,
      size: ["S", "M", "L", "XL", "XXL"],
      seller: "Omi",
      image: "https://i.ibb.co.com/PZy97hFD/pink-hoodie.jpg",
    },
    {
      id: 2,
      title: "Pink Hoodie",
      price: 20,
      description:
        "Pink hoodie. Guess what colors in pink. Giving you better comfort and warmth in cold winter",
      rating: 3,
      size: ["S", "M", "L", "XL", "XXL"],
      seller: "Omi",
      image: "https://i.ibb.co.com/PZy97hFD/pink-hoodie.jpg",
    },
    {
      id: 3,
      title: "Pink Hoodie",
      price: 20,
      description:
        "Pink hoodie. Guess what colors in pink. Giving you better comfort and warmth in cold winter",
      rating: 3,
      size: ["S", "M", "L", "XL", "XXL"],
      seller: "Omi",
      image: "https://i.ibb.co.com/PZy97hFD/pink-hoodie.jpg",
    },
    {
      id: 4,
      title: "Pink Hoodie",
      price: 20,
      description:
        "Pink hoodie. Guess what colors in pink. Giving you better comfort and warmth in cold winter",
      rating: 3,
      size: ["S", "M", "L", "XL", "XXL"],
      seller: "Omi",
      image: "https://i.ibb.co.com/PZy97hFD/pink-hoodie.jpg",
    },
  ];

  console.log(activeFilter);
  return (
    <SafeAreaView className="p-3">
      <Navbar />

      {/** filter */}

      <FlatList
        className="mt-10"
        contentContainerStyle={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
        data={types}
        horizontal
        renderItem={({ item }) => {
          return (
            <View style={{ marginHorizontal: 8 }}>
              <TouchableOpacity
                activeOpacity={0.4}
                className={
                  item !== activeFilter
                    ? `px-5 py-2 rounded-full border-purple-600 border-2`
                    : `px-5 py-2 rounded-full bg-purple-600 `
                }
                onPress={() => setActiveFilter(item)}
              >
                <Text
                  className={
                    item !== activeFilter ? `text-black` : `text-white`
                  }
                >
                  {item}
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
      />

      {/**cards */}

      <FlatList
        data={data}
        numColumns={2}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 50,
        }}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          return (
            <View className="relative  m-1 p-2">
              <TouchableOpacity
                onPress={() => setCheck("clicked card")}
                className=""
              >
                <View className="bg-gray-200 rounded-t-3xl rounded-b-3xl p-4">
                  {" "}
                  <Image
                    source={{ uri: item.image }}
                    style={{ width: 135, height: 150 }}
                  />
                </View>

                <View className="mt-5">
                  <Text className="font-bold text-xl text-center">
                    {item.title}
                  </Text>
                  <Text className="text-gray-400 text-center">
                    ${item.price}
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setCheck2("clicked heart")}
                style={{
                  position: "absolute",
                  top: 14,
                  right: 18,
                }}
              >
                <AntDesign name="hearto" size={24} color="black" />
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}
