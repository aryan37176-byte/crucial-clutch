export type LifeFactor =
  | "relation"
  | "study"
  | "work"
  | "event/wedding"
  | "routine"
  | "health"
  | "carrier"
  | "medication"
  | "health visit/doctor visit"
  | "bill payment"
  | "form filling"
  | "important day";

export interface Task {
  id: string;
  title: string;
  lifeFactor: LifeFactor;
  dueDate: string; // YYYY-MM-DD
  startTime: string; // HH:MM
  durationMinutes: number; // Duration of task
  priority: 0 | 20 | 40 | 60 | 80 | 100;
  
  // High liability attachment fields
  selfieUrl?: string; // Base64 or local image URL
  videoUrl?: string; // Simulated video path or base64 
  writtenLetter?: string; // At least 50 words required for 80% and 100%
  
  // State 
  status: "pending" | "done" | "failed" | "retry_8h" | "retry_3h";
  failedAtTime?: string; // Saved when failed 
  retryDueTime?: string; // Max deadline for retry
  validReasonExcused?: boolean;
  userExcuse?: string;
  bluntAdviceReceived?: string;
  sorryNote?: string;
  completedAt?: string;
}

export interface UserSession {
  email: string;
  isLoggedIn: boolean;
  username: string;
  streakDays: number;
}

export interface LifeFactorPriority {
  factor: LifeFactor;
  rank: number; // 1 to 12
}

export interface DefeatedArtConfig {
  title: string;
  description: string;
  artwork: string; // CSS-based abstract artwork or icon depiction
  quote: string;
}
