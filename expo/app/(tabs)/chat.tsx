import { createRorkTool, useRorkAgent } from "@rork/toolkit-sdk";
import { Stack, router } from "expo-router";
import { Send, Sparkles, Briefcase } from "lucide-react-native";
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { z } from "zod";
import { useUser } from "@/contexts/UserContext";
import Colors from "@/constants/colors";
import type { Job } from "@/types/user";

export default function ChatScreen() {
  const { profile, addJob } = useUser();
  const [input, setInput] = useState<string>("");
  const flatListRef = useRef<FlatList>(null);

  const { messages, sendMessage, error } = useRorkAgent({
    tools: {
      suggestJobs: createRorkTool({
        description:
          "Suggest job opportunities based on user's profile, skills, and preferences",
        zodSchema: z.object({
          jobs: z
            .array(
              z.object({
                id: z.string().describe("Unique job identifier"),
                title: z.string().describe("Job title"),
                company: z.string().describe("Company name"),
                location: z.string().describe("Job location"),
                type: z.string().describe("Job type (Full-time, Part-time, etc.)"),
                salary: z.string().describe("Salary range").optional(),
                description: z.string().describe("Job description"),
                requirements: z
                  .array(z.string())
                  .describe("List of job requirements"),
                matchScore: z
                  .number()
                  .min(0)
                  .max(100)
                  .describe("How well the job matches the user profile (0-100)"),
                postedDate: z.string().describe("When the job was posted"),
              })
            )
            .describe("Array of job recommendations"),
        }),
        execute(input) {
          console.log("Suggested jobs:", input.jobs);
          input.jobs.forEach((job) => addJob(job));
          return "Successfully added job recommendations";
        },
      }),
    },
  });

  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(input.trim());
      setInput("");
    }
  };

  const handleQuickAction = (message: string) => {
    sendMessage(message);
  };

  const systemMessage = profile
    ? `I'm Prerna, your AI recruitment partner! I know your profile:\n\nName: ${profile.name}\nTitle: ${profile.title || "Not specified"}\nExperience: ${profile.experience || "Not specified"} years\nSkills: ${profile.skills.join(", ")}\n\nHow can I help you today?`
    : `Hi! I'm Prerna, your AI recruitment partner. I noticed you haven't completed your profile yet. Let me help you find your dream job!`;

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Prerna",
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
              <Sparkles color={Colors.white} size={22} />
            </TouchableOpacity>
          ),
        }}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.flex}
        keyboardVerticalOffset={100}
      >
        {messages.length === 0 ? (
          <View style={styles.emptyContainer}>
            <View style={styles.iconContainer}>
              <Sparkles color={Colors.primary} size={48} />
            </View>
            <Text style={styles.emptyTitle}>Welcome to Prerna!</Text>
            <Text style={styles.emptyDescription}>{systemMessage}</Text>

            <View style={styles.quickActions}>
              <TouchableOpacity
                style={styles.quickButton}
                onPress={() => handleQuickAction("Help me find jobs")}
              >
                <Briefcase color={Colors.primary} size={20} />
                <Text style={styles.quickButtonText}>Find Jobs</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.quickButton}
                onPress={() => handleQuickAction("Review my resume")}
              >
                <Sparkles color={Colors.primary} size={20} />
                <Text style={styles.quickButtonText}>Resume Review</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.messagesList}
            renderItem={({ item }) => (
              <View
                style={[
                  styles.messageContainer,
                  item.role === "user" ? styles.userMessage : styles.aiMessage,
                ]}
              >
                {item.role === "assistant" && (
                  <View style={styles.aiAvatar}>
                    <Sparkles color={Colors.white} size={16} />
                  </View>
                )}
                <View
                  style={[
                    styles.messageBubble,
                    item.role === "user"
                      ? styles.userBubble
                      : styles.aiBubble,
                  ]}
                >
                  {item.parts.map((part: any, i: number) => {
                    if (part.type === "text") {
                      return (
                        <Text
                          key={`${item.id}-${i}`}
                          style={[
                            styles.messageText,
                            item.role === "user" && styles.userMessageText,
                          ]}
                        >
                          {part.text}
                        </Text>
                      );
                    }
                    if (part.type === "tool") {
                      if (
                        part.state === "input-streaming" ||
                        part.state === "input-available"
                      ) {
                        return (
                          <View key={`${item.id}-${i}`} style={styles.toolContainer}>
                            <ActivityIndicator color={Colors.primary} />
                            <Text style={styles.toolText}>
                              Finding jobs for you...
                            </Text>
                          </View>
                        );
                      }
                      if (part.state === "output-available") {
                        return (
                          <View key={`${item.id}-${i}`} style={styles.toolContainer}>
                            <Briefcase color={Colors.success} size={16} />
                            <Text style={styles.toolText}>
                              Found {(part.output as { jobs: Job[] }).jobs.length} jobs! Check the Jobs tab.
                            </Text>
                          </View>
                        );
                      }
                    }
                    return null;
                  })}
                </View>
              </View>
            )}
          />
        )}

        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error.message}</Text>
          </View>
        )}

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder="Ask Prerna anything..."
            placeholderTextColor={Colors.textLight}
            multiline
            maxLength={500}
          />
          <TouchableOpacity
            style={[styles.sendButton, !input.trim() && styles.sendButtonDisabled]}
            onPress={handleSend}
            disabled={!input.trim()}
          >
            <Send
              color={input.trim() ? Colors.white : Colors.textLight}
              size={20}
            />
          </TouchableOpacity>
        </View>
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
  headerButton: {
    marginRight: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
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
  emptyTitle: {
    fontSize: 28,
    fontWeight: "700" as const,
    color: Colors.text,
    marginBottom: 12,
  },
  emptyDescription: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 32,
  },
  quickActions: {
    flexDirection: "row",
    gap: 12,
  },
  quickButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: Colors.surface,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  quickButtonText: {
    fontSize: 15,
    fontWeight: "600" as const,
    color: Colors.primary,
  },
  messagesList: {
    padding: 16,
    paddingBottom: 8,
  },
  messageContainer: {
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  userMessage: {
    justifyContent: "flex-end",
  },
  aiMessage: {
    justifyContent: "flex-start",
  },
  aiAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  messageBubble: {
    maxWidth: "75%",
    padding: 14,
    borderRadius: 16,
  },
  userBubble: {
    backgroundColor: Colors.primary,
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    backgroundColor: Colors.surface,
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 22,
    color: Colors.text,
  },
  userMessageText: {
    color: Colors.white,
  },
  toolContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 4,
  },
  toolText: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontStyle: "italic" as const,
  },
  errorContainer: {
    backgroundColor: Colors.error,
    padding: 12,
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 8,
  },
  errorText: {
    color: Colors.white,
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    padding: 16,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    gap: 12,
  },
  input: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    color: Colors.text,
    maxHeight: 100,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  sendButtonDisabled: {
    backgroundColor: Colors.border,
  },
});
