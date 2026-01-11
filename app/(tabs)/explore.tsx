import { StyleSheet, Text, View } from "react-native";

export default function ExploreScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Explore</Text>
      <Text style={styles.text}>
        Coming soon: saved phrases, streaks, and vocab sets.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B1220",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: { color: "white", fontSize: 28, fontWeight: "800", marginBottom: 10 },
  text: {
    color: "rgba(255,255,255,0.75)",
    textAlign: "center",
    fontSize: 16,
  },
});
