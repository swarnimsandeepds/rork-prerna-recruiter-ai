import { Stack, router } from "expo-router";
import {
  User,
  Mail,
  Phone,
  Briefcase,
  MapPin,
  Edit,
  Award,
} from "lucide-react-native";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useUser } from "@/contexts/UserContext";
import Colors from "@/constants/colors";

export default function ProfileScreen() {
  const { profile } = useUser();

  if (!profile) {
    return (
      <View style={styles.container}>
        <Stack.Screen
          options={{
            headerShown: true,
            title: "Profile",
            headerStyle: {
              backgroundColor: Colors.primary,
            },
            headerTintColor: Colors.white,
            headerTitleStyle: {
              fontWeight: "700" as const,
            },
          }}
        />
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIconContainer}>
            <User color={Colors.primary} size={48} />
          </View>
          <Text style={styles.emptyTitle}>No Profile Yet</Text>
          <Text style={styles.emptyDescription}>
            Complete your profile to get personalized job recommendations
          </Text>
          <TouchableOpacity
            style={styles.setupButton}
            onPress={() => router.push("/profile-setup")}
          >
            <Text style={styles.setupButtonText}>Complete Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Profile",
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTintColor: Colors.white,
          headerTitleStyle: {
            fontWeight: "700" as const,
          },
          headerRight: () => (
            <TouchableOpacity
              onPress={() => router.push("/profile-setup")}
              style={styles.headerButton}
            >
              <Edit color={Colors.white} size={22} />
            </TouchableOpacity>
          ),
        }}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {profile.name.charAt(0).toUpperCase()}
            </Text>
          </View>
          <Text style={styles.name}>{profile.name}</Text>
          {profile.title && <Text style={styles.title}>{profile.title}</Text>}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          <View style={styles.card}>
            <View style={styles.infoRow}>
              <Mail color={Colors.primary} size={20} />
              <Text style={styles.infoText}>{profile.email}</Text>
            </View>
            {profile.phone && (
              <View style={styles.infoRow}>
                <Phone color={Colors.primary} size={20} />
                <Text style={styles.infoText}>{profile.phone}</Text>
              </View>
            )}
          </View>
        </View>

        {profile.experience && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
            <View style={styles.card}>
              <View style={styles.infoRow}>
                <Briefcase color={Colors.primary} size={20} />
                <Text style={styles.infoText}>
                  {profile.experience} years of experience
                </Text>
              </View>
            </View>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <View style={styles.card}>
            <View style={styles.skillsContainer}>
              {profile.skills.map((skill) => (
                <View key={skill} style={styles.skillBadge}>
                  <Award color={Colors.primary} size={14} />
                  <Text style={styles.skillText}>{skill}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {profile.preferences.locations.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Preferred Locations</Text>
            <View style={styles.card}>
              <View style={styles.locationsContainer}>
                {profile.preferences.locations.map((location) => (
                  <View key={location} style={styles.locationRow}>
                    <MapPin color={Colors.primary} size={16} />
                    <Text style={styles.locationText}>{location}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Work Preferences</Text>
          <View style={styles.card}>
            <View style={styles.preferenceRow}>
              <Text style={styles.preferenceLabel}>Remote Work</Text>
              <Text
                style={[
                  styles.preferenceValue,
                  profile.preferences.remote && styles.preferenceValueActive,
                ]}
              >
                {profile.preferences.remote ? "Open" : "Not Open"}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  headerButton: {
    marginRight: 16,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  emptyIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.surfaceLight,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: "700" as const,
    color: Colors.text,
    marginBottom: 12,
  },
  emptyDescription: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 24,
  },
  setupButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
  },
  setupButtonText: {
    fontSize: 16,
    fontWeight: "700" as const,
    color: Colors.white,
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 40,
    fontWeight: "700" as const,
    color: Colors.white,
  },
  name: {
    fontSize: 28,
    fontWeight: "700" as const,
    color: Colors.text,
    marginBottom: 4,
  },
  title: {
    fontSize: 18,
    color: Colors.textSecondary,
    fontWeight: "600" as const,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700" as const,
    color: Colors.text,
    marginBottom: 12,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },
  infoText: {
    fontSize: 16,
    color: Colors.text,
    flex: 1,
  },
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  skillBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.surfaceLight,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    gap: 6,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  skillText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: "600" as const,
  },
  locationsContainer: {
    gap: 12,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  locationText: {
    fontSize: 15,
    color: Colors.text,
  },
  preferenceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  preferenceLabel: {
    fontSize: 16,
    color: Colors.text,
    fontWeight: "600" as const,
  },
  preferenceValue: {
    fontSize: 15,
    color: Colors.textSecondary,
  },
  preferenceValueActive: {
    color: Colors.success,
    fontWeight: "700" as const,
  },
});
