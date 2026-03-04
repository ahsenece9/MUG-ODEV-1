import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Platform, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "@/constants/colors";

export default function ModalScreen() {
  return (
    <Pressable style={styles.overlay} onPress={() => router.back()}>
      <View style={styles.modalContent}>
        <Text style={styles.emoji}>🌸</Text>
        <Text style={styles.title}>Hamilelik Rehberim</Text>
        <Text style={styles.description}>Hamilelik yolculuğunuzda yanınızdayız.</Text>
        <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
          <Text style={styles.closeButtonText}>Kapat</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: Colors.overlay,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: Colors.surface,
    borderRadius: 24,
    padding: 28,
    margin: 20,
    alignItems: "center",
    minWidth: 300,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },
  emoji: { fontSize: 40, marginBottom: 12 },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: Colors.text,
    marginBottom: 8,
    letterSpacing: -0.4,
  },
  description: {
    textAlign: "center",
    marginBottom: 24,
    color: Colors.textSecondary,
    lineHeight: 20,
    fontSize: 14,
  },
  closeButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 28,
    paddingVertical: 13,
    borderRadius: 14,
    minWidth: 120,
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "700",
    textAlign: "center",
    fontSize: 15,
  },
});
