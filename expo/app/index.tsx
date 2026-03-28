import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { useUser } from "@/contexts/UserContext";
import Colors from "@/constants/colors";

export default function Index() {
  const { isOnboarded, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!isOnboarded) {
        router.replace("/onboarding");
      } else {
        router.replace("/(tabs)/chat");
      }
    }
  }, [isLoading, isOnboarded, router]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
  },
});
