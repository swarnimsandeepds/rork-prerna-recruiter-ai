export interface UserProfile {
  name: string;
  email: string;
  phone?: string;
  title?: string;
  experience?: string;
  skills: string[];
  preferences: JobPreferences;
  resumeUri?: string;
}

export interface JobPreferences {
  jobTypes: string[];
  locations: string[];
  salaryRange?: {
    min: number;
    max: number;
  };
  remote: boolean;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary?: string;
  description: string;
  requirements: string[];
  matchScore: number;
  postedDate: string;
}
