import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import Octicons from "@expo/vector-icons/Octicons";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";

const Navbar = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-row justify-between items-center">
      <Text className="text-2xl font-bold">Jama r Dokan</Text>
      <View className="flex-row gap-4">
        <TouchableOpacity>
          <Octicons name="bell" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="basket-outline" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <AntDesign name="hearto" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <AntDesign name="search1" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <AntDesign name="setting" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Navbar;
