import AsyncStorage from "@react-native-async-storage/async-storage";
import createContextHook from "@nkzw/create-context-hook";
import { useEffect, useState, useCallback, useMemo } from "react";
import { UserProfile, Job } from "@/types/user";

const STORAGE_KEY_PROFILE = "@prerna_user_profile";
const STORAGE_KEY_ONBOARDED = "@prerna_onboarded";

export const [UserContext, useUser] = createContextHook(() => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isOnboarded, setIsOnboarded] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const [profileData, onboardedData] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEY_PROFILE),
        AsyncStorage.getItem(STORAGE_KEY_ONBOARDED),
      ]);

      if (profileData) {
        setProfile(JSON.parse(profileData));
      }

      if (onboardedData) {
        setIsOnboarded(JSON.parse(onboardedData));
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = useCallback(async (newProfile: UserProfile) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(newProfile));
      setProfile(newProfile);
      console.log("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  }, []);

  const completeOnboarding = useCallback(async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY_ONBOARDED, JSON.stringify(true));
      setIsOnboarded(true);
      console.log("Onboarding completed");
    } catch (error) {
      console.error("Error completing onboarding:", error);
    }
  }, []);

  const addJob = useCallback((job: Job) => {
    setJobs((prev) => [...prev, job]);
  }, []);

  const updateJobs = useCallback((newJobs: Job[]) => {
    setJobs(newJobs);
  }, []);

  return useMemo(
    () => ({
      profile,
      isOnboarded,
      isLoading,
      jobs,
      updateProfile,
      completeOnboarding,
      addJob,
      updateJobs,
    }),
    [profile, isOnboarded, isLoading, jobs, updateProfile, completeOnboarding, addJob, updateJobs]
  );
});
