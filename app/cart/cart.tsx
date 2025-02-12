import React, { useEffect, useState } from "react";
import { deleteCartList, fetchCartList } from "@/lib/appwrite";
import { useIsFocused } from "@react-navigation/native";
import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/context/AuthContext";

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

const Cart = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [discountedPrice, setDiscountedPrice] = useState<number | null>(null);
  const [promoCode, setPromoCode] = useState<string>("");
  const [isPromoApplied, setIsPromoApplied] = useState(false);

  const router = useRouter();
  const isFocused = useIsFocused();
  const { user } = useAuth();
  const [data, setData] = useState<DocumentType[]>();

  const handleDelete = async (id: string) => {
    await deleteCartList(id);
    setData((prevData) => prevData?.filter((item) => item.$id !== id));
  };

  useEffect(() => {
    const cartListFetch = async () => {
      try {
        const result = await fetchCartList(user.email);
        setData(result);
      } catch (error) {
        console.error("Error fetching cart list:", error);
      }
    };

    cartListFetch();
  }, [isFocused]);

  useEffect(() => {
    if (data) {
      const total = data.reduce((acc, item) => acc + item.price, 0);
      setTotalPrice(total);
      setDiscountedPrice(null); // Reset discount when cart changes
      setIsPromoApplied(false);
    }
  }, [data]);

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "damkoman" && !isPromoApplied) {
      setDiscountedPrice(totalPrice / 2);
      setIsPromoApplied(true);
    } else {
      alert("Invalid Promo Code or Already Applied!");
    }
  };

  if (!data) {
    return (
      <View className="flex-1 justify-center items-center mt-10">
        <ActivityIndicator size="large" color="#6200EE" />
        <Text>Loading data...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 p-4">
      <Text className="text-center font-bold text-lg my-5">Cart</Text>

      {data.length === 0 ? (
        <Text className="text-center text-gray-600">
          Click on add cart list to see products here
        </Text>
      ) : (
        <>
          <FlatList
            data={data}
            keyExtractor={(item) => item.$id}
            renderItem={({ item }) => (
              <View className="flex-row bg-gray-200 rounded-t-3xl rounded-b-3xl p-4 items-center justify-evenly gap-3 mb-4">
                <Image
                  source={{ uri: item.image }}
                  style={{ width: 100, height: 120, resizeMode: "contain" }}
                />
                <View>
                  <Text className="text-lg font-bold text-purple-600">
                    {item.title}
                  </Text>
                  <Text className="text-gray-500">{item.buyer}</Text>
                  <View className="flex-row gap-1 my-4">
                    <TouchableOpacity
                      onPress={() => handleDelete(item.$id)}
                      className="p-2 bg-purple-600 rounded-2xl"
                    >
                      <Text className="text-white">Delete</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => router.push(`/details/${item.productId}`)}
                      className="p-2 bg-purple-600 rounded-2xl"
                    >
                      <Text className="text-white">Details</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <Text className="font-bold text-2xl">${item.price}</Text>
              </View>
            )}
          />

          {/* Total Price Section */}
          <View className="bg-gray-100  rounded-xl mt-4">
            <Text className="text-lg font-bold ">
              {discountedPrice !== null ? (
                <>
                  <Text className="text-green-600">
                    Discounted Price: ${discountedPrice}
                  </Text>
                </>
              ) : (
                `Total Price: $${totalPrice}`
              )}
            </Text>
          </View>

          {/* Promo Code Input */}

          <View className={`${isPromoApplied ? `hidden` : `flex-col`}`}>
            <Text className="text-lg font-bold">Promo Code:</Text>
            <View>
              {" "}
              <TextInput
                className="border p-2 mt-2 rounded-xl"
                placeholder="Enter promo code"
                value={promoCode}
                onChangeText={setPromoCode}
              />
              <TouchableOpacity
                onPress={applyPromoCode}
                className="p-2 bg-purple-600 rounded-2xl mt-2"
              >
                <Text className="text-center text-white font-bold">
                  Apply Promo Code
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Continue Payment Button */}
          <TouchableOpacity className="p-2 bg-purple-600 rounded-2xl mt-4">
            <Text className="text-center text-xl text-white font-bold">
              Continue Payment
            </Text>
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
};

export default Cart;
