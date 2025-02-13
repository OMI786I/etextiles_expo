import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import React, { ReactNode } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import useUser from "@/customHook/User";

interface MenuItem {
  title: string;
  icons: ReactNode;
  link: string;
}

const data: MenuItem[] = [
  {
    title: "Carts",
    icons: <Ionicons name="basket-outline" size={28} color="white" />,
    link: "/cart/cart",
  },
  {
    title: "Wishlist",
    icons: <AntDesign name="hearto" size={28} color="white" />,
    link: "/wishlist/wishlist",
  },
  {
    title: "Delivery Address",
    icons: <Ionicons name="map" size={28} color="white" />,
    link: "/userdetails/userdetails",
  },
  {
    title: "Payment Method",
    icons: <AntDesign name="creditcard" size={24} color="white" />,
    link: "/",
  },
  {
    title: "Promo",
    icons: <AntDesign name="carryout" size={24} color="white" />,
    link: "/promo/promo",
  },
  {
    title: "Notifications",
    icons: <AntDesign name="bells" size={24} color="white" />,
    link: "/",
  },
  {
    title: "Help",
    icons: <AntDesign name="question" size={24} color="white" />,
    link: "/",
  },
  {
    title: "About",
    icons: <AntDesign name="exclamation" size={24} color="white" />,
    link: "/",
  },
];

const DrawerContent = ({ navigation }: any) => {
  const { data: userData, loading } = useUser();

  const { signout, user } = useAuth();
  const router = useRouter();
  return (
    <ScrollView style={{ flex: 1 }}>
      <LinearGradient
        colors={["#7F77FE", "#A573FF"]}
        style={{ flex: 1, minHeight: "100%", padding: 30 }}
      >
        {/* User Profile Section */}

        <View className="flex-row items-center mb-6">
          {userData?.image ? (
            <Image
              className="h-16 w-16 rounded-full mr-4"
              source={{ uri: `${userData?.image}` }}
            />
          ) : (
            <Image
              className="h-16 w-16 rounded-full mr-4"
              source={{ uri: `https://i.ibb.co/nqpJrWtt/avatar.jpg` }}
            />
          )}

          <View>
            <View className="flex-row items-center gap-1">
              <Text className="text-xl font-bold text-white">
                {userData?.name}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  router.push("/userdetails/userdetails");
                }}
              >
                <AntDesign name="edit" size={20} color="white" />
              </TouchableOpacity>
            </View>
            <Text className="text-gray-200">{user?.email}</Text>
          </View>
        </View>

        {/* Menu Items */}

        <FlatList
          data={data}
          renderItem={({ item }) => {
            return (
              <View className=" my-2 ">
                <TouchableOpacity
                  onPress={() => router.push(item.link)}
                  className="flex-row gap-2"
                >
                  {item.icons}

                  <Text className="text-white"> {item.title}</Text>
                </TouchableOpacity>
              </View>
            );
          }}
        />

        <TouchableOpacity
          className="flex-row gap-2"
          onPress={() => {
            signout();
          }}
        >
          <AntDesign name="arrowright" size={24} color="white" />,
          <Text className="text-white">Logout</Text>
        </TouchableOpacity>
      </LinearGradient>
    </ScrollView>
  );
};

export default DrawerContent;
