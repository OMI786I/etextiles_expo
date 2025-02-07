import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Octicons from "@expo/vector-icons/Octicons";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";

const Navbar = () => {
  return (
    <SafeAreaView className="flex-row justify-between">
      <Text className="text-2xl font-bold ">Jama r Dokan</Text>

      <View className="flex-row gap-4">
        <TouchableOpacity>
          <Octicons name="bell" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          {" "}
          <Ionicons name="basket-outline" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          {" "}
          <AntDesign name="hearto" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <AntDesign name="search1" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <AntDesign name="setting" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Navbar;
