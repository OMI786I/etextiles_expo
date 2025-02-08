import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Navbar from "@/components/Navbar";

import { useState } from "react";

export default function Index() {
  const [activeFilter, setActiveFilter] = useState("All");
  const types = ["All", "Women's", "Men's", "Sale"];
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
    </SafeAreaView>
  );
}
