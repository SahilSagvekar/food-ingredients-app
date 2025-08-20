import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Image } from "react-native";
import { useState } from "react";

export default function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([
    { id: "1", name: "Oreo Cookies", brand: "Nabisco", image: null },
    { id: "2", name: "Coca Cola", brand: "Coca Cola", image: null },
  ]); // placeholder data

  const handleSearch = () => {
    console.log("Searching for:", query);
    // later connect to API
  };

  const renderItem = ({ item }: any) => (
    <TouchableOpacity style={styles.card}>
      {item.image ? (
        <Image source={{ uri: item.image }} style={styles.image} />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Text>📦</Text>
        </View>
      )}
      <View style={{ flex: 1 }}>
        <Text style={styles.foodName}>{item.name}</Text>
        <Text style={styles.brand}>{item.brand}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🍔 Food Ingredient App</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter food name..."
        value={query}
        onChangeText={setQuery}
      />
      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>

      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        style={{ width: "100%", marginTop: 20 }}
      />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 12 },
  searchButton: {
    backgroundColor: "#2BBBC1",
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
  },
  searchButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  card: {
    flexDirection: "row",
    backgroundColor: "#f8f8f8",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  image: { width: 50, height: 50, borderRadius: 6, marginRight: 10 },
  imagePlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 6,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  foodName: { fontWeight: "bold", fontSize: 16 },
  brand: { color: "#555", fontSize: 14 },
});
