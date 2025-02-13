import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  StyleSheet,
  TextInput,
} from "react-native";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { fetchDocuments } from "@/lib/appwrite";
import { useDispatch, useSelector } from "react-redux";
import { updateTypes } from "@/stateSlice/typeSlice";
import { ScrollView } from "react-native";
import { Link, useRouter } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import { Picker } from "@react-native-picker/picker";
export default function Index() {
  const router = useRouter();

  const [activeFilter, setActiveFilter] = useState("All");
  const types = ["All", "female", "male", "discount", "popular"];
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState("");
  interface DataItem {
    $id: string;
    title: string;
    price: number;
    description: string;
    rating: number;
    size: string[];
    seller: string;
    image: string;
  }

  const handleDetails = (id: string) => {
    router.push(`/details/${id}`);
  };

  const dispatch = useDispatch();
  const selectedType = useSelector((state: string) => state.types);
  console.log("user ig", selectedType);

  const handleTypeChange = (type) => {
    dispatch(updateTypes(type));
  };

  const { user, session } = useAuth();
  console.log("active user", user);
  console.log("active session", session);

  const [selectedValue, setSelectedValue] = useState<string>("asc");

  useEffect(() => {
    const applyFilter = async () => {
      setLoading(true);
      try {
        const response = await fetchDocuments(
          selectedType,
          selectedValue,
          searchQuery
        );
        setData(response);
        console.log("Fetched Documents:", response);
      } catch (error) {
        console.error("Error fetching documents:", error);
      } finally {
        setLoading(false);
      }
    };

    applyFilter();
  }, [selectedValue, selectedType, searchQuery]);
  const options = [
    { label: "Ascending", value: "asc" },
    { label: "Descending", value: "dsc" },
  ];

  return (
    <SafeAreaView className="flex-1">
      <Navbar />

      {/* Wrap filters and search in a ScrollView */}
      <ScrollView>
        {/* Filter section */}
        <FlatList
          className="mt-10"
          contentContainerStyle={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
          data={types}
          horizontal
          renderItem={({ item }) => (
            <View style={{ marginHorizontal: 8 }}>
              <TouchableOpacity
                activeOpacity={0.4}
                className={
                  item !== activeFilter
                    ? `px-5 py-2 rounded-full border-purple-600 border-2`
                    : `px-5 py-2 rounded-full bg-purple-600`
                }
                onPress={() => (setActiveFilter(item), handleTypeChange(item))}
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
          )}
          keyExtractor={(item) => item}
          showsHorizontalScrollIndicator={false}
        />

        {/* Sorting Picker */}
        <View style={styles.container}>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedValue}
              onValueChange={(itemValue) => {
                console.log("Selected filter:", itemValue);
                setSelectedValue(itemValue);
              }}
              style={styles.picker}
            >
              <Picker.Item label="Choose an option..." value="" />
              {options.map((item, index) => (
                <Picker.Item
                  key={index}
                  label={item.label}
                  value={item.value}
                />
              ))}
            </Picker>
          </View>
        </View>

        {/* Search Input */}
        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            margin: 10,
            paddingHorizontal: 10,
            borderRadius: 8,
          }}
          placeholder="Search by title..."
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
      </ScrollView>

      {/* FlatList should be separate with flex-1 to allow scrolling */}
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#6200EE" />
          <Text>Loading data...</Text>
        </View>
      ) : (
        <FlatList
          data={data}
          numColumns={2}
          contentContainerStyle={{
            paddingBottom: 10,
          }}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => (
            <View className="relative m-1 p-2">
              <TouchableOpacity onPress={() => handleDetails(item.$id)}>
                <View className="bg-gray-200 rounded-t-3xl rounded-b-3xl p-4">
                  <Image
                    source={{ uri: item.image }}
                    style={{ width: 135, height: 150 }}
                  />
                </View>
                <View className="mt-5">
                  <Text className="font-bold text-xl text-center">
                    {item.title}
                  </Text>
                  <Text className="text-gray-400 text-center">
                    ${item.price}
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ position: "absolute", top: 14, right: 18 }}
              >
                <AntDesign name="hearto" size={24} color="black" />
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    overflow: "hidden",
    width: 250,
  },
  picker: {
    height: 50,
    width: "100%",
  },
  selectedText: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: "bold",
  },
});
