import { Stack } from "expo-router";
import { Briefcase, MapPin, Clock, TrendingUp } from "lucide-react-native";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useUser } from "@/contexts/UserContext";
import Colors from "@/constants/colors";
import type { Job } from "@/types/user";

export default function JobsScreen() {
  const { jobs } = useUser();

  const renderJobCard = ({ item }: { item: Job }) => (
    <TouchableOpacity style={styles.jobCard} activeOpacity={0.7}>
      <View style={styles.jobHeader}>
        <View style={styles.jobTitleContainer}>
          <Text style={styles.jobTitle}>{item.title}</Text>
          <Text style={styles.company}>{item.company}</Text>
        </View>
        <View style={styles.matchBadge}>
          <TrendingUp color={Colors.success} size={14} />
          <Text style={styles.matchScore}>{item.matchScore}%</Text>
        </View>
      </View>

      <View style={styles.jobDetails}>
        <View style={styles.detailRow}>
          <MapPin color={Colors.textSecondary} size={16} />
          <Text style={styles.detailText}>{item.location}</Text>
        </View>
        <View style={styles.detailRow}>
          <Briefcase color={Colors.textSecondary} size={16} />
          <Text style={styles.detailText}>{item.type}</Text>
        </View>
        <View style={styles.detailRow}>
          <Clock color={Colors.textSecondary} size={16} />
          <Text style={styles.detailText}>{item.postedDate}</Text>
        </View>
      </View>

      {item.salary && (
        <Text style={styles.salary}>{item.salary}</Text>
      )}

      <Text style={styles.description} numberOfLines={3}>
        {item.description}
      </Text>

      <View style={styles.requirementsContainer}>
        {item.requirements.slice(0, 3).map((req, idx) => (
          <View key={idx} style={styles.requirementBadge}>
            <Text style={styles.requirementText}>{req}</Text>
          </View>
        ))}
        {item.requirements.length > 3 && (
          <Text style={styles.moreRequirements}>
            +{item.requirements.length - 3} more
          </Text>
        )}
      </View>

      <TouchableOpacity style={styles.applyButton}>
        <Text style={styles.applyButtonText}>View Details</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Job Matches",
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTintColor: Colors.white,
          headerTitleStyle: {
            fontWeight: "700" as const,
          },
        }}
      />

      {jobs.length === 0 ? (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIconContainer}>
            <Briefcase color={Colors.primary} size={48} />
          </View>
          <Text style={styles.emptyTitle}>No Job Matches Yet</Text>
          <Text style={styles.emptyDescription}>
            Chat with Prerna to get personalized job recommendations based on your skills and preferences!
          </Text>
        </View>
      ) : (
        <FlatList
          data={jobs}
          keyExtractor={(item) => item.id}
          renderItem={renderJobCard}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  listContent: {
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
  },
  jobCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    elevation: 2,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  jobHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  jobTitleContainer: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: "700" as const,
    color: Colors.text,
    marginBottom: 4,
  },
  company: {
    fontSize: 15,
    color: Colors.textSecondary,
    fontWeight: "600" as const,
  },
  matchBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.surfaceLight,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 4,
  },
  matchScore: {
    fontSize: 14,
    fontWeight: "700" as const,
    color: Colors.success,
  },
  jobDetails: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  detailText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  salary: {
    fontSize: 16,
    fontWeight: "700" as const,
    color: Colors.primary,
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: Colors.text,
    lineHeight: 20,
    marginBottom: 12,
  },
  requirementsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },
  requirementBadge: {
    backgroundColor: Colors.surfaceLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  requirementText: {
    fontSize: 12,
    color: Colors.text,
    fontWeight: "600" as const,
  },
  moreRequirements: {
    fontSize: 12,
    color: Colors.textSecondary,
    alignSelf: "center",
  },
  applyButton: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },
  applyButtonText: {
    fontSize: 15,
    fontWeight: "700" as const,
    color: Colors.white,
  },
});
