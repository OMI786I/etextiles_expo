import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { fetchDocuments, getSession } from "@/lib/appwrite";
import { useDispatch, useSelector } from "react-redux";
import { updateTypes } from "@/stateSlice/typeSlice";
import { Link } from "expo-router";

export default function Index() {
  const [activeFilter, setActiveFilter] = useState("All");
  const types = ["All", "female", "male", "discount", "popular"];
  const [check, setCheck] = useState("");
  const [check2, setCheck2] = useState("");
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Loading state

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

  const dispatch = useDispatch();
  const selectedType = useSelector((state: string) => state.types);
  console.log("user ig", selectedType);

  const session = async () => {
    const currentUser = await getSession();
    return currentUser;
  };
  useEffect(() => {
    const checkSession = async () => {
      try {
        const currentUser = await session();
        if (currentUser) {
          console.log("Session data:", currentUser);
        } else {
          console.log("No active session");
        }
      } catch (error) {
        console.error("Error fetching session:", error);
      }
    };

    checkSession();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading
      try {
        const result = await fetchDocuments(selectedType);
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchData();
  }, [selectedType]);

  const handleTypeChange = (type) => {
    dispatch(updateTypes(type));
  };

  return (
    <SafeAreaView className="p-3">
      <Navbar />
      <TouchableOpacity>
        {" "}
        <Link href={"/register"}>Register Now</Link>
      </TouchableOpacity>
      <TouchableOpacity>
        {" "}
        <Link href={"/sign-in"}>Signin Now</Link>
      </TouchableOpacity>

      {/** Filter section */}
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
                className={item !== activeFilter ? `text-black` : `text-white`}
              >
                {item}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
      />

      {/** Loading Animation */}
      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 50,
          }}
        >
          <ActivityIndicator size="large" color="#6200EE" />
          <Text>Loading data...</Text>
        </View>
      ) : (
        /** Cards Section */
        <FlatList
          data={data}
          numColumns={2}
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 50,
          }}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => (
            <View className="relative m-1 p-2">
              <TouchableOpacity onPress={() => setCheck("clicked card")}>
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
                onPress={() => setCheck2("clicked heart")}
                style={{
                  position: "absolute",
                  top: 14,
                  right: 18,
                }}
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
