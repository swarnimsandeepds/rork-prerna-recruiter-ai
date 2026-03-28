import { Link, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { Home } from "lucide-react-native";
import Colors from "@/constants/colors";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <Home color={Colors.primary} size={48} />
        </View>
        <Text style={styles.title}>This screen doesn&apos;t exist.</Text>
        <Text style={styles.description}>
          The page you&apos;re looking for couldn&apos;t be found.
        </Text>

        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>Go to home screen</Text>
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
    padding: 24,
    backgroundColor: Colors.background,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.surfaceLight,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "700" as const,
    color: Colors.text,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: "center",
    marginBottom: 32,
  },
  link: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  linkText: {
    fontSize: 16,
    fontWeight: "700" as const,
    color: Colors.white,
  },
});
