import { SafeAreaView, Text, View } from "react-native";
import "../global.css";
import Navbar from "@/components/Navbar";
export default function Index() {
  return (
    <SafeAreaView className="p-3">
      <Navbar />

      <Text className="text-red-500">
        Edit app/index.tsx to edit this screen.
      </Text>
    </SafeAreaView>
  );
}
