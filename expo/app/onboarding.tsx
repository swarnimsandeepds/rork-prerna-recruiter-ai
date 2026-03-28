import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Sparkles, Briefcase, Target, TrendingUp } from "lucide-react-native";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useUser } from "@/contexts/UserContext";
import Colors from "@/constants/colors";



export default function OnboardingScreen() {
  const { completeOnboarding } = useUser();
  const insets = useSafeAreaInsets();

  const handleGetStarted = async () => {
    await completeOnboarding();
    router.replace("/profile-setup");
  };

  return (
    <LinearGradient
      colors={[Colors.gradient1, Colors.gradient2]}
      style={styles.gradient}
    >
      <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <View style={styles.iconContainer}>
              <Sparkles color={Colors.white} size={48} strokeWidth={2} />
            </View>
            <Text style={styles.title}>Welcome to Prerna</Text>
            <Text style={styles.subtitle}>
              Your AI-Powered Recruitment Partner
            </Text>
          </View>

          <View style={styles.featuresContainer}>
            <FeatureCard
              icon={<Briefcase color={Colors.primary} size={32} />}
              title="Smart Job Matching"
              description="Get personalized job recommendations based on your skills and preferences"
            />
            <FeatureCard
              icon={<Target color={Colors.primary} size={32} />}
              title="Career Guidance"
              description="Receive expert advice on resume building and interview preparation"
            />
            <FeatureCard
              icon={<TrendingUp color={Colors.primary} size={32} />}
              title="Track Progress"
              description="Monitor your applications and stay organized throughout your job search"
            />
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={handleGetStarted}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>

          <Text style={styles.disclaimer}>
            By continuing, you agree to our Terms of Service and Privacy Policy
          </Text>
        </ScrollView>
      </View>
    </LinearGradient>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <View style={styles.featureCard}>
      <View style={styles.featureIcon}>
        <Text>{icon}</Text>
      </View>
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureDescription}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  header: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 40,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 36,
    fontWeight: "700" as const,
    color: Colors.white,
    marginBottom: 12,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "rgba(255, 255, 255, 0.9)",
    textAlign: "center",
    fontWeight: "500" as const,
  },
  featuresContainer: {
    gap: 16,
    marginBottom: 40,
  },
  featureCard: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
  },
  featureIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.surfaceLight,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  featureTitle: {
    fontSize: 20,
    fontWeight: "700" as const,
    color: Colors.text,
    marginBottom: 8,
    textAlign: "center",
  },
  featureDescription: {
    fontSize: 15,
    color: Colors.textSecondary,
    textAlign: "center",
    lineHeight: 22,
  },
  button: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 32,
    alignItems: "center",
    marginBottom: 16,
    elevation: 4,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "700" as const,
    color: Colors.primary,
  },
  disclaimer: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.7)",
    textAlign: "center",
    lineHeight: 18,
  },
});
