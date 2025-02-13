import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { fetchDocuments } from "@/lib/appwrite";

const Sort = () => {
  const [selectedValue, setSelectedValue] = useState<string>("");

  useEffect(() => {
    const applyFilter = async () => {
      if (selectedValue !== "") {
        console.log("Fetching documents for filter:", selectedValue);
        try {
          const response = await fetchDocuments("All", selectedValue);
          console.log("Fetched Documents:", response);
        } catch (error) {
          console.error("Error fetching documents:", error);
        }
      }
    };

    applyFilter();
  }, [selectedValue]);

  const options = [
    { label: "Ascending", value: "asc" },
    { label: "Descending", value: "dsc" },
    { label: "Relevant", value: "" }, // Default option
  ];

  return (
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
            <Picker.Item key={index} label={item.label} value={item.value} />
          ))}
        </Picker>
      </View>
      {selectedValue !== "" && (
        <Text style={styles.selectedText}>Selected: {selectedValue}</Text>
      )}
    </View>
  );
};

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

export default Sort;
