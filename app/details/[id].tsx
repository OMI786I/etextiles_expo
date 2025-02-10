import {
  Text,
  SafeAreaView,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { fetchDocumentsById } from "@/lib/appwrite";
import { Rating } from "react-native-ratings";
import Ionicons from "@expo/vector-icons/Ionicons";
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

const Details: React.FC = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [data, setData] = useState<DocumentType>();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const handleSelect = (size: string) => {
    setSelectedSize(size);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchDocumentsById(id);

        if (response) {
          const document: DocumentType = {
            $id: response.$id,
            description: response.description,
            image: response.image,
            price: response.price,
            rating: response.rating,
            seller: response.seller,
            size: response.size,
            title: response.title,
            type: response.type,
          };
          setData(document);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  console.log("details data", data);

  if (!data) {
    return <Text>Loading</Text>;
  }

  return (
    <SafeAreaView className="bg-gray-100">
      <ScrollView>
        {/**image */}
        <View className="bg-[#f5f4f1]">
          {" "}
          <View className="p-10">
            <Image
              style={[{ resizeMode: "contain" }]}
              source={{ uri: data?.image }}
              className="w-full h-60"
            />
          </View>
        </View>
        {/**details */}
        <View className="p-6">
          <View className="flex-row justify-between">
            <Text className="font-bold text-3xl">{data.title}</Text>
            <Text className="font-bold text-2xl">${data.price}</Text>
          </View>
          {/**rating */}
          <View className="flex-row my-5 ">
            <Rating
              type="star"
              ratingCount={5}
              imageSize={19}
              showRating={false}
              readonly
              minValue={1}
              startingValue={data.rating}
              tintColor="#f5f4f1"
              style={{
                alignItems: "flex-start",
              }}
            />
            <Text className="text-gray-500">(5/5)</Text>
          </View>
          {/**description */}
          <View>
            <Text className="font-bold text-lg">Description:</Text>
            <Text className="my-2">{data.description}</Text>
          </View>
        </View>

        {/**size selection */}
        <Text className="p-6 font-bold">Select Size</Text>
        <FlatList
          data={data?.size}
          horizontal
          style={{
            paddingHorizontal: 15,
          }}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => handleSelect(item)}
                className={`px-4 py-2 mx-2 rounded-lg  ${
                  selectedSize === item ? "bg-purple-600" : "bg-gray-300"
                }`}
              >
                <Text
                  className={`text-sm ${
                    selectedSize === item ? "text-white" : "text-black"
                  }`}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
        {/**button */}
        <View className="justify-center items-center">
          {" "}
          <TouchableOpacity className="p-4 flex-row items-center gap-3 bg-purple-500 w-3/4 justify-center rounded-3xl mt-4">
            <Ionicons name="basket-outline" size={24} color="white" />
            <Text className="text-white">Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Details;
