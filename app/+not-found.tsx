import { Link, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "@/constants/colors";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Sayfa Bulunamadı" }} />
      <View style={styles.container}>
        <Text style={styles.emoji}>🌸</Text>
        <Text style={styles.title}>Sayfa Bulunamadı</Text>
        <Text style={styles.subtitle}>Aradığınız sayfa mevcut değil.</Text>
        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>Ana Sayfaya Dön</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: Colors.background,
  },
  emoji: {
    fontSize: 56,
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: Colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textMuted,
    marginBottom: 24,
  },
  link: {
    backgroundColor: Colors.primary,
    borderRadius: 14,
    paddingHorizontal: 24,
    paddingVertical: 13,
  },
  linkText: {
    fontSize: 15,
    color: "#fff",
    fontWeight: "700",
  },
});
