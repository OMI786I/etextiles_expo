import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import { useState } from "react";
import { Clipboard } from "react-native";

const promo = () => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    Clipboard.setString("damkoman");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <SafeAreaView>
      <Text className="font-bold text-center text-lg">
        Available Promo code
      </Text>

      <View className="flex items-center justify-center p-4">
        <View className="bg-purple-600 text-white text-center py-10 px-6 rounded-lg shadow-md relative w-full max-w-md">
          <Image
            source={{
              uri: "https://i.ibb.co.com/PsmtKqSD/istockphoto-1155451635-612x612.jpg",
            }}
            className="w-20 h-20 mx-auto mb-4 rounded-lg"
          />
          <Text className="text-2xl font-semibold mb-4 text-white text-center">
            50% flat off on all products using above promo card
          </Text>
          <View className="flex flex-row items-center justify-center space-x-2 mb-6">
            <Text className="border-dashed border text-white px-4 py-2 rounded-l">
              damkoman
            </Text>
            <TouchableOpacity
              onPress={copyToClipboard}
              className="border border-white bg-white px-4 py-2 rounded-r"
            >
              <Text className="text-purple-600">
                {copied ? "Copied!" : "Copy Code"}
              </Text>
            </TouchableOpacity>
          </View>
          <Text className="text-sm text-white">Valid Till: 20Dec, 2025</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default promo;
