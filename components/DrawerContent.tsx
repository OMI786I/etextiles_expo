import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const DrawerContent = ({ navigation }: any) => {
  return (
    <View className="flex-1 p-4">
      <Text className="text-lg font-bold mb-4">Settings Menu</Text>
      <TouchableOpacity onPress={() => navigation.closeDrawer()}>
        <Text>Close Drawer</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DrawerContent;
