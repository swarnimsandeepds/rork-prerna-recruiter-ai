import { router } from "expo-router";
import { Plus, X } from "lucide-react-native";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useUser } from "@/contexts/UserContext";
import Colors from "@/constants/colors";

export default function ProfileSetupScreen() {
  const { updateProfile } = useUser();
  const insets = useSafeAreaInsets();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [experience, setExperience] = useState<string>("");
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState<string>("");
  const [locations, setLocations] = useState<string[]>([]);
  const [locationInput, setLocationInput] = useState<string>("");
  const [remote, setRemote] = useState<boolean>(false);

  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const addLocation = () => {
    if (locationInput.trim() && !locations.includes(locationInput.trim())) {
      setLocations([...locations, locationInput.trim()]);
      setLocationInput("");
    }
  };

  const removeLocation = (location: string) => {
    setLocations(locations.filter((l) => l !== location));
  };

  const handleComplete = async () => {
    if (!name.trim() || !email.trim() || skills.length === 0) {
      alert("Please fill in at least your name, email, and one skill");
      return;
    }

    await updateProfile({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      title: title.trim(),
      experience: experience.trim(),
      skills,
      preferences: {
        jobTypes: [],
        locations,
        remote,
      },
    });

    router.replace("/(tabs)/chat" as any);
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.flex}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.content}>
            <Text style={styles.sectionTitle}>Personal Information</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Full Name *</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="John Doe"
                placeholderTextColor={Colors.textLight}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email *</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="john@example.com"
                placeholderTextColor={Colors.textLight}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Phone</Text>
              <TextInput
                style={styles.input}
                value={phone}
                onChangeText={setPhone}
                placeholder="+1 (555) 123-4567"
                placeholderTextColor={Colors.textLight}
                keyboardType="phone-pad"
              />
            </View>

            <Text style={styles.sectionTitle}>Professional Details</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Current Title</Text>
              <TextInput
                style={styles.input}
                value={title}
                onChangeText={setTitle}
                placeholder="Software Engineer"
                placeholderTextColor={Colors.textLight}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Years of Experience</Text>
              <TextInput
                style={styles.input}
                value={experience}
                onChangeText={setExperience}
                placeholder="3"
                placeholderTextColor={Colors.textLight}
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Skills *</Text>
              <View style={styles.chipInputContainer}>
                <TextInput
                  style={styles.chipInput}
                  value={skillInput}
                  onChangeText={setSkillInput}
                  placeholder="Add a skill..."
                  placeholderTextColor={Colors.textLight}
                  onSubmitEditing={addSkill}
                  returnKeyType="done"
                />
                <TouchableOpacity style={styles.addButton} onPress={addSkill}>
                  <Plus color={Colors.white} size={20} />
                </TouchableOpacity>
              </View>
              <View style={styles.chipsContainer}>
                {skills.map((skill) => (
                  <View key={skill} style={styles.chip}>
                    <Text style={styles.chipText}>{skill}</Text>
                    <TouchableOpacity onPress={() => removeSkill(skill)}>
                      <X color={Colors.primary} size={16} />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </View>

            <Text style={styles.sectionTitle}>Job Preferences</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Preferred Locations</Text>
              <View style={styles.chipInputContainer}>
                <TextInput
                  style={styles.chipInput}
                  value={locationInput}
                  onChangeText={setLocationInput}
                  placeholder="Add a location..."
                  placeholderTextColor={Colors.textLight}
                  onSubmitEditing={addLocation}
                  returnKeyType="done"
                />
                <TouchableOpacity style={styles.addButton} onPress={addLocation}>
                  <Plus color={Colors.white} size={20} />
                </TouchableOpacity>
              </View>
              <View style={styles.chipsContainer}>
                {locations.map((location) => (
                  <View key={location} style={styles.chip}>
                    <Text style={styles.chipText}>{location}</Text>
                    <TouchableOpacity onPress={() => removeLocation(location)}>
                      <X color={Colors.primary} size={16} />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </View>

            <TouchableOpacity
              style={styles.remoteToggle}
              onPress={() => setRemote(!remote)}
            >
              <View style={styles.remoteToggleContent}>
                <Text style={styles.label}>Open to Remote Work</Text>
                <View style={[styles.switch, remote && styles.switchActive]}>
                  <View
                    style={[styles.switchThumb, remote && styles.switchThumbActive]}
                  />
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.completeButton}
              onPress={handleComplete}
              activeOpacity={0.8}
            >
              <Text style={styles.completeButtonText}>Complete Setup</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  flex: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    padding: 24,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700" as const,
    color: Colors.text,
    marginTop: 16,
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    fontWeight: "600" as const,
    color: Colors.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: Colors.text,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  chipInputContainer: {
    flexDirection: "row",
    gap: 8,
  },
  chipInput: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: Colors.text,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  addButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    width: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  chipsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 12,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.surfaceLight,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 14,
    gap: 6,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  chipText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: "600" as const,
  },
  remoteToggle: {
    marginBottom: 32,
  },
  remoteToggleContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  switch: {
    width: 52,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.border,
    padding: 2,
  },
  switchActive: {
    backgroundColor: Colors.primary,
  },
  switchThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.white,
  },
  switchThumbActive: {
    transform: [{ translateX: 24 }],
  },
  completeButton: {
    backgroundColor: Colors.primary,
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: "center",
    elevation: 2,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  completeButtonText: {
    fontSize: 17,
    fontWeight: "700" as const,
    color: Colors.white,
  },
});
