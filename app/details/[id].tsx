import {
  Text,
  SafeAreaView,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  CartCreateDocument,
  fetchDocumentsById,
  wishlistCreateDocument,
} from "@/lib/appwrite";
import { Rating } from "react-native-ratings";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useAuth } from "@/context/AuthContext";
type DocumentType = {
  $id?: string;
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
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { id } = useLocalSearchParams<{ id: string }>();
  const [data, setData] = useState<DocumentType>();
  const [selectedSize, setSelectedSize] = useState<string>("S");

  const { user } = useAuth();

  const handleSelect = (size: string) => {
    setSelectedSize(size);
  };

  const toSendData = {
    title: data?.title,
    description: data?.description,
    image: data?.image,
    price: data?.price,
    rating: data?.rating,
    seller: data?.seller,
    size: [selectedSize],

    type: data?.type,
    buyer: user.email,
  };

  const handleWishlist = async () => {
    setLoading(true);
    const response = await wishlistCreateDocument(toSendData);
    console.log(response);

    if (response) {
      Alert.alert(
        "Successfully added to wishlist",
        "You have successfully added product to the wishlist",
        [
          {
            text: "OK",
            onPress: () => {
              console.log("ok");
            },
          },
          {
            text: "Goto wishlist",
            onPress: () => {
              router.push("/wishlist/wishlist");
            },
          },
        ]
      );

      setLoading(false);
    }
  };
  const handleCartlist = async () => {
    console.log("clicked cart list");

    setLoading(true);
    const response = await CartCreateDocument(toSendData);
    console.log(response);

    if (response) {
      Alert.alert(
        "Successfully added to cart",
        "You have successfully added product to the cart",
        [
          {
            text: "OK",
            onPress: () => {
              console.log("ok");
            },
          },
          {
            text: "Goto wishlist",
            onPress: () => {
              router.push("/cart/cart");
            },
          },
        ]
      );

      setLoading(false);
    }
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

  if (loading === true) {
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
    <SafeAreaView className="bg-gray-100 flex-1">
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
          <TouchableOpacity
            className="p-4 flex-row items-center gap-3 bg-purple-500 w-3/4 justify-center rounded-3xl mt-4"
            onPress={() => handleCartlist()}
          >
            <Ionicons name="basket-outline" size={24} color="white" />
            <Text className="text-white">Add to Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleWishlist()}
            className="p-4 flex-row items-center gap-3 bg-purple-500 w-3/4 justify-center rounded-3xl mt-4"
          >
            <AntDesign name="hearto" size={24} color="white" />
            <Text className="text-white">Add to Wishlist</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Details;
