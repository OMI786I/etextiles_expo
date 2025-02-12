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

interface MenuItem {
  title: string;
  icons: ReactNode;
  link: string;
}

const data: MenuItem[] = [
  {
    title: "Orders",
    icons: <Ionicons name="basket-outline" size={28} color="white" />,
    link: "/",
  },
  {
    title: "Wishlist",
    icons: <AntDesign name="hearto" size={28} color="white" />,
    link: "/",
  },
  {
    title: "Delivery Address",
    icons: <Ionicons name="map" size={28} color="white" />,
    link: "/",
  },
  {
    title: "Payment Method",
    icons: <AntDesign name="creditcard" size={24} color="white" />,
    link: "/",
  },
  {
    title: "Promo",
    icons: <AntDesign name="carryout" size={24} color="white" />,
    link: "/",
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
  const { signout, user } = useAuth();

  return (
    <ScrollView style={{ flex: 1 }}>
      <LinearGradient
        colors={["#7F77FE", "#A573FF"]}
        style={{ flex: 1, minHeight: "100%", padding: 30 }}
      >
        {/* User Profile Section */}
        <View className="flex-row items-center mb-6">
          <Image
            className="h-16 w-16 rounded-full mr-4"
            source={{ uri: "https://i.ibb.co/nqpJrWtt/avatar.jpg" }}
          />

          <View>
            <View className="flex-row items-center gap-1">
              <Text className="text-xl font-bold text-white">{user.name}</Text>
              <TouchableOpacity>
                <AntDesign name="edit" size={20} color="white" />
              </TouchableOpacity>
            </View>
            <Text className="text-gray-200">{user.email}</Text>
          </View>
        </View>

        {/* Menu Items */}

        <FlatList
          data={data}
          renderItem={({ item }) => {
            return (
              <View className=" my-2 ">
                <TouchableOpacity className="flex-row gap-2">
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
