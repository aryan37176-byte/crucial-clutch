import React, { useState, useEffect, useMemo } from "react";
import { 
  Sword, Shield, ShieldAlert, Award, Trophy, Trash2, Calendar, 
  Clock, Plus, Check, X, Flame, Camera, Video, FileText, 
  AlertTriangle, RotateCcw, Compass, Dumbbell, ShieldCheck, Mail, Lock,
  ChevronUp, ChevronDown, CheckCircle, Brain, RefreshCw, Star, Info,
  Sparkles, Quote
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { LifeFactor, Task, UserSession, LifeFactorPriority } from "./types";
import { WarriorArt } from "./components/WarriorArt";
import { CrucialLogo } from "./components/CrucialLogo";
import { WarriorGallery, WARRIORS_DATA, Warrior } from "./components/WarriorGallery";

// Initial Life Factors lists
const DEFAULT_LIFE_FACTORS: LifeFactor[] = [
  "relation",
  "study",
  "work",
  "event/wedding",
  "routine",
  "health",
  "carrier",
  "medication",
  "health visit/doctor visit",
  "bill payment",
  "form filling",
  "important day"
];

// Presets for medium math questions
const MATH_PRESETS = [
  { q: "66 * 2", a: 132 },
  { q: "45 + 19", a: 64 },
  { q: "12 * 7", a: 84 },
  { q: "180 / 4", a: 45 },
  { q: "95 - 37", a: 58 },
  { q: "75 + 46", a: 121 },
  { q: "15 * 6", a: 90 },
  { q: "140 / 5", a: 28 },
  { q: "112 - 46", a: 66 },
  { q: "9 * 13", a: 117 }
];

interface ThemeConfig {
  id: string;
  name: string;
  description: string;
  bgImage: string;
  vars: Record<string, string>;
}

const THEMES: ThemeConfig[] = [
  {
    id: "terracotta",
    name: "Sovereign Terracotta",
    description: "Charcoal fortress & ancient orange warrior clay",
    bgImage: "linear-gradient(to right, rgba(28, 20, 16, 0.95), rgba(12, 10, 9, 0.85)), url('/src/assets/images/spartan_cliff_sunset_1782274848517.jpg')",
    vars: {
      "--color-zinc-50": "#fafaf9",
      "--color-zinc-100": "#f5f5f4",
      "--color-zinc-200": "#e7e5e4",
      "--color-zinc-300": "#d6d3d1",
      "--color-zinc-350": "#d6d3d1",
      "--color-zinc-400": "#a8a29e",
      "--color-zinc-450": "#87807e",
      "--color-zinc-500": "#78716c",
      "--color-zinc-600": "#57534e",
      "--color-zinc-650": "#44403c",
      "--color-zinc-700": "#44403c",
      "--color-zinc-800": "#292524",
      "--color-zinc-850": "rgba(28, 25, 23, 0.7)",
      "--color-zinc-900": "#14110f",
      "--color-zinc-950": "#0c0a09",
      "--color-black": "#060404",
      "--color-amber-50": "#fff7ed",
      "--color-amber-100": "#ffedd5",
      "--color-amber-200": "#fed7aa",
      "--color-amber-300": "#fdba74",
      "--color-amber-400": "#fb923c",
      "--color-amber-500": "#f97316",
      "--color-amber-600": "#ea580c",
      "--color-amber-700": "#c2410c",
      "--color-amber-850": "#431407",
      "--color-amber-900": "#7c2d12",
      "--color-amber-950": "#1c0a02",
      "--border-theme-color": "#1c1917"
    }
  },
  {
    id: "shogun",
    name: "Obsidian Shogun",
    description: "Cyber ninja shadows & blazing hot neon pink",
    bgImage: "linear-gradient(to right, rgba(21, 10, 17, 0.95), rgba(5, 2, 4, 0.85)), url('/src/assets/images/viking_snow_storm_1782274899206.jpg')",
    vars: {
      "--color-zinc-50": "#fcfafb",
      "--color-zinc-100": "#f4edf2",
      "--color-zinc-200": "#e6d6e2",
      "--color-zinc-300": "#d2bbcd",
      "--color-zinc-350": "#cca9c4",
      "--color-zinc-400": "#b185a6",
      "--color-zinc-450": "#9a6c90",
      "--color-zinc-500": "#83537a",
      "--color-zinc-600": "#633c5c",
      "--color-zinc-650": "#472b43",
      "--color-zinc-700": "#40263c",
      "--color-zinc-800": "#261523",
      "--color-zinc-850": "rgba(38, 21, 35, 0.7)",
      "--color-zinc-900": "#10060e",
      "--color-zinc-950": "#050204",
      "--color-black": "#020102",
      "--color-amber-50": "#fdf2f8",
      "--color-amber-100": "#fce7f3",
      "--color-amber-200": "#fbcfe8",
      "--color-amber-300": "#f9a8d4",
      "--color-amber-400": "#f472b6",
      "--color-amber-500": "#ec4899",
      "--color-amber-600": "#db2777",
      "--color-amber-700": "#be185d",
      "--color-amber-850": "#500724",
      "--color-amber-900": "#4c051e",
      "--color-amber-950": "#1c000a",
      "--border-theme-color": "#261523"
    }
  },
  {
    id: "glacier",
    name: "Nordic Frost",
    description: "Glacial slate & shimmering ice-cold aurora",
    bgImage: "linear-gradient(to right, rgba(12, 22, 26, 0.95), rgba(3, 8, 10, 0.85)), url('/src/assets/images/meditating_yogi_armor_1782274886427.jpg')",
    vars: {
      "--color-zinc-50": "#f0f7f9",
      "--color-zinc-100": "#e1eff2",
      "--color-zinc-200": "#c2dfdf",
      "--color-zinc-300": "#98cad0",
      "--color-zinc-350": "#85bec6",
      "--color-zinc-400": "#5fa3af",
      "--color-zinc-500": "#418290",
      "--color-zinc-600": "#316572",
      "--color-zinc-650": "#244a54",
      "--color-zinc-700": "#244a54",
      "--color-zinc-800": "#122b32",
      "--color-zinc-850": "rgba(18, 43, 50, 0.7)",
      "--color-zinc-900": "#07161c",
      "--color-zinc-950": "#03080a",
      "--color-black": "#010304",
      "--color-amber-50": "#f0fdf4",
      "--color-amber-100": "#dcfce7",
      "--color-amber-200": "#bbf7d0",
      "--color-amber-300": "#86efac",
      "--color-amber-400": "#4ade80",
      "--color-amber-500": "#22c55e",
      "--color-amber-600": "#16a34a",
      "--color-amber-700": "#15803d",
      "--color-amber-850": "#14532d",
      "--color-amber-900": "#14532d",
      "--color-amber-950": "#052e16",
      "--border-theme-color": "#122b32"
    }
  },
  {
    id: "byzantine",
    name: "Imperial Byzantium",
    description: "Royal purple robes & shimmering antique gold",
    bgImage: "linear-gradient(to right, rgba(26, 16, 36, 0.95), rgba(7, 3, 11, 0.85)), url('/src/assets/images/indian_archer_mahabharat_1782274871068.jpg')",
    vars: {
      "--color-zinc-50": "#fcfafa",
      "--color-zinc-100": "#f6f2fa",
      "--color-zinc-200": "#ece1f6",
      "--color-zinc-300": "#dacbeb",
      "--color-zinc-350": "#cfb6e4",
      "--color-zinc-400": "#b391d6",
      "--color-zinc-500": "#9268bd",
      "--color-zinc-600": "#734ba0",
      "--color-zinc-650": "#56367b",
      "--color-zinc-700": "#56367b",
      "--color-zinc-800": "#351f4f",
      "--color-zinc-850": "rgba(53, 31, 79, 0.7)",
      "--color-zinc-900": "#140c1e",
      "--color-zinc-950": "#07030b",
      "--color-black": "#030105",
      "--color-amber-50": "#fefdf2",
      "--color-amber-100": "#fefbc9",
      "--color-amber-200": "#fdf794",
      "--color-amber-300": "#fbf05a",
      "--color-amber-400": "#f4e01c",
      "--color-amber-500": "#eab308",
      "--color-amber-600": "#ca8a04",
      "--color-amber-700": "#a16207",
      "--color-amber-850": "#451a03",
      "--color-amber-900": "#713f12",
      "--color-amber-950": "#1c0d02",
      "--border-theme-color": "#351f4f"
    }
  }
];

// --- Safe Storage Helper to handle blocked/inaccessible localStorage ---
const memoryStorage = new Map<string, string>();
const safeStorage = {
  getItem(key: string): string | null {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        return window.localStorage.getItem(key);
      }
    } catch (e) {
      // Safe fallback
    }
    return memoryStorage.get(key) ?? null;
  },
  setItem(key: string, value: string): void {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        window.localStorage.setItem(key, value);
        return;
      }
    } catch (e) {
      // Safe fallback
    }
    memoryStorage.set(key, value);
  },
  removeItem(key: string): void {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        window.localStorage.removeItem(key);
        return;
      }
    } catch (e) {
      // Safe fallback
    }
    memoryStorage.delete(key);
  }
};

// --- Safety Helpers for localStorage JSON parsing ---
function getSavedSessionEmail(): string {
  const saved = safeStorage.getItem("crucial_clutch_session");
  if (!saved) return "";
  try {
    const parsed = JSON.parse(saved);
    if (parsed && parsed.isLoggedIn && parsed.email) {
      return parsed.email;
    }
  } catch (e) {
    console.error("Error parsing session email:", e);
  }
  return "";
}

function safeJSONParse<T>(key: string, fallback: T): T {
  const saved = safeStorage.getItem(key);
  if (!saved) return fallback;
  try {
    const parsed = JSON.parse(saved);
    if (parsed === null || parsed === undefined) return fallback;
    if (Array.isArray(fallback) && !Array.isArray(parsed)) {
      return fallback;
    }
    if (typeof fallback === "object" && typeof parsed !== "object") {
      return fallback;
    }
    return parsed as T;
  } catch (e) {
    console.error(`Error parsing key ${key}:`, e);
    return fallback;
  }
}

export default function App() {
  // --- Persistent State ---
  const [session, setSession] = useState<UserSession>(() => {
    const saved = safeStorage.getItem("crucial_clutch_session");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === "object") {
          return parsed;
        }
      } catch (e) {
        console.error("Failed to parse session:", e);
      }
    }
    return { email: "", isLoggedIn: false, username: "Warrior", streakDays: 0 };
  });

  // Track the email currently parsed and loaded in state to prevent state update race-conditions
  const [loadedEmail, setLoadedEmail] = useState<string | null>(() => {
    const email = getSavedSessionEmail();
    return email;
  });

  const [hasCompletedSetup, setHasCompletedSetup] = useState<boolean>(() => {
    const email = getSavedSessionEmail();
    const setupKey = email ? `crucial_clutch_setup_${email}` : "crucial_clutch_setup";
    return safeStorage.getItem(setupKey) === "true";
  });

  const [factorPriorities, setFactorPriorities] = useState<LifeFactorPriority[]>(() => {
    const email = getSavedSessionEmail();
    const factorsKey = email ? `crucial_clutch_factors_${email}` : "crucial_clutch_factors";
    return safeJSONParse(factorsKey, DEFAULT_LIFE_FACTORS.map((fact, index) => ({ factor: fact, rank: index + 1 })));
  });

  const [tasks, setTasks] = useState<Task[]>(() => {
    const email = getSavedSessionEmail();
    const tasksKey = email ? `crucial_clutch_tasks_${email}` : "crucial_clutch_tasks";
    return safeJSONParse(tasksKey, [] as Task[]);
  });

  const [streakDays, setStreakDays] = useState<number>(() => {
    const email = getSavedSessionEmail();
    const streakKey = email ? `crucial_clutch_streak_${email}` : "crucial_clutch_streak";
    const saved = safeStorage.getItem(streakKey) || "0";
    return parseInt(saved, 10);
  });

  const [themeId, setThemeId] = useState<string>(() => {
    const email = getSavedSessionEmail();
    const themeKey = email ? `crucial_clutch_theme_${email}` : "crucial_clutch_theme";
    return safeStorage.getItem(themeKey) || "terracotta";
  });

  const [mascotId, setMascotId] = useState<string>(() => {
    const email = getSavedSessionEmail();
    const mascotKey = email ? `crucial_clutch_mascot_${email}` : "crucial_clutch_mascot";
    return safeStorage.getItem(mascotKey) || "spartan_cliff";
  });

  // --- Theme / Section state ---
  const [activeTab, setActiveTab] = useState<"front" | "yodha" | "defeated" | "commitments" | "pantheon">("front");

  // --- Custom states for Retreat Cabin & Slideshow ---
  const [showRetreatConfirm, setShowRetreatConfirm] = useState(false);
  const [activeSlideshowIndex, setActiveSlideshowIndex] = useState(0);
  const [showForgotHelp, setShowForgotHelp] = useState(false);

  // Auto advance slideshow for login page
  useEffect(() => {
    if (session.isLoggedIn) return;
    const interval = setInterval(() => {
      setActiveSlideshowIndex(prev => (prev + 1) % 5);
    }, 4500);
    return () => clearInterval(interval);
  }, [session.isLoggedIn]);
  
  const [customAlert, setCustomAlert] = useState<string | null>(null);

  // --- Chronicle Simulated Time state ---
  const [isSimulatedTime, setIsSimulatedTime] = useState<boolean>(true);
  const [simulatedTimeOffset, setSimulatedTimeOffset] = useState<number>(0); // offset in milliseconds from real time

  // Get current applicable time according to state
  const getCurrentTimeDate = (): Date => {
    if (isSimulatedTime) {
      return new Date(Date.now() + simulatedTimeOffset);
    }
    return new Date();
  };

  const formattedBattleTime = useMemo(() => {
    const current = getCurrentTimeDate();
    return current.toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true
    });
  }, [simulatedTimeOffset, isSimulatedTime]);

  // Synchronize state when user logs in, switches, or signs out
  useEffect(() => {
    const email = session.isLoggedIn ? session.email : "";
    if (loadedEmail === email) return; // Wait until they match

    const setupKey = email ? `crucial_clutch_setup_${email}` : "crucial_clutch_setup";
    const factorsKey = email ? `crucial_clutch_factors_${email}` : "crucial_clutch_factors";
    const tasksKey = email ? `crucial_clutch_tasks_${email}` : "crucial_clutch_tasks";
    const streakKey = email ? `crucial_clutch_streak_${email}` : "crucial_clutch_streak";
    const themeKey = email ? `crucial_clutch_theme_${email}` : "crucial_clutch_theme";
    const mascotKey = email ? `crucial_clutch_mascot_${email}` : "crucial_clutch_mascot";

    const savedSetup = safeStorage.getItem(setupKey) === "true";

    let savedFactors = DEFAULT_LIFE_FACTORS.map((fact, index) => ({ factor: fact, rank: index + 1 }));
    const savedFactorsRaw = safeStorage.getItem(factorsKey);
    if (savedFactorsRaw) {
      try {
        const parsed = JSON.parse(savedFactorsRaw);
        if (Array.isArray(parsed)) {
          savedFactors = parsed;
        }
      } catch (e) { console.error(e); }
    }

    let savedTasks: Task[] = [];
    const savedTasksRaw = safeStorage.getItem(tasksKey);
    if (savedTasksRaw) {
      try {
        const parsed = JSON.parse(savedTasksRaw);
        if (Array.isArray(parsed)) {
          savedTasks = parsed;
        }
      } catch (e) { console.error(e); }
    }

    let savedStreak = 0;
    const savedStreakRaw = safeStorage.getItem(streakKey);
    if (savedStreakRaw) {
      savedStreak = parseInt(savedStreakRaw, 10);
    }

    const savedTheme = safeStorage.getItem(themeKey) || "terracotta";
    const savedMascot = safeStorage.getItem(mascotKey) || "spartan_cliff";

    // Set loaded states all at once
    setHasCompletedSetup(savedSetup);
    setFactorPriorities(savedFactors);
    setTasks(savedTasks);
    setStreakDays(savedStreak);
    setThemeId(savedTheme);
    setMascotId(savedMascot);

    // Finally mark email as loaded to unlock saving helpers
    setLoadedEmail(email);
  }, [session.email, session.isLoggedIn, loadedEmail]);

  // Save changes helpers (guarded with loadedEmail to prevent overwrite races during login/logout transitions)
  useEffect(() => {
    safeStorage.setItem("crucial_clutch_session", JSON.stringify(session));
  }, [session]);

  useEffect(() => {
    const email = session.isLoggedIn ? session.email : "";
    if (loadedEmail !== email) return; // Prevent overwriting target user keys during load cycle

    const factorsKey = email ? `crucial_clutch_factors_${email}` : "crucial_clutch_factors";
    safeStorage.setItem(factorsKey, JSON.stringify(factorPriorities));
  }, [factorPriorities, session.isLoggedIn, session.email, loadedEmail]);

  useEffect(() => {
    const email = session.isLoggedIn ? session.email : "";
    if (loadedEmail !== email) return; // Prevent overwriting target user keys during load cycle

    const tasksKey = email ? `crucial_clutch_tasks_${email}` : "crucial_clutch_tasks";
    safeStorage.setItem(tasksKey, JSON.stringify(tasks));
  }, [tasks, session.isLoggedIn, session.email, loadedEmail]);

  useEffect(() => {
    const email = session.isLoggedIn ? session.email : "";
    if (loadedEmail !== email) return; // Prevent overwriting target user keys during load cycle

    const streakKey = email ? `crucial_clutch_streak_${email}` : "crucial_clutch_streak";
    safeStorage.setItem(streakKey, streakDays.toString());
  }, [streakDays, session.isLoggedIn, session.email, loadedEmail]);

  useEffect(() => {
    const email = session.isLoggedIn ? session.email : "";
    if (loadedEmail !== email) return; // Prevent overwriting target user keys during load cycle

    const themeKey = email ? `crucial_clutch_theme_${email}` : "crucial_clutch_theme";
    safeStorage.setItem(themeKey, themeId);
  }, [themeId, session.isLoggedIn, session.email, loadedEmail]);

  useEffect(() => {
    const email = session.isLoggedIn ? session.email : "";
    if (loadedEmail !== email) return; // Prevent overwriting target user keys during load cycle

    const mascotKey = email ? `crucial_clutch_mascot_${email}` : "crucial_clutch_mascot";
    safeStorage.setItem(mascotKey, mascotId);
  }, [mascotId, session.isLoggedIn, session.email, loadedEmail]);

  // Sync session streak with actual streak state
  useEffect(() => {
    if (session.isLoggedIn && session.streakDays !== streakDays) {
      setSession(prev => ({ ...prev, streakDays }));
    }
  }, [streakDays, session.isLoggedIn]);

  // --- Login State & Forms ---
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginTab, setLoginTab] = useState<"login" | "register">("login");

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    // Validate email format xxx...@gmail.com, only alphabets or numbers before '@gmail.com'
    const cleanPrefixRegex = /^[a-zA-Z0-9]+@gmail\.com$/;
    if (!cleanPrefixRegex.test(loginEmail)) {
      setLoginError("Invalid email format! It must be alphanumeric and end with @gmail.com (e.g. alex45@gmail.com, no special characters/dots in username).");
      return;
    }

    if (loginPassword.length < 4) {
      setLoginError("Password must be at least 4 characters.");
      return;
    }

    const usernameMatch = loginEmail.match(/^([^@]+)/);
    const extractedUser = usernameMatch ? usernameMatch[1] : "Warrior";
    
    const updated = {
      email: loginEmail,
      isLoggedIn: true,
      username: extractedUser.charAt(0).toUpperCase() + extractedUser.slice(1),
      streakDays: streakDays
    };
    setSession(updated);
  };

  // --- Tactical Factor Sorting Form ---
  const [aiSortingText, setAiSortingText] = useState("");
  const [isOrganizing, setIsOrganizing] = useState(false);
  const [aiReasoning, setAiReasoning] = useState("");

  const forageAIOrder = async () => {
    setIsOrganizing(true);
    try {
      const response = await fetch("/api/ai/organize-factors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          preferences: aiSortingText,
          list: factorPriorities.map(f => f.factor)
        })
      });
      const data = await response.json();
      if (data.orderedList) {
        const newRanks: LifeFactorPriority[] = data.orderedList.map((f: LifeFactor, i: number) => ({
          factor: f,
          rank: i + 1
        }));
        setFactorPriorities(newRanks);
        setAiReasoning(data.reasoning);
      }
    } catch (e) {
      console.error(e);
      setAiReasoning("Tactical Engine offline. Default robust Roman tactical hierarchy engaged (Study & Health given highest glory).");
    } finally {
      setIsOrganizing(false);
    }
  };

  const saveSetupAndLaunch = () => {
    if (session.isLoggedIn && session.email) {
      safeStorage.setItem(`crucial_clutch_setup_${session.email}`, "true");
    }
    safeStorage.setItem("crucial_clutch_setup", "true");
    setHasCompletedSetup(true);
  };

  // --- Add Task Form ---
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [selectedFactor, setSelectedFactor] = useState<LifeFactor>("study");
  const [newTaskDate, setNewTaskDate] = useState(() => {
    // default to today's date
    const d = new Date();
    return d.toISOString().split("T")[0];
  });
  const [newTaskTime, setNewTaskTime] = useState("10:00");
  const [newTaskDuration, setNewTaskDuration] = useState(30);
  const [newTaskPriority, setNewTaskPriority] = useState<0 | 20 | 40 | 60 | 80 | 100>(40);

  // High liability optional payload inputs
  const [selfieOption, setSelfieOption] = useState<string>("");
  const [letterText, setLetterText] = useState<string>("");
  const [videoSimulated, setVideoSimulated] = useState<boolean>(false);
  
  const [addTaskError, setAddTaskError] = useState("");

  // Handle priority sliders (0%, 20%, 40%, 60%, 80%, 100%)
  const handlePrioritySlide = (val: number) => {
    const fixedLevels: (0 | 20 | 40 | 60 | 80 | 100)[] = [0, 20, 40, 60, 80, 100];
    // Find closest level
    const closest = fixedLevels.reduce((prev, curr) => {
      return Math.abs(curr - val) < Math.abs(prev - val) ? curr : prev;
    });
    setNewTaskPriority(closest);
  };

  // Handle Selfie capture simulation (using nice visual canvas)
  const simulateSelfie = () => {
    // Generate a beautiful, stylized character avatar selfie simulation
    const avatars = [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=60"
    ];
    setSelfieOption(avatars[Math.floor(Math.random() * avatars.length)]);
  };

  const handleAddNewTask = (e: React.FormEvent) => {
    e.preventDefault();
    setAddTaskError("");

    if (!newTaskTitle.trim()) {
      setAddTaskError("State your focus title, warrior! Empty intents crumble.");
      return;
    }

    // Check letter length for 80% / 100% priority
    if (newTaskPriority >= 80) {
      if (!letterText || letterText.split(/\s+/).filter(Boolean).length < 50) {
        setAddTaskError("High Liability Alert! 80% and 100% priority vows require a solemn commitment letter of AT LEAST 50 words explaining the absolute cosmic importance of this task to your lifetime crown!");
        return;
      }
    }

    const created: Task = {
      id: "task_" + Date.now(),
      title: newTaskTitle,
      lifeFactor: selectedFactor,
      dueDate: newTaskDate,
      startTime: newTaskTime,
      durationMinutes: Number(newTaskDuration),
      priority: newTaskPriority,
      selfieUrl: selfieOption || undefined,
      writtenLetter: letterText || undefined,
      videoUrl: videoSimulated ? "Simulated Warrior Video Log (Duty Pledge Level 5)" : undefined,
      status: "pending"
    };

    setTasks(prev => [created, ...prev]);

    // reset addition form
    setNewTaskTitle("");
    setSelfieOption("");
    setLetterText("");
    setVideoSimulated(false);
  };

  // --- Dynamic sorting mechanism ---
  // 1st: Decreasing order of Priority Slider percentage
  // 2nd: Life Factor rank collision breaker
  // 3rd: Due Date & Time
  const sortedTasks = useMemo(() => {
    const factorRankMap = new Map<LifeFactor, number>(factorPriorities.map(f => [f.factor, f.rank]));

    return [...tasks].sort((a, b) => {
      // 1st: Priority percentage (Decreasing)
      if (b.priority !== a.priority) {
        return b.priority - a.priority;
      }

      // 2nd: Life Factor rank breaker (Lower rank numerical means higher priority, e.g. #1 Study before #5 Routine)
      const rankA = factorRankMap.get(a.lifeFactor) || 99;
      const rankB = factorRankMap.get(b.lifeFactor) || 99;
      if (rankA !== rankB) {
        return rankA - rankB; // ascending numerical rank
      }

      // 3rd: Due date & time (chronological)
      const dateCompare = a.dueDate.localeCompare(b.dueDate);
      if (dateCompare !== 0) return dateCompare;
      return a.startTime.localeCompare(b.startTime);
    });
  }, [tasks, factorPriorities]);

  const activeTasksPending = useMemo(() => {
    return sortedTasks.filter(t => t.status === "pending" || t.status === "retry_8h" || t.status === "retry_3h");
  }, [sortedTasks]);

  // Streak Title Finder
  const getStreakTitle = (days: number): { title: string; desc: string; romanVibe?: boolean; fill?: string } => {
    if (days >= 150) return { title: "Bhishma Pitamah", desc: "The Grand Sire of Invincible Vows. Your discipline is absolute.", romanVibe: false };
    if (days >= 100) return { title: "Arjuna", desc: "The Peerless Archer. Unwavering focus on the eye of the target.", romanVibe: false };
    if (days >= 80) return { title: "Karna", desc: "The Unyielding Sun Warrior. Fears no hardship, generous in spirit.", romanVibe: false };
    if (days >= 70) return { title: "Yudhishthira", desc: "The Embodiment of Dharma. Master of truth and righteous action.", romanVibe: false };
    if (days >= 60) return { title: "Bhima", desc: "The Unstoppable Force. Boundless strength and immense courage.", romanVibe: false };
    if (days >= 45) return { title: "Dronacharya", desc: "The Supreme Master. Crowned with deep knowledge and self-command.", romanVibe: false };
    if (days >= 30) return { title: "Abhimanyu", desc: "The Fearless Youth. Breaking through the toughest formations.", fill: "amber" };
    if (days >= 20) return { title: "Ghatotkacha", desc: "The Fierce Warrior. Loyal, mighty, and striking fear into laziness.", romanVibe: false };
    if (days >= 15) return { title: "Satyaki", desc: "The Relentless Commander. An unshakeable force on the battlefield.", romanVibe: false };
    if (days >= 10) return { title: "Nakula", desc: "The Swift Blade. Graceful, disciplined, and remarkably resilient.", romanVibe: false };
    return { title: "Sahadeva", desc: "The Wise Strategist. Stepping onto the path of greatness.", romanVibe: false };
  };

  const streakTitleInfo = useMemo(() => getStreakTitle(streakDays), [streakDays]);

  // --- Real-time / Clock Simulation triggers ---
  // Task Trigger management
  const [confrontingTask, setConfrontingTask] = useState<Task | null>(null);
  const [notDoneExcuseText, setNotDoneExcuseText] = useState("");
  const [isVerifyingExcuse, setIsVerifyingExcuse] = useState(false);
  const [verificationResult, setVerificationResult] = useState<{
    isValid: boolean;
    feedback: string;
    challenge: string;
  } | null>(null);

  // Popup Math Problems Lock state
  const [mathAnswers, setMathAnswers] = useState<string[]>(["", "", "", "", ""]);
  const [mathAnswersCorrect, setMathAnswersCorrect] = useState<boolean[]>([false, false, false, false, false]);
  const [currentMathProblems, setCurrentMathProblems] = useState<typeof MATH_PRESETS>([]);
  const [mathGateTriggered, setMathGateTriggered] = useState(false);

  // Motivational quote loaded for current popup
  const [activePopupQuote, setActivePopupQuote] = useState({ text: "", author: "" });
  const [isBackupDoneSelfieRequired, setIsBackupDoneSelfieRequired] = useState(false);
  const [instantSelfieAttached, setInstantSelfieAttached] = useState("");

  // Continuous notifications warning cache to display on page
  const continuousWarnings = useMemo(() => {
    const now = getCurrentTimeDate();
    const warnings: string[] = [];

    activeTasksPending.forEach(task => {
      const taskDate = new Date(`${task.dueDate}T8:00:00`); // assume day begins
      // difference in days
      const diffTime = taskDate.getTime() - now.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (task.priority === 40 && diffDays > 0 && diffDays <= 3) {
        warnings.push(`[Warn 40%] Task "${task.title}" is due in ${diffDays} days! Steel yourself. Continuous notifications sent at 8 AM and 10 PM daily.`);
      } else if (task.priority === 60 && diffDays > 0 && diffDays <= 5) {
        warnings.push(`[Warn 60%] Urgent battlefield confrontation in ${diffDays} days for "${task.title}". The Math shield and 8 AM/10 PM continuous alarms are in active standby!`);
      } else if (task.priority === 80 && diffDays > 0 && diffDays <= 10) {
        warnings.push(`[Warn 80%] Sovereign mandate alert! "${task.title}" is ${diffDays} days away. Video pledge file loaded. Vigilance requested.`);
      } else if (task.priority === 100 && diffDays > 0 && diffDays <= 15) {
        warnings.push(`[CRITICAL 100%] Eternal warrior alarm! Pitamaha Bhishma's trial is due in ${diffDays} days for task "${task.title}". Alarms ringing twice daily.`);
      }
    });

    return warnings;
  }, [activeTasksPending, simulatedTimeOffset, isSimulatedTime]);

  // Load a motivational quote from server
  const loadPopupQuote = async (task: Task) => {
    try {
      const response = await fetch("/api/ai/get-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mood: "warrior emergency", taskTitle: task.title })
      });
      const data = await response.json();
      setActivePopupQuote({ text: data.quote, author: data.author });
    } catch {
      setActivePopupQuote({
        text: "He who has conquered his own self has reached supreme harmony and self-command.",
        author: "Lord Krishna (Bhagavad Gita)"
      });
    }
  };

  // Check for newly triggered task deadlines
  const checkForAlerts = () => {
    if (confrontingTask) return; // already in active modal gate
    const now = getCurrentTimeDate();

    // Look for pending tasks where due local date and time has passed
    const triggered = activeTasksPending.find(task => {
      const taskDateTime = new Date(`${task.dueDate}T${task.startTime}`);
      return now >= taskDateTime;
    });

    if (triggered) {
      setConfrontingTask(triggered);
      loadPopupQuote(triggered);
      
      // Setup math questions if 60% priority
      if (triggered.priority === 60) {
        // Shuffle and pick 5 math equations
        const shuffled = [...MATH_PRESETS].sort(() => 0.5 - Math.random()).slice(0, 5);
        setCurrentMathProblems(shuffled);
        setMathAnswers(["", "", "", "", ""]);
        setMathAnswersCorrect([false, false, false, false, false]);
        setMathGateTriggered(true);
      } else {
        setMathGateTriggered(false);
      }

      setVerificationResult(null);
      setNotDoneExcuseText("");
      setIsBackupDoneSelfieRequired(false);
      setInstantSelfieAttached("");
    }
  };

  // Watch simulated offset and check alerts
  useEffect(() => {
    const timer = setInterval(() => {
      checkForAlerts();
    }, 2000);
    return () => clearInterval(timer);
  }, [activeTasksPending, confrontingTask, simulatedTimeOffset]);

  // Handle Math answer changing
  const handleMathAnswer = (index: number, val: string) => {
    const newAns = [...mathAnswers];
    newAns[index] = val;
    setMathAnswers(newAns);

    const numeric = parseInt(val, 10);
    const correct = numeric === currentMathProblems[index].a;
    const newCorrect = [...mathAnswersCorrect];
    newCorrect[index] = correct;
    setMathAnswersCorrect(newCorrect);
  };

  const allMathSolved = useMemo(() => {
    if (confrontingTask?.priority !== 60) return true;
    return mathAnswersCorrect.every(c => c === true);
  }, [mathAnswersCorrect, confrontingTask]);

  // Mark task as completed (Victory)
  const markConfrontingTaskDone = (customSelfie?: string) => {
    if (!confrontingTask) return;

    const selfieToSave = customSelfie || instantSelfieAttached || confrontingTask.selfieUrl;

    setTasks(prev => prev.map(t => {
      if (t.id === confrontingTask.id) {
        return {
          ...t,
          status: "done",
          selfieUrl: selfieToSave,
          completedAt: getCurrentTimeDate().toLocaleString()
        };
      }
      return t;
    }));

    // increment streak!
    setStreakDays(prev => prev + 1);
    setConfrontingTask(null);
  };

  // Verify Excuse flow
  const verifyExcuseSubmit = async () => {
    if (!confrontingTask) return;
    setIsVerifyingExcuse(true);

    try {
      const response = await fetch("/api/ai/verify-excuse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          taskTitle: confrontingTask.title,
          priority: confrontingTask.priority,
          excuse: notDoneExcuseText
        })
      });
      const data = await response.json();
      setVerificationResult(data);
    } catch {
      setVerificationResult({
        isValid: false,
        feedback: "Your excuse has been rejected. Warriors do not retreat behind petty wordplay.",
        challenge: "Perform 10 heavy military pushups and vow to finished the challenge now!"
      });
    } finally {
      setIsVerifyingExcuse(false);
    }
  };

  // Face the Challenge (within 3h for 80/100, or 8h for 60% priority, etc.)
  const acceptChallenge = (retryHours: number) => {
    if (!confrontingTask) return;

    const limitTime = new Date(getCurrentTimeDate().getTime() + retryHours * 60 * 60 * 1000);

    setTasks(prev => prev.map(t => {
      if (t.id === confrontingTask.id) {
        return {
          ...t,
          status: retryHours === 3 ? "retry_3h" : "retry_8h",
          retryDueTime: limitTime.toISOString(),
          userExcuse: notDoneExcuseText,
          validReasonExcused: verificationResult?.isValid || false
        };
      }
      return t;
    }));

    setConfrontingTask(null);
  };

  // Mark Confronting Task as Failed (Defeated)
  const resolveTaskFailurePermanently = () => {
    if (!confrontingTask) return;

    // sorry notes example
    let sorryNote = `I am sorry, ${session.username || 'Warrior'}, that you failed to prioritize "${confrontingTask.title}". "Warriors create, worriers hesitate. Be a warrior, not a worrier." If you cannot complete your task, it means you represent temporary convenience rather than your absolute vows. Respect yourself!`;

    setTasks(prev => prev.map(t => {
      if (t.id === confrontingTask.id) {
        return {
          ...t,
          status: "failed",
          failedAtTime: getCurrentTimeDate().toLocaleString(),
          userExcuse: notDoneExcuseText || "Gave no excuse.",
          sorryNote: sorryNote
        };
      }
      return t;
    }));

    // Reset/decrement streak on final failure
    setStreakDays(prev => Math.max(0, prev - 5)); // penalty
    setConfrontingTask(null);
  };

  // Complete a retry pending task from the list
  const completeRetryTask = (task: Task) => {
    setTasks(prev => prev.map(t => {
      if (t.id === task.id) {
        return {
          ...t,
          status: "done",
          completedAt: getCurrentTimeDate().toLocaleString()
        };
      }
      return t;
    }));
    setStreakDays(prev => prev + 1);
  };

  // Fail a retry task from list directly if 8h/3h limit passed
  const enforceRetryFailCheck = (task: Task) => {
    if (!task.retryDueTime) return;
    const limit = new Date(task.retryDueTime);
    if (isNaN(limit.getTime())) return;
    if (getCurrentTimeDate() > limit) {
      setTasks(prev => prev.map(t => {
        if (t.id === task.id) {
          const sNote = `I am sorry, ${session.username || 'Warrior'}, that you failed "${task.title}". 'Warriors create, worriers hesitate. Be a warrior, not a worrier.' If you can't complete your task means your not respecting your self sorry to be that way`;
          return {
            ...t,
            status: "failed",
            failedAtTime: getCurrentTimeDate().toLocaleString(),
            sorryNote: sNote
          };
        }
        return t;
      }));
      setStreakDays(prev => Math.max(0, prev - 8));
    }
  };

  // --- Trigger checking loop for retries safely inside a useEffect ---
  useEffect(() => {
    tasks.forEach(task => {
      if (task.status === "retry_8h" || task.status === "retry_3h") {
        enforceRetryFailCheck(task);
      }
    });
  }, [tasks, simulatedTimeOffset, isSimulatedTime]);

  // Handle deleting tasks to clean up old logs
  const deleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
  };

  // --- UI Render ---
  const activeTheme = THEMES.find(t => t.id === themeId) || THEMES[0];
  const themeInlineStyles = {
    ...activeTheme.vars,
    backgroundImage: activeTheme.bgImage,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed"
  } as React.CSSProperties;

  if (!session.isLoggedIn) {
    const activeSlideWarrior = WARRIORS_DATA[activeSlideshowIndex] || WARRIORS_DATA[0];

    return (
      <div style={themeInlineStyles} className="min-h-screen text-zinc-100 flex flex-col md:flex-row relative overflow-hidden transition-all duration-500">
        
        {/* LEFT COLUMN: Interactive Dynamic Slideshow showcasing the 5 provided photos */}
        <div className="hidden md:flex md:w-1/2 relative bg-zinc-950 flex-col justify-between p-10 lg:p-12 border-r-4 border-[var(--color-amber-500)]/20 shadow-[8px_0_24px_rgba(0,0,0,0.8)] overflow-hidden">
          {/* Slideshow background image with clean fade transitions */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeSlideshowIndex}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ 
                backgroundImage: `url("${activeSlideWarrior.image}")`
              }}
            />
          </AnimatePresence>

          {/* Dark high-contrast vignette and gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60 opacity-95 mix-blend-multiply pointer-events-none"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_transparent_10%,_rgba(0,0,0,0.95)_90%)] pointer-events-none"></div>

          {/* Top Logo and Tagline */}
          <div className="relative z-10 flex items-center gap-2.5">
            <div className="bg-black/75 p-2 rounded-xl border border-[var(--color-amber-500)]/30 backdrop-blur-md">
              <Shield className="w-5 h-5 text-[var(--color-amber-500)] animate-pulse" />
            </div>
            <div>
              <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-[var(--color-amber-500)] block font-bold leading-none">Chamber Directive</span>
              <span className="text-xs font-serif text-zinc-100 font-bold uppercase tracking-wider">Crucial Clutch Alpha</span>
            </div>
          </div>

          {/* Central Warrior Crest Overlay */}
          <div className="relative z-10 my-auto text-center max-w-sm mx-auto">
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeSlideshowIndex}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4 }}
                className="p-5 bg-black/60 backdrop-blur-md rounded-2xl border border-[var(--color-amber-500)]/20 shadow-xl"
              >
                <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-[var(--color-amber-400)] block font-bold mb-1">
                  {activeSlideWarrior.type}
                </span>
                <h3 className="font-serif text-[var(--color-amber-500)] font-black uppercase tracking-[0.1em] text-sm md:text-base mb-1.5">
                  {activeSlideWarrior.name}
                </h3>
                <p className="text-[11px] text-zinc-300 font-sans leading-relaxed">
                  {activeSlideWarrior.bio}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom section layout container */}
          <div className="relative z-10 w-full space-y-4">
            {/* Quote Box */}
            <div className="w-full max-w-md mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlideshowIndex}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="bg-black/95 border-2 border-[var(--color-amber-500)]/40 p-4 lg:p-5 rounded-xl relative shadow-2xl shadow-black/95"
                >
                  {/* Antique Corner Studs */}
                  <div className="absolute top-1.5 left-1.5 w-1.5 h-1.5 rounded-full bg-[var(--color-amber-500)]/50"></div>
                  <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[var(--color-amber-500)]/50"></div>
                  <div className="absolute bottom-1.5 left-1.5 w-1.5 h-1.5 rounded-full bg-[var(--color-amber-500)]/50"></div>
                  <div className="absolute bottom-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[var(--color-amber-500)]/50"></div>

                  <div className="flex justify-center mb-1">
                    <Quote className="w-5 h-5 text-[var(--color-amber-500)]/30 rotate-180" />
                  </div>

                  <p className="font-serif italic text-xs lg:text-sm text-amber-100 font-medium text-center leading-relaxed">
                    "{activeSlideWarrior.quote}"
                  </p>
                  
                  <div className="flex items-center justify-center gap-3 mt-2">
                    <div className="h-px w-6 bg-[var(--color-amber-500)]/30"></div>
                    <span className="font-serif text-[9px] font-bold text-[var(--color-amber-500)] uppercase tracking-widest">— {activeSlideWarrior.name.split(" of ")[0]}</span>
                    <div className="h-px w-6 bg-[var(--color-amber-500)]/30"></div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Interactive Thumbnail Navigator of provided images */}
            <div className="w-full max-w-md mx-auto bg-black/80 backdrop-blur-md border border-zinc-900 p-2.5 rounded-xl flex flex-col gap-1.5">
              <div className="flex justify-between items-center px-1">
                <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest block font-bold">
                  ⚔️ SELECT LEGENDARY PATHWAY
                </span>
                <span className="text-[8px] font-mono text-amber-500/70">
                  {activeSlideshowIndex + 1} / 5
                </span>
              </div>
              <div className="grid grid-cols-5 gap-1.5">
                {WARRIORS_DATA.slice(0, 5).map((warrior, idx) => (
                  <button
                    key={warrior.id}
                    type="button"
                    onClick={() => setActiveSlideshowIndex(idx)}
                    className={`relative aspect-[4/3] rounded-md overflow-hidden border-2 transition-all duration-300 ${
                      activeSlideshowIndex === idx
                        ? "border-[var(--color-amber-500)] scale-105 shadow-md shadow-[var(--color-amber-500)]/20"
                        : "border-zinc-850 opacity-60 hover:opacity-100"
                    }`}
                    title={warrior.name}
                  >
                    <img
                      src={warrior.image}
                      alt={warrior.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    {/* Active dynamic indicator */}
                    {activeSlideshowIndex === idx && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end justify-center pb-0.5">
                        <span className="text-[7px] font-mono text-white tracking-tighter leading-none truncate w-full text-center px-0.5 font-bold">
                          {warrior.type.split(" ")[0]}
                        </span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Gilded Login Frame & Plus Pattern */}
        <div className="w-full md:w-1/2 bg-black flex flex-col justify-center items-center p-6 md:p-12 relative">
          
          {/* Subtle Plus Sign Grid overlay */}
          <div 
            className="absolute inset-0 opacity-[0.06] pointer-events-none bg-repeat bg-[size:32px_32px]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Cpath d='M16 12v8M12 16h8' stroke='%23f59e0b' stroke-width='1.5' stroke-linecap='square'/%3E%3C/svg%3E")`
            }}
          ></div>
          
          {/* Radial active theme backdrop glow */}
          <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--color-amber-500)_0%,_transparent_75%)]"></div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md bg-zinc-950/85 border-2 border-[var(--color-amber-500)]/25 rounded-2xl p-7 md:p-9 relative shadow-2xl shadow-black/100 gold-glow backdrop-blur-md z-10"
          >
            {/* Top decorative lock badge */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-zinc-950 px-5 py-1 border-t border-b border-[var(--color-amber-500)]/30 rounded flex items-center gap-1.5">
              <Sword className="w-4 h-4 text-[var(--color-amber-500)]" />
              <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-400">War Room Gate</span>
            </div>

            <CrucialLogo size="md" className="mb-4 mt-2" />

            <h2 className="text-center text-[10px] font-mono tracking-[0.25em] text-[var(--color-amber-400)] uppercase mb-5">
              FORGE YOUR DISCIPLINE · CLAIM YOUR DESTINY
            </h2>

            {/* Crossed Swords Divider */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[var(--color-amber-500)]/20"></div>
              <div className="flex items-center text-[var(--color-amber-500)]/40">
                <Sword className="w-3.5 h-3.5 rotate-45" />
                <Sword className="w-3.5 h-3.5 -rotate-45 -ml-1.5" />
              </div>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[var(--color-amber-500)]/20"></div>
            </div>

            {/* TAB SELECTORS: LOGIN & REGISTER */}
            <div className="grid grid-cols-2 gap-2 mb-6 bg-zinc-900/50 p-1.5 rounded-lg border border-zinc-850">
              <button
                type="button"
                onClick={() => {
                  setLoginTab("login");
                  setLoginError("");
                }}
                className={`py-2 rounded-md text-xs font-serif font-extrabold uppercase tracking-widest transition-all ${
                  loginTab === "login"
                    ? "bg-gradient-to-r from-[var(--color-amber-600)] to-[var(--color-amber-500)] text-black shadow-lg font-black"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => {
                  setLoginTab("register");
                  setLoginError("");
                }}
                className={`py-2 rounded-md text-xs font-serif font-extrabold uppercase tracking-widest transition-all ${
                  loginTab === "register"
                    ? "bg-gradient-to-r from-[var(--color-amber-600)] to-[var(--color-amber-500)] text-black shadow-lg font-black"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                Register
              </button>
            </div>

            {/* Info Box about profiles */}
            <div className="mb-6 p-3 rounded-lg bg-zinc-900/60 border border-zinc-850 text-center">
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                {loginTab === "login" ? (
                  <>🔑 <span className="text-[var(--color-amber-400)] font-serif font-semibold">Enter your Legion Email to load your profile.</span> Different addresses host fully distinct, isolated simulation commitments!</>
                ) : (
                  <>🛡️ <span className="text-[var(--color-amber-400)] font-serif font-semibold">Registering creates a brand-new profile.</span> Choose any unique email suffix (xxx...@gmail.com) to start your simulation.</>
                )}
              </p>
            </div>

            {/* FORM */}
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[var(--color-amber-500)]" />
                  Legion Email Address
                </label>
                <input 
                  type="text"
                  value={loginEmail}
                  onChange={e => setLoginEmail(e.target.value)}
                  placeholder="warrior100@gmail.com"
                  className="w-full bg-zinc-900/80 border border-zinc-850 rounded-lg py-2.5 px-4 text-xs focus:outline-none focus:border-[var(--color-amber-500)] focus:ring-1 focus:ring-[var(--color-amber-500)] text-zinc-100 placeholder-zinc-650 font-mono"
                  required
                />
                <span className="text-[9px] text-zinc-500 mt-1 block leading-tight">
                  Must be letters or numbers followed strictly by @gmail.com (no special characters)
                </span>
              </div>

              <div>
                <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-[var(--color-amber-500)]" />
                  Secret War Code (Password)
                </label>
                <input 
                  type="password"
                  value={loginPassword}
                  onChange={e => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-zinc-900/80 border border-zinc-850 rounded-lg py-2.5 px-4 text-xs focus:outline-none focus:border-[var(--color-amber-500)] focus:ring-1 focus:ring-[var(--color-amber-500)] text-zinc-100 placeholder-zinc-650"
                  required
                />
              </div>

              {loginError && (
                <div className="bg-red-950/40 border-l-2 border-red-500 p-3 rounded text-xs text-red-300 flex items-start gap-2 animate-shake">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
                  <p className="leading-snug">{loginError}</p>
                </div>
              )}

              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-[var(--color-amber-700)] via-[var(--color-amber-600)] to-[var(--color-amber-850)] hover:from-[var(--color-amber-500)] hover:to-[var(--color-amber-600)] text-zinc-100 py-3 rounded-lg font-serif tracking-widest font-black border border-[var(--color-amber-400)]/40 hover:border-[var(--color-amber-400)] transition-all text-xs uppercase flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[var(--color-amber-500)]/10"
              >
                <Sword className="w-4 h-4" />
                {loginTab === "login" ? "⚔ ENTER THE ARENA" : "🛡 CREATE NEW SOVEREIGN PROFILE"}
              </button>
            </form>

            {/* Forgot passcode or helper */}
            <div className="text-center mt-3">
              <button 
                type="button"
                onClick={() => setShowForgotHelp(prev => !prev)}
                className="text-[10px] text-[var(--color-amber-500)]/80 hover:text-[var(--color-amber-400)] hover:underline font-mono"
              >
                {showForgotHelp ? "✕ Hide War Code Guide" : "❔ Forgot your war code?"}
              </button>
              
              {showForgotHelp && (
                <div className="mt-2.5 p-3 rounded-lg bg-zinc-900/90 border border-[var(--color-amber-500)]/30 text-left animate-fadeIn">
                  <p className="text-[10.5px] text-zinc-300 leading-relaxed font-sans">
                    🔑 <strong className="text-[var(--color-amber-400)] font-serif">Legion Account Protocol:</strong> <br />
                    - Write any prefix followed strictly by <span className="font-mono text-amber-400">@gmail.com</span> (e.g. <span className="font-mono text-zinc-400">warrior12@gmail.com</span>) to login or register instantly. <br />
                    - Different addresses load completely separate, isolated simulation accounts. <br />
                    - Passwords are encrypted and saved locally. Enter at least 4 characters.
                  </p>
                </div>
              )}
            </div>

            {/* Themes and Footer */}
            <div className="mt-6 pt-5 border-t border-zinc-900/80 text-center space-y-4">
              <div className="flex flex-col items-center gap-2 bg-zinc-900/30 p-2.5 rounded-xl border border-zinc-900/80">
                <span className="text-[10px] text-zinc-400 uppercase font-mono tracking-wider">Select Coliseum Theme:</span>
                <div className="flex flex-wrap gap-1.5 justify-center">
                  {THEMES.map(theme => (
                    <button 
                      key={theme.id}
                      onClick={() => setThemeId(theme.id)}
                      className={`px-2 py-0.5 rounded text-[10px] font-mono border transition-all ${themeId === theme.id ? 'bg-[var(--color-amber-500)] text-zinc-950 font-bold border-[var(--color-amber-400)]' : 'bg-zinc-950 text-zinc-400 border-zinc-850 hover:text-zinc-200'}`}
                    >
                      {theme.name.split(' ')[1] || theme.name}
                    </button>
                  ))}
                </div>
              </div>
              
              <p className="text-[10px] text-zinc-500 block uppercase tracking-widest leading-relaxed">
                "The true warrior fights not because he hates what is in front of him, but because he loves what he must protect." <br/>
                <span className="text-[var(--color-amber-500)]/60">— G.K. Chesterton</span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // --- First Time Life Factor priority Setup ---
  if (!hasCompletedSetup) {
    return (
      <div className="min-h-screen bg-[#070511] text-zinc-100 py-12 px-4 relative">
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_center,_rgba(98,75,154,0.35)_0%,_transparent_75%)]"></div>
        
        <div className="max-w-3xl mx-auto bg-zinc-950/90 border border-amber-500/25 rounded-2xl p-8 shadow-2xl relative gold-glow">
          <header className="border-b border-zinc-900 pb-6 mb-8 text-center">
            <div className="flex justify-center mb-4">
              <Compass className="w-12 h-12 text-amber-500 animate-spin-slow" />
            </div>
            <h1 className="text-2xl font-serif tracking-wider text-amber-400">
              LIFE FACTOR RANKING FORGE
            </h1>
            <p className="text-xs text-zinc-400 mt-2 max-w-lg mx-auto">
              Before task assignments commence, the Roman and Indian generals must understand your internal hierarchy. 
              Which sphere of life commands supreme importance? When deadline percentages collide, higher ranks rule!
            </p>
          </header>

          <main className="space-y-6">
            <div className="bg-zinc-900/60 p-5 rounded-xl border border-zinc-850">
              <label className="block text-xs font-mono uppercase tracking-widest text-amber-400 mb-2">
                ⚔️ Forge Custom Rankings with Tactician (Optional)
              </label>
              <p className="text-xs text-zinc-400 mb-3">
                Let the Tactical Engine determine an optimal battlefield arrangement based on your current personal burden or focus:
              </p>
              <textarea
                value={aiSortingText}
                onChange={e => setAiSortingText(e.target.value)}
                placeholder="e.g. I am a student preparing for JEE exam, study is crucial. My health is decent but I need constant focus on Medication of my grandmother."
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-xs text-zinc-300 focus:outline-none focus:border-amber-500 placeholder-zinc-700 h-24 font-sans"
              />
              <button
                onClick={forageAIOrder}
                disabled={isOrganizing}
                className="mt-3 bg-amber-500 hover:bg-amber-600 disabled:bg-zinc-800 disabled:text-zinc-500 text-black font-mono text-xs font-semibold py-2 px-4 rounded-lg flex items-center gap-2 transition-all cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isOrganizing ? 'animate-spin' : ''}`} />
                {isOrganizing ? "Consulting Tactical Codex..." : "Forage Order via Tactician"}
              </button>

              {aiReasoning && (
                <div className="mt-4 bg-[#140e06] p-4 rounded-lg border border-amber-900/30 text-xs text-amber-300">
                  <span className="font-serif block font-bold text-amber-400 uppercase tracking-widest mb-1 text-[10px]">
                    🎖️ GRAND GENERAL ADVICE:
                  </span>
                  <p className="italic">"{aiReasoning}"</p>
                </div>
              )}
            </div>

            <div>
              <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-4">
                👑 Current Sovereign Hierarchy (Most Critical to Least)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {factorPriorities.map((prior, index) => (
                  <div 
                    key={prior.factor}
                    className="bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-850 p-3 rounded-lg flex items-center justify-between transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-amber-500 bg-amber-950/60 w-6 h-6 rounded-full flex items-center justify-center border border-amber-500/30">
                        {index + 1}
                      </span>
                      <span className="text-xs capitalize font-medium text-zinc-200">
                        {prior.factor}
                      </span>
                    </div>
                    {/* Manual re-ordering micro controls */}
                    <div className="flex items-center gap-1">
                      {index > 0 && (
                        <button 
                          onClick={() => {
                            const copy = [...factorPriorities];
                            const temp = copy[index];
                            copy[index] = copy[index - 1];
                            copy[index - 1] = temp;
                            // re-index
                            const recalibrated = copy.map((item, i) => ({ ...item, rank: i + 1 }));
                            setFactorPriorities(recalibrated);
                          }}
                          className="p-1 hover:text-amber-400 text-zinc-500"
                        >
                          <ChevronUp className="w-4 h-4" />
                        </button>
                      )}
                      {index < factorPriorities.length - 1 && (
                        <button 
                          onClick={() => {
                            const copy = [...factorPriorities];
                            const temp = copy[index];
                            copy[index] = copy[index + 1];
                            copy[index + 1] = temp;
                            // re-index
                            const recalibrated = copy.map((item, i) => ({ ...item, rank: i + 1 }));
                            setFactorPriorities(recalibrated);
                          }}
                          className="p-1 hover:text-amber-400 text-zinc-500"
                        >
                          <ChevronDown className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-zinc-900 flex justify-end">
              <button 
                onClick={saveSetupAndLaunch}
                className="bg-gradient-to-r from-amber-500 to-amber-600 text-black font-serif font-black px-8 py-3 rounded-xl tracking-widest text-sm uppercase hover:from-amber-400 hover:to-amber-500 transition-all shadow-lg shadow-amber-950/40 cursor-pointer"
              >
                Assemble Battle Command
              </button>
            </div>
          </main>
        </div>
      </div>
    );
  }

  // Note: Trigger checking loop for retries is handled safely inside useEffect before render

  return (
    <div style={themeInlineStyles} className="min-h-screen text-zinc-100 flex flex-col font-sans border-4 md:border-[10px] border-[#150f2f] relative transition-all duration-500">
      
      {/* Top Banner & Title Indicator */}
      <header className="bg-gradient-to-b from-[#150f2f] to-[#070511] border-b border-amber-500/20 relative shadow-2xl">
        <div className="absolute top-0 right-0 left-0 h-[3px] bg-gradient-to-r from-amber-500 via-rose-800 to-amber-500"></div>
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          
          {/* Logo Brand column */}
          <div className="flex items-center gap-3">
            <CrucialLogo size="sm" className="shrink-0" />
            <div className="hidden sm:block">
              <p className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest leading-none">
                Automated Discipline Engine
              </p>
              <h2 className="text-zinc-300 font-serif text-sm font-semibold tracking-wider">
                Crucial Clutch Portal
              </h2>
            </div>
          </div>

          {/* Profile overview box */}
          <div className="flex items-center flex-wrap gap-4 md:gap-6 bg-zinc-900/60 px-4 py-2 rounded-xl border border-zinc-850">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-amber-500 animate-bounce" fill="currentColor animate-pulse" />
              <div>
                <p className="text-[10px] text-zinc-500 leading-none font-mono">STREAK</p>
                <p className="text-sm font-bold text-amber-400 font-mono">{streakDays} Days</p>
              </div>
            </div>

            <div className="h-8 w-px bg-zinc-800"></div>

            <div className="flex items-center gap-2.5">
              <div className="bg-gradient-to-r from-amber-600 to-rose-700 p-1 rounded-lg">
                <Award className="w-4 h-4 text-zinc-100" />
              </div>
              <div>
                <p className="text-[9px] text-zinc-400 tracking-wider uppercase font-mono">RANK STATUS</p>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-zinc-100 font-serif">
                    {streakTitleInfo.title}
                  </span>
                </div>
              </div>
            </div>

            <div className="h-8 w-px bg-zinc-800"></div>

            <div className="text-right">
              <p className="text-[8px] text-zinc-500 uppercase font-mono tracking-widest">{session.username}</p>
              <button 
                onClick={() => setShowRetreatConfirm(true)}
                className="text-[10px] text-red-500 hover:underline font-mono"
              >
                Retreat Cabin
              </button>
            </div>
          </div>

        </div>
      </header>

      {/* CHRONOS CONTROL PANEL - Simulated Battle Time Dial */}
      <div className="bg-zinc-950 border-b border-zinc-900 px-4 py-3 text-zinc-400 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-3">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 bg-[#17120a] border border-amber-950 text-amber-500 px-3 py-1.5 rounded-lg">
              <Clock className="w-4 h-4" />
              <span className="font-mono uppercase tracking-wider text-[10px] font-bold">Chronos Battle Dial:</span>
              <span className="font-mono font-black text-xs text-amber-300 bg-black/60 px-2 py-0.5 rounded border border-amber-900/30">
                {formattedBattleTime}
              </span>
            </div>

            {/* Simulated vs Real Mode */}
            <div className="flex items-center bg-zinc-900 p-1 rounded-lg border border-zinc-850">
              <button 
                onClick={() => setIsSimulatedTime(false)}
                className={`px-3 py-1 rounded text-[10px] font-mono transition-all ${!isSimulatedTime ? 'bg-amber-500 text-zinc-950 font-bold' : 'hover:text-zinc-200 text-zinc-500'}`}
              >
                LIVE UTC TIME
              </button>
              <button 
                onClick={() => setIsSimulatedTime(true)}
                className={`px-3 py-1 rounded text-[10px] font-mono transition-all ${isSimulatedTime ? 'bg-amber-500 text-zinc-950 font-bold' : 'hover:text-zinc-200 text-zinc-500'}`}
              >
                SIMULATED DIAL
              </button>
            </div>
          </div>

          {/* Dial controls for Simulated Time */}
          {isSimulatedTime && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] text-zinc-500 uppercase font-mono mr-1">Time Warp:</span>
              <button 
                onClick={() => setSimulatedTimeOffset(prev => prev - 24 * 60 * 60 * 1000)}
                className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 px-2.5 py-1 rounded font-mono text-[10px] text-zinc-300"
                title="Warp 1 day back"
              >
                -1 Day
              </button>
              <button 
                onClick={() => setSimulatedTimeOffset(prev => prev - 60 * 60 * 1000)}
                className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 px-2.5 py-1 rounded font-mono text-[10px] text-zinc-300"
                title="Warp 1 hour back"
              >
                -1 Hr
              </button>
              <button 
                onClick={() => setSimulatedTimeOffset(0)}
                className="bg-amber-950/40 hover:bg-amber-950/60 border border-amber-900/50 text-amber-400 px-3 py-1 rounded font-mono text-[10px]"
                title="Normalize with current real world time"
              >
                SYNC NOW
              </button>
              <button 
                onClick={() => setSimulatedTimeOffset(prev => prev + 60 * 60 * 1000)}
                className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 px-2.5 py-1 rounded font-mono text-[10px] text-zinc-300"
                title="Warp 1 hour forward"
              >
                +1 Hr
              </button>
              <button 
                onClick={() => setSimulatedTimeOffset(prev => prev + 24 * 60 * 60 * 1000)}
                className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 px-2.5 py-1 rounded font-mono text-[10px] text-zinc-300"
                title="Warp 1 day forward"
              >
                +1 Day
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Warn indicator line for continuous alerts */}
      {continuousWarnings.length > 0 && (
        <div className="bg-[#1b0808] border-b border-red-950 text-red-400 py-2 px-4 text-xs font-mono">
          <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto whitespace-nowrap animate-pulse">
            <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" />
            <span className="font-bold uppercase tracking-wider text-[10px] shrink-0">Continuous Alerts standby:</span>
            <div className="flex gap-4">
              {continuousWarnings.slice(0, 2).map((w, index) => (
                <span key={index} className="italic text-[11px] font-medium">— {w}</span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Primary Workspace Navigation Tabs */}
      <div className="bg-zinc-900/40 border-b border-zinc-850 text-xs">
        <div className="max-w-7xl mx-auto px-4 flex justify-start items-center">
          <button 
            onClick={() => setActiveTab("front")}
            className={`py-3.5 px-5 font-serif uppercase tracking-widest font-semibold border-b-2 transition-all flex items-center gap-2 ${activeTab === "front" ? 'border-amber-500 text-amber-500 bg-zinc-950/40' : 'border-transparent text-zinc-400 hover:text-zinc-200'}`}
          >
            <Sword className="w-3.5 h-3.5" />
            Current Battlefront
          </button>
          <button 
            onClick={() => setActiveTab("yodha")}
            className={`py-3.5 px-5 font-serif uppercase tracking-widest font-semibold border-b-2 transition-all flex items-center gap-2 ${activeTab === "yodha" ? 'border-amber-500 text-amber-500 bg-zinc-950/40' : 'border-transparent text-zinc-400 hover:text-zinc-200'}`}
          >
            <Trophy className="w-3.5 h-3.5" />
            Yodha Hall
          </button>
          <button 
            onClick={() => setActiveTab("defeated")}
            className={`py-3.5 px-5 font-serif uppercase tracking-widest font-semibold border-b-2 transition-all flex items-center gap-2 ${activeTab === "defeated" ? 'border-amber-500 text-amber-500 bg-zinc-950/40' : 'border-transparent text-zinc-400 hover:text-zinc-200'}`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            Defeated By Myself
          </button>
          <button 
            onClick={() => setActiveTab("commitments")}
            className={`py-3.5 px-5 font-serif uppercase tracking-widest font-semibold border-b-2 transition-all flex items-center gap-2 ${activeTab === "commitments" ? 'border-amber-500 text-amber-500 bg-zinc-950/40' : 'border-transparent text-zinc-400 hover:text-zinc-200'}`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Covenants List
          </button>
          <button 
            onClick={() => setActiveTab("pantheon")}
            className={`py-3.5 px-5 font-serif uppercase tracking-widest font-semibold border-b-2 transition-all flex items-center gap-2 ${activeTab === "pantheon" ? 'border-amber-500 text-amber-500 bg-zinc-950/40' : 'border-transparent text-zinc-400 hover:text-zinc-200'}`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Pantheon of Legends
          </button>
        </div>
      </div>

      {/* Main Grid Workspace Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 pb-24">
        
        {/* VIEW 1: Current Battlefront Planner */}
        {activeTab === "front" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* COLUMN LEFT: Add Task Form Panel */}
            <div className="lg:col-span-5 bg-zinc-950 border border-zinc-900 rounded-xl p-5 relative">
              <div className="absolute top-0 right-5 -translate-y-1/2 bg-amber-950 text-amber-400 px-3 py-0.5 rounded text-[9px] font-mono border border-amber-900/60 uppercase">
                Pledge Registry
              </div>
              <h3 className="text-sm font-serif tracking-widest text-amber-500 uppercase pb-3 border-b border-zinc-900 mb-4 flex items-center gap-2">
                <Plus className="w-4 h-4 text-amber-500" />
                Draft New Commitment
              </h3>

              <form onSubmit={handleAddNewTask} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-widest mb-1">
                    Intent Title
                  </label>
                  <input 
                    type="text"
                    value={newTaskTitle}
                    onChange={e => setNewTaskTitle(e.target.value)}
                    placeholder="e.g. Fill form of JEE Main, Practice Mock"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-xs text-zinc-300 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-widest mb-1">
                      Life Factor
                    </label>
                    <select 
                      value={selectedFactor}
                      onChange={e => setSelectedFactor(e.target.value as LifeFactor)}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2 text-xs text-zinc-300 capitalize text-ellipsis focus:outline-none"
                    >
                      {factorPriorities.map(p => (
                        <option key={p.factor} value={p.factor}>
                          {p.factor}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-widest mb-1">
                      Due Date
                    </label>
                    <input 
                      type="date"
                      value={newTaskDate}
                      onChange={e => setNewTaskDate(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2 text-xs text-zinc-350 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-widest mb-1">
                      Start Hour
                    </label>
                    <input 
                      type="time"
                      value={newTaskTime}
                      onChange={e => setNewTaskTime(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2 text-xs text-zinc-300 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-widest mb-1">
                      Time frame (Mins)
                    </label>
                    <input 
                      type="number"
                      value={newTaskDuration}
                      onChange={e => setNewTaskDuration(Number(e.target.value))}
                      min={5}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2 text-xs text-zinc-300 focus:outline-none"
                    />
                  </div>
                </div>

                {/* PRIORITY SLIDER: STRICTLY 0%, 20%, 40%, 60%, 80%, 100% */}
                <div className="bg-zinc-900/40 p-3 rounded-lg border border-zinc-850">
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-[10px] font-mono text-zinc-450 uppercase tracking-widest">
                      Priority Level
                    </label>
                    <span className="font-mono text-xs font-black text-amber-400">
                      {newTaskPriority}%
                    </span>
                  </div>
                  <input 
                    type="range"
                    min="0"
                    max="100"
                    step="20"
                    value={newTaskPriority}
                    onChange={e => handlePrioritySlide(Number(e.target.value))}
                    className="w-full accent-amber-500 bg-zinc-800"
                  />
                  <div className="flex justify-between text-[8px] font-mono text-zinc-550 px-1 mt-1">
                    <span>0%</span>
                    <span>20%</span>
                    <span>40%</span>
                    <span>60%</span>
                    <span>80%</span>
                    <span>100%</span>
                  </div>

                  {/* Dynamic description of priority rules to inform the user */}
                  <div className="mt-2.5 text-[9px] font-mono text-zinc-500 leading-normal border-t border-zinc-850 pt-2">
                    {newTaskPriority === 0 && "0%: Silent statement. Done/Not-done evaluation without pressure."}
                    {newTaskPriority === 20 && "20%: Selfie pledge option. Miss triggers Blunt Advice and Challenge mode."}
                    {newTaskPriority === 40 && "40%: 20% mechanics + alarms starting 3 days before (8am & 10pm daily)."}
                    {newTaskPriority === 60 && "60%: Alarms start 5 days prior. Locked with 5 maths problems on trigger day!"}
                    {newTaskPriority >= 80 && "80%-100%: 10-15 days pre-alerts. AT LEAST 50-word letter or Video Pledge required!"}
                  </div>
                </div>

                {/* Conditional letter field for 80% and 100% priority */}
                {newTaskPriority >= 80 && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="space-y-2 border-l-2 border-amber-500 pl-3 pt-2"
                  >
                    <label className="block text-[10px] font-mono text-amber-500 uppercase tracking-widest flex items-center justify-between">
                      <span>📜 Solemn Written Covenant Letter (At least 50 words)</span>
                      <span className="text-[8px] text-zinc-500">
                        {letterText.split(/\s+/).filter(Boolean).length} / 50 words
                      </span>
                    </label>
                    <textarea
                      value={letterText}
                      onChange={e => setLetterText(e.target.value)}
                      placeholder="Explain to your soul why this goal is a non-negotiable step to victory. If I fail, I am admitting I lack the discipline of..."
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2 text-xs text-zinc-300 focus:outline-none focus:border-amber-500 h-24 font-serif"
                    />

                    <div className="flex items-center gap-2 pt-1">
                      <input 
                        type="checkbox" 
                        id="video_sim" 
                        checked={videoSimulated}
                        onChange={e => setVideoSimulated(e.target.checked)}
                        className="rounded accent-amber-500" 
                      />
                      <label htmlFor="video_sim" className="text-[10px] font-mono text-zinc-450 hover:text-zinc-300 cursor-pointer">
                        Simulate pledge video recording file lock
                      </label>
                    </div>
                  </motion.div>
                )}

                {/* Selfie simulation lock for early priorities */}
                {newTaskPriority < 80 && (
                  <div className="flex items-center justify-between gap-3 bg-zinc-900/60 p-2.5 rounded-lg border border-zinc-850">
                    <div className="flex items-center gap-2">
                      <Camera className="w-4 h-4 text-zinc-500" />
                      <span className="text-[10px] font-mono text-zinc-400">Attach initial focal Selfie</span>
                    </div>
                    {selfieOption ? (
                      <div className="flex items-center gap-2 bg-zinc-950 px-2 py-1 rounded border border-zinc-800">
                        <img src={selfieOption} className="w-5 h-5 rounded-full object-cover" />
                        <span className="text-[8px] text-green-500 font-mono">ATTACHED</span>
                        <button onClick={() => setSelfieOption("")} className="text-zinc-500 hover:text-white text-[9px]">×</button>
                      </div>
                    ) : (
                      <button 
                        type="button" 
                        onClick={simulateSelfie}
                        className="text-[9px] font-mono bg-zinc-800 hover:bg-zinc-700 text-zinc-300 py-1 px-2.5 rounded"
                      >
                        Capture Selfie
                      </button>
                    )}
                  </div>
                )}

                {addTaskError && (
                  <p className="text-xs text-red-400 bg-red-950/20 px-3 py-2 rounded border border-red-950/50">
                    {addTaskError}
                  </p>
                )}

                <button 
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-600 text-zinc-950 font-serif font-extrabold uppercase py-3 rounded-lg text-xs tracking-widest cursor-pointer shadow-md transition-all flex items-center justify-center gap-1"
                >
                  <ShieldCheck className="w-4 h-4" />
                  Lock Duty Oath
                </button>
              </form>

              {/* View/Modify Priorities trigger */}
              <div className="mt-5 border-t border-zinc-900 pt-4 text-center">
                <button 
                  onClick={() => setHasCompletedSetup(false)}
                  className="text-[10px] text-amber-500/70 hover:text-amber-500 hover:underline font-mono"
                >
                  Modify Life Factor Ranking Hierarchy
                </button>
              </div>
            </div>

            {/* COLUMN RIGHT: Live Sorted Task List */}
            <div className="lg:col-span-7 space-y-4">
              
              <div className="bg-zinc-950 border border-zinc-900 p-4 rounded-xl flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-serif text-zinc-300 font-semibold tracking-wider flex items-center gap-2">
                    <Sword className="w-4 h-4 text-amber-500" />
                    Active Battlefront Covenants
                  </h3>
                  <p className="text-[10px] text-zinc-500 font-mono mt-0.5">
                    Tasks auto-ordered: 1st by Decreasing Priority Slider, 2nd by Life Factor Hierarchy Rank.
                  </p>
                </div>
                <div className="bg-zinc-900 px-3 py-1 rounded text-xs font-mono text-zinc-400">
                  Total: {activeTasksPending.length}
                </div>
              </div>

              {activeTasksPending.length === 0 ? (
                <div className="bg-zinc-950/50 border border-zinc-900/60 rounded-xl p-12 text-center">
                  <div className="max-w-xs mx-auto space-y-3">
                    <CheckCircle className="w-8 h-8 text-zinc-700 mx-auto" />
                    <p className="text-xs font-mono text-zinc-400">The battlefront is clear, commander. All scheduled commitments completed or routed of the hour.</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <AnimatePresence>
                    {activeTasksPending.map((task, index) => {
                      const isRetry = task.status === "retry_3h" || task.status === "retry_8h";
                      return (
                        <motion.div 
                          key={task.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className={`bg-zinc-950 border ${isRetry ? 'border-amber-500/50 gold-glow' : 'border-zinc-900'} p-4 rounded-xl relative transition-all hover:bg-zinc-950/90`}
                        >
                          {/* Inner gold rank label */}
                          <div className="absolute top-4 right-4 flex items-center gap-2">
                            <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full ${
                              task.priority === 100 ? 'bg-red-950 text-red-400 border border-red-800' :
                              task.priority === 80 ? 'bg-amber-950 text-amber-400 border border-amber-800' :
                              task.priority === 60 ? 'bg-zinc-900 text-yellow-500 border border-zinc-800' :
                              'bg-zinc-900 text-zinc-400'
                            }`}>
                              Priority {task.priority}%
                            </span>
                            <span className="text-[10px] font-mono font-bold text-zinc-600">
                              #{index + 1}
                            </span>
                          </div>

                          <div className="flex items-start gap-3">
                            <div className="p-2 bg-zinc-900 rounded-lg shrink-0 mt-0.5">
                              <Shield className="w-4 h-4 text-amber-600" />
                            </div>

                            <div className="space-y-1.5 max-w-[70%]">
                              <h4 className="text-sm font-semibold text-zinc-200 tracking-wide font-serif">
                                {task.title}
                              </h4>

                              <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono text-zinc-500">
                                <span className="bg-zinc-900 py-0.5 px-2 rounded font-bold uppercase text-[9px] text-zinc-400 border border-zinc-800 capitalize">
                                  {task.lifeFactor}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3 text-zinc-650" />
                                  {task.dueDate}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3 text-zinc-650" />
                                  {task.startTime} ({task.durationMinutes}m duration)
                                </span>
                              </div>

                              {/* Written Letter preview if present */}
                              {task.writtenLetter && (
                                <div className="bg-zinc-900/40 p-2 rounded text-[10px] font-serif text-zinc-400 italic max-h-16 overflow-y-auto border border-zinc-850">
                                  " {task.writtenLetter.slice(0, 160)}... "
                                </div>
                              )}

                              {isRetry && (
                                <div className="bg-amber-950/25 border border-amber-900/30 p-2 rounded text-[10px] font-mono text-amber-300">
                                  🔥 RETRY ACTIVE: Complete before deadline: <span className="underline font-bold">{task.retryDueTime}</span> or face immediate permanent dishonor!
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Quick Actions (only for convenient debug or retry completions) */}
                          <div className="mt-3.5 pt-3.5 border-t border-zinc-900 flex justify-between items-center text-[10px]">
                            <div className="text-zinc-650 font-mono text-[9px]">
                              OATH O_ID: {task.id}
                            </div>
                            <div className="flex items-center gap-2">
                              {isRetry ? (
                                <button
                                  onClick={() => completeRetryTask(task)}
                                  className="bg-amber-500 text-zinc-950 font-mono font-bold px-3 py-1 rounded hover:bg-amber-400 transition-colors"
                                >
                                  Complete Retry Now
                                </button>
                              ) : (
                                <button 
                                  onClick={() => setConfrontingTask(task)}
                                  className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 px-3 py-1 rounded font-mono"
                                >
                                  Test Popup Trial
                                </button>
                              )}
                              <button 
                                onClick={() => deleteTask(task.id)}
                                className="text-red-500/60 hover:text-red-400 hover:bg-red-950/20 p-1 rounded"
                                title="Revoke record"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              )}
            </div>

          </div>
        )}

        {/* VIEW 2: Yodha Section (Glorious Accomplishments) */}
        {activeTab === "yodha" && (
          <div className="space-y-6">
            <div className="bg-zinc-950 border border-zinc-900 p-6 rounded-2xl relative shadow-xl overflow-hidden shadow-black/80">
              {/* Background ambient badge */}
              <div className="absolute top-1/2 right-10 -translate-y-1/2 opacity-5 scale-150">
                <Trophy className="w-56 h-56 text-amber-500" />
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative">
                <div>
                  <span className="text-[9px] font-mono text-amber-500 uppercase tracking-widest block mb-1">
                    — The Champion Hall of Fame —
                  </span>
                  <h2 className="text-2xl font-serif tracking-wider text-zinc-200">
                    Yodha Record Matrix
                  </h2>
                  <p className="text-xs text-zinc-500 max-w-xl mt-1">
                    Your complete recorded victories. Decisive clutch hours executed cleanly, listed in decreasing order of task priority and sorted securely.
                  </p>
                </div>
                <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-850 flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-[9px] font-mono text-zinc-500 uppercase">Successful Covenants</p>
                    <p className="text-2xl font-black font-mono text-amber-400">
                      {tasks.filter(t => t.status === "done").length}
                    </p>
                  </div>
                  <div className="w-px h-10 bg-zinc-800"></div>
                  <div className="text-center">
                    <p className="text-[9px] font-mono text-zinc-500 uppercase font-mono">Disciplinary Ratio</p>
                    <p className="text-2xl font-black font-mono text-zinc-100">
                      {Math.round(
                        (tasks.filter(t => t.status === "done").length / (tasks.length || 1)) * 100
                      )}%
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Complete Tabular Victories */}
            <div className="bg-zinc-950 border border-zinc-900 rounded-xl overflow-hidden shadow-lg shadow-black">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-zinc-900 text-zinc-400 uppercase tracking-wider text-[10px] border-b border-zinc-850">
                    <tr>
                      <th className="py-3.5 px-4 font-normal">Sovereign Task</th>
                      <th className="py-3.5 px-4 font-normal">Life Factor</th>
                      <th className="py-3.5 px-4 font-normal text-right">Priority Slider</th>
                      <th className="py-3.5 px-4 font-normal text-center">Focal Proof/Selfie</th>
                      <th className="py-3.5 px-4 font-normal text-right">Completion Time (Simulated)</th>
                      <th className="py-3.5 px-4 font-normal text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-900 text-zinc-300">
                    {tasks.filter(t => t.status === "done").length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-zinc-650 italic text-[11px] font-medium font-sans">
                          No victorious records in the Yodha registry yet. Establish your promises and execute them!
                        </td>
                      </tr>
                    ) : (
                      tasks.filter(t => t.status === "done")
                        .sort((a,b) => b.priority - a.priority)
                        .map((task) => (
                          <tr key={task.id} className="hover:bg-zinc-900/30 transition-colors">
                            <td className="py-4 px-4 font-semibold font-serif text-sm text-zinc-100">
                              {task.title}
                            </td>
                            <td className="py-4 px-4">
                              <span className="capitalize bg-zinc-900 text-zinc-450 px-2.5 py-0.5 rounded border border-zinc-800 text-[10px]">
                                {task.lifeFactor}
                              </span>
                            </td>
                            <td className="py-4 px-4 text-right font-bold text-amber-400">
                              {task.priority}%
                            </td>
                            <td className="py-4 px-4 text-center">
                              {task.selfieUrl ? (
                                <div className="flex justify-center">
                                  <img 
                                    src={task.selfieUrl} 
                                    className="w-8 h-8 rounded object-cover border border-amber-500/40" 
                                    alt="Selfie"
                                  />
                                </div>
                              ) : task.writtenLetter ? (
                                <span className="text-[10px] text-amber-500/80 underline font-serif cursor-help" title={task.writtenLetter}>
                                  Letter Log Saved
                                </span>
                              ) : (
                                <span className="text-zinc-600">—</span>
                              )}
                            </td>
                            <td className="py-4 px-4 text-right text-zinc-400 text-[10px]">
                              {task.completedAt || "Recorded of hour"}
                            </td>
                            <td className="py-4 px-4 text-center">
                              <span className="bg-emerald-950/50 border border-emerald-800 text-emerald-400 text-[10px] py-0.5 px-2 rounded font-bold uppercase tracking-wider">
                                Yodha Completed
                              </span>
                            </td>
                          </tr>
                        ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: Defeated By Myself Section */}
        {activeTab === "defeated" && (
          <div className="space-y-6">
            <div className="bg-zinc-950 border border-zinc-900 p-6 rounded-2xl shadow-xl shadow-black/80">
              <span className="text-[9px] font-mono text-red-500 uppercase tracking-widest block mb-1">
                — Archive of Surrender and Forgotten Self-Help —
              </span>
              <h2 className="text-2xl font-serif tracking-wider text-red-500 mb-2">
                Defeated By Myself
              </h2>
              <p className="text-xs text-zinc-500 max-w-xl">
                Here lie the broken covenants of the hour. Your missed duties receive tragic battle representations and the blunt truth of non-compliance. Look upon your failures, review your sorry notes, and commit to steel!
              </p>
            </div>

            {tasks.filter(t => t.status === "failed").length === 0 ? (
              <div className="bg-zinc-950/20 border border-zinc-900 rounded-2xl p-12 text-center text-zinc-600 font-mono text-xs">
                🎖️ Your armor stands clean. No defeats recorded in this timeline yet.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {tasks.filter(t => t.status === "failed").map((task) => (
                  <div 
                    key={task.id}
                    className="bg-zinc-900/60 hover:bg-zinc-900 border border-red-950/40 p-5 rounded-2xl space-y-4 relative overflow-hidden transition-all"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="bg-red-950 border border-red-900 text-red-400 font-mono text-[9px] px-2 py-0.5 rounded">
                          Failed {task.priority}% Priority
                        </span>
                        <h3 className="text-base font-serif font-bold text-zinc-200 mt-2">
                          {task.title}
                        </h3>
                        <p className="text-[10px] font-mono text-zinc-500">
                          Due: {task.dueDate} at {task.startTime} | Failed at: {task.failedAtTime || "Recorded Hour"}
                        </p>
                      </div>
                      <span className="font-mono text-zinc-600 text-xs">
                        ID: {task.id.slice(-6)}
                      </span>
                    </div>

                    {/* Rendering the spectacular precise failure warrior SVGs requested */}
                    <WarriorArt priority={task.priority} />

                    {/* Excuse explanation given by user */}
                    {task.userExcuse && (
                      <div className="bg-zinc-950 p-3 rounded-lg border border-zinc-850">
                        <span className="text-[10px] font-mono text-zinc-500 uppercase block">Excuse recorded:</span>
                        <p className="text-xs italic text-zinc-400 mt-1">"{task.userExcuse}"</p>
                      </div>
                    )}

                    {/* Sorry Note display */}
                    {task.sorryNote && (
                      <div className="bg-red-950/15 border-l-2 border-red-600/80 p-3.5 rounded text-xs text-red-400 font-sans leading-relaxed">
                        <span className="font-serif block font-bold text-red-500 uppercase tracking-widest text-[9px] mb-1">
                          🪶 THE COMMITTANCE EXPLANATION:
                        </span>
                        {task.sorryNote}
                      </div>
                    )}

                    {/* Offer retry option with challenge to redeem self */}
                    <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-850 text-xs text-zinc-400 flex items-center justify-between">
                      <div>
                        <p className="font-bold text-zinc-300">Wish to redeem your self-respect?</p>
                        <p className="text-[10px] text-zinc-500">Attempt alternative warrior trial immediately.</p>
                      </div>
                      <button 
                        onClick={() => {
                          // Reschedule task back to pending for simulated trial
                          setTasks(prev => prev.map(t => {
                            if (t.id === task.id) {
                              return { ...t, status: "pending" };
                            }
                            return t;
                          }));
                          // Alert
                          setConfrontingTask(task);
                        }}
                        className="bg-amber-500 hover:bg-amber-600 text-zinc-950 font-mono font-bold py-1.5 px-3.5 rounded-lg text-[10px] transition-all uppercase"
                      >
                        REDEEM OATH
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* VIEW 4: My Commitment and I Mean It */}
        {activeTab === "commitments" && (
          <div className="space-y-6">
            <div className="bg-zinc-950 border border-zinc-900 p-6 rounded-2xl shadow-xl shadow-black">
              <span className="text-[9px] font-mono text-amber-500 uppercase tracking-widest block mb-1">
                — "My Commitment and I Mean It" —
              </span>
              <h2 className="text-2xl font-serif tracking-wider text-zinc-200">
                Persistent Soul Vows
              </h2>
              <p className="text-xs text-zinc-500 max-w-xl">
                The visual chronicle of your focus. When a 0% / 20% / 80% / 100% duty is marked as Done, its corresponding facial pledge proof or written covenant is locked forever in this ancient scrolls section.
              </p>
            </div>

            {/* Grid of gallery assets */}
            {tasks.filter(t => t.status === "done" && (t.selfieUrl || t.writtenLetter)).length === 0 ? (
              <div className="bg-zinc-950/20 border border-zinc-900 rounded-2xl p-12 text-center text-zinc-600 font-mono text-xs">
                🏺 Scroll empty. Only verified completed covenants with selfie/letter attachment footprints will manifest here.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tasks.filter(t => t.status === "done" && (t.selfieUrl || t.writtenLetter)).map((task) => (
                  <div 
                    key={task.id}
                    className="bg-zinc-950 border border-zinc-900 rounded-2xl overflow-hidden shadow-lg shadow-black/60 flex flex-col justify-between"
                  >
                    {task.selfieUrl && (
                      <div className="aspect-square w-full relative group">
                        <img 
                          src={task.selfieUrl} 
                          className="w-full h-full object-cover filter brightness-75 hover:brightness-100 transition-all"
                          alt="Commitment Selfie Proof"
                        />
                        <div className="absolute top-3 left-3 bg-zinc-950/80 px-2.5 py-0.5 rounded text-[8px] font-mono border border-amber-500/30 text-amber-500">
                          OATH DONE SELFIE
                        </div>
                      </div>
                    )}

                    <div className="p-4 space-y-3">
                      <div>
                        <span className="text-[9px] font-mono font-bold text-zinc-500 capitalize">
                          Sphere of {task.lifeFactor}
                        </span>
                        <h4 className="font-serif text-sm font-bold text-amber-500 tracking-wide">
                          {task.title}
                        </h4>
                        <p className="text-[9px] text-zinc-500 font-mono">
                          Completed: {task.completedAt || "Standard recorded timeline"}
                        </p>
                      </div>

                      {task.writtenLetter && (
                        <div className="bg-zinc-900 p-3 rounded-xl border border-zinc-850 text-[11px] font-serif leading-relaxed text-zinc-400 italic">
                          " {task.writtenLetter} "
                        </div>
                      )}

                      <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500 pt-2 border-t border-zinc-900">
                        <span>PRIORITY: <span className="text-zinc-200 font-bold">{task.priority}%</span></span>
                        <span className="text-green-500 flex items-center gap-1 font-bold">
                          <Check className="w-3.5 h-3.5" /> SECURE COVENANT
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* VIEW 5: Pantheon of 15 Legendary Warriors */}
        {activeTab === "pantheon" && (
          <WarriorGallery 
            selectedMascotId={mascotId}
            onSelectMascot={(warrior) => {
              setMascotId(warrior.id);
            }}
            themeColor={activeTheme.vars["--color-amber-500"]}
          />
        )}

      </main>

      {/* FOOTER STATS DOCKED */}
      <footer className="fixed bottom-0 left-0 right-0 py-2.5 bg-zinc-950 border-t border-zinc-850 text-[10px] text-zinc-500 text-center font-mono select-none z-20 flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4">
        <span>Crucial Clutch © 2026. Made with true Mahabharat and Roman military values. Currently rendering simulated timeline.</span>
        <span className="hidden md:inline">|</span>
        <span>Created by <span className="text-amber-500 font-bold">Aryan Pandya</span></span>
        <span className="hidden md:inline">|</span>
        <span>Contact: <a href="mailto:pandyaaryan47@gmail.com" className="text-amber-400 hover:text-amber-300 underline underline-offset-2">pandyaaryan47@gmail.com</a></span>
      </footer>

      {/* --- DYNAMIC CONFRONTATION ALERTS MODAL/POP-UP --- */}
      {confrontingTask && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex justify-center items-center p-4 overflow-y-auto">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-lg bg-zinc-950 border-2 border-amber-600/80 rounded-2xl shadow-2xl shadow-amber-500/10 p-5 mt-4 md:mt-12 relative overflow-hidden select-none crimson-glow mb-12"
          >
            
            {/* Top red header */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-amber-500 to-red-600"></div>

            {/* Task summary */}
            <div className="flex items-center gap-3 border-b border-zinc-900 pb-3.5 mb-4">
              <Sword className="w-5 h-5 text-red-500 animate-spin" />
              <div>
                <span className="text-[9px] font-mono text-red-400 uppercase tracking-widest block font-black leading-none">
                  🛡️ Battlefield Due Encounter Triggered!
                </span>
                <h3 className="text-base font-serif font-extrabold text-zinc-100 mt-1 capitalize">
                  {confrontingTask.title}
                </h3>
              </div>
            </div>

            {/* Visual warning alerts depending on priority of this triggered task */}
            <div className="bg-[#1c0c0c] border border-red-950 p-3 rounded-lg text-xs space-y-2 mb-4 text-red-400">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-red-500" />
                <div>
                  <p className="font-bold uppercase tracking-wider text-[10px]">Pledge Level Duty Encounter ({confrontingTask.priority}%):</p>
                  <p className="text-[11px] text-zinc-300 leading-normal mt-0.5">
                    {confrontingTask.priority === 0 && "0%: This is a basic oath. Honesty check required. Choose done or provide an excuse."}
                    {confrontingTask.priority === 20 && "20%: Rise warrior. Provide Done with photo or risk direct severe verification excuse."}
                    {confrontingTask.priority === 40 && "40%: Medium alerts completed. Done selfie or direct Blunt Advice verification."}
                    {confrontingTask.priority === 60 && "60%: Mental Gate Triggered! Complete all 5 math calculations below to authorize task submission."}
                    {confrontingTask.priority >= 80 && "80%-100%: High sovereign trial! Written covenant letters verified. Complete or face the shame scrolls."}
                  </p>
                </div>
              </div>
            </div>

            {/* Automated Motivation quote display */}
            <div className="bg-zinc-900/40 p-4 rounded-xl border border-zinc-850 text-xs text-zinc-300 italic text-center mb-4 relative">
              <span className="font-serif block font-bold text-amber-550 uppercase text-[9px] tracking-widest mb-1.5 font-sans italic">
                {activePopupQuote.author || "Marcus Aurelius"} Commandment:
              </span>
              <p className="font-serif">"{activePopupQuote.text || 'Do every deed of your life as though it were the very last.'}"</p>
            </div>

            {/* User Letter content / preview for 80% / 100% priorities */}
            {confrontingTask.writtenLetter && (
              <div className="bg-zinc-950 p-4 rounded-xl border border-amber-900/30 text-xs mb-4">
                <span className="text-[10px] font-mono text-amber-500 uppercase block mb-1">✍️ Your Written Commitment Promise Letter:</span>
                <p className="font-serif text-zinc-350 italic max-h-24 overflow-y-auto leading-relaxed">
                  "{confrontingTask.writtenLetter}"
                </p>
              </div>
            )}

            {/* 60% Priority Maths Shield Gate Panel */}
            {mathGateTriggered && (
              <div className="bg-zinc-900/90 border border-amber-950 p-4 rounded-xl space-y-3 mb-4">
                <div className="flex items-center gap-2 border-b border-zinc-800 pb-2">
                  <Brain className="w-4 h-4 text-amber-400" />
                  <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest font-black">
                    MATH PUZZLE SHIELD: Solve All 5 Correctly to Submit
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {currentMathProblems.map((prob, index) => (
                    <div key={index} className="flex justify-between items-center gap-2 bg-zinc-950 p-2.5 rounded border border-zinc-850">
                      <span className="font-mono text-xs text-zinc-400">{prob.q} = </span>
                      <div className="flex items-center gap-1.5 w-20">
                        <input 
                          type="text" 
                          value={mathAnswers[index]}
                          onChange={e => handleMathAnswer(index, e.target.value)}
                          placeholder="?"
                          className="w-full bg-zinc-900 border border-zinc-800 rounded px-2 py-0.5 text-center text-xs text-zinc-200 font-mono focus:outline-none focus:border-amber-500"
                        />
                        {mathAnswersCorrect[index] ? (
                          <span className="text-green-500 font-bold">✔</span>
                        ) : (
                          <span className="text-red-500 font-bold">✗</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* OPTIONAL BACKUP SELFIE ENTRY */}
            {isBackupDoneSelfieRequired ? (
              <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl space-y-3 mb-4">
                <h4 className="text-xs font-mono text-amber-500 uppercase tracking-widest">
                  📸 Attachment of Duty Completion Selfie/Proof Required
                </h4>
                <p className="text-[10px] text-zinc-450">
                  Please trigger your completion selfie snapshot to permanently seal your pride in the database!
                </p>
                <div className="flex items-center justify-between gap-2.5 bg-zinc-950 p-3 rounded">
                  {instantSelfieAttached ? (
                    <div className="flex items-center gap-3">
                      <img src={instantSelfieAttached} className="w-10 h-10 rounded object-cover border border-amber-500" />
                      <span className="text-xs text-green-500 font-mono">Proof Loaded Successfully</span>
                    </div>
                  ) : (
                    <span className="text-xs text-zinc-600">No snapshot recorded</span>
                  )}
                  <button 
                    onClick={() => {
                      const snapshots = [
                        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=60",
                        "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=60",
                        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=60"
                      ];
                      setInstantSelfieAttached(snapshots[Math.floor(Math.random() * snapshots.length)]);
                    }}
                    className="bg-amber-500 text-zinc-950 font-mono py-1 px-3 text-xs font-bold rounded"
                  >
                    Simulate Camera Click
                  </button>
                </div>
                <div className="flex justify-end gap-2 text-xs pt-2">
                  <button 
                    onClick={() => setIsBackupDoneSelfieRequired(false)}
                    className="text-zinc-500 shrink-0"
                  >
                    Back
                  </button>
                  <button 
                    onClick={() => {
                      if (!instantSelfieAttached) {
                        setCustomAlert("Warrior, you must snapshot your real completion!");
                        return;
                      }
                      markConfrontingTaskDone();
                    }}
                    className="bg-emerald-600 text-white font-mono px-4 py-1 rounded"
                  >
                    Confirm Victory
                  </button>
                </div>
              </div>
            ) : verificationResult ? (
              /* EXCUSE VERIFICATION RESPONSE SCREEN */
              <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl space-y-3 mb-4 text-xs font-mono">
                <div className={`p-3 rounded border ${verificationResult.isValid ? 'bg-green-950/20 border-green-800 text-green-300' : 'bg-red-950/20 border-red-800 text-red-300'}`}>
                  <span className="uppercase block font-bold text-[10px] mb-1">
                    {verificationResult.isValid ? "🛡️ EXCUSE VERIFIED BY COGNITIVE SHIELD:" : "✗ EXCUSE REJECTED BY COMMANDER:"}
                  </span>
                  <p className="italic text-[11.5px] leading-relaxed">"{verificationResult.feedback}"</p>
                </div>

                <div className="bg-zinc-950 p-3 rounded border border-zinc-850">
                  <span className="text-[10px] text-zinc-500 uppercase block mb-1">🗡️ ACTION REDIRECT / CHALLENGE MANDATE:</span>
                  <p className="text-zinc-300 font-bold">{verificationResult.challenge}</p>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  {verificationResult.isValid ? (
                    <button 
                      onClick={() => acceptChallenge(24)}
                      className="bg-green-600 text-white py-1.5 px-4 rounded font-mono font-bold"
                    >
                      Accept Strategic Reschedule (24h)
                    </button>
                  ) : (
                    <>
                      <button 
                        onClick={() => acceptChallenge(confrontingTask.priority >= 80 ? 3 : 8)}
                        className="bg-amber-500 text-zinc-950 py-1.5 px-4 rounded font-mono font-bold transition-all hover:bg-amber-400"
                      >
                        Challenge My Self-Command!
                      </button>
                      <button 
                        onClick={resolveTaskFailurePermanently}
                        className="text-red-500 hover:bg-red-950 hover:border-red-900 py-1.5 px-3 rounded border border-transparent font-bold"
                      >
                        Accept Shame Scrolls Permanent Failure
                      </button>
                    </>
                  )}
                </div>
              </div>
            ) : (
              /* PRIMARY RESPONSE GATE OPTIONS */
              <div className="space-y-4">
                {/* Two Main Branch Buttons: DONE / NOT DONE */}
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => {
                      if (confrontingTask.priority === 0) {
                        markConfrontingTaskDone();
                      } else {
                        setIsBackupDoneSelfieRequired(true);
                      }
                    }}
                    disabled={!allMathSolved}
                    className="bg-emerald-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-emerald-700 text-white font-serif tracking-widest font-black uppercase py-4 rounded-xl cursor-pointer text-xs"
                  >
                    ✦ I HAVE DONE COVENANT ✦
                  </button>
                  <button 
                    onClick={() => {
                      if (confrontingTask.priority === 0) {
                        setCustomAlert("Being true to yourself does not mean being honest to everyone; not everyone deserves your honesty.");
                        resolveTaskFailurePermanently();
                      } else {
                        // show why excuse prompt 
                        // Set focus or initialize state
                      }
                    }}
                    className="bg-red-950 hover:bg-red-900 border border-red-800 text-red-200 font-serif tracking-widest font-black uppercase py-4 rounded-xl cursor-pointer text-xs"
                  >
                    ✗ I FAILED MY PROMISE
                  </button>
                </div>

                {/* Excuse Form - displayed directly under if user clicks/feels failed */}
                {confrontingTask.priority > 0 && (
                  <div className="bg-zinc-900/90 border border-zinc-850 p-4 rounded-xl space-y-3">
                    <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                      ⚖️ Why did you fail? Tell the General the absolute truth:
                    </label>
                    <textarea 
                      value={notDoneExcuseText}
                      onChange={e => setNotDoneExcuseText(e.target.value)}
                      placeholder="Explain here (e.g. My laptop power burnt, or I got distracted playing gaming consoles...)"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-xs text-zinc-350 focus:outline-none h-16 h-20"
                    />
                    <div className="flex justify-end pt-1">
                      <button 
                        onClick={verifyExcuseSubmit}
                        disabled={isVerifyingExcuse || notDoneExcuseText.trim() === ""}
                        className="bg-amber-500 text-zinc-950 text-xs font-mono font-bold py-1.5 px-4 rounded-lg flex items-center gap-1.5 cursor-pointer disabled:bg-zinc-800 disabled:text-zinc-500"
                      >
                        <RefreshCw className={`w-3 h-3 ${isVerifyingExcuse ? 'animate-spin' : ''}`} />
                        Verify excuse with Commander Tribunal
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Cancel trigger back button */}
            <button 
              onClick={() => setConfrontingTask(null)}
              className="absolute top-4 right-4 text-zinc-500 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

          </motion.div>
        </div>
      )}

      {/* RETREAT CABIN CONFIRMATION DIALOG */}
      {showRetreatConfirm && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-md bg-zinc-950 border-2 border-red-500/40 rounded-2xl p-7 relative shadow-2xl shadow-red-500/10"
          >
            {/* Top icon indicator */}
            <div className="flex justify-center mb-4">
              <div className="bg-red-500/10 p-3 rounded-full border border-red-500/30">
                <ShieldAlert className="w-10 h-10 text-red-500 animate-pulse" />
              </div>
            </div>

            <h3 className="text-center font-serif text-zinc-100 font-extrabold uppercase tracking-widest text-lg mb-2">
              REJOIN RETREAT CABIN?
            </h3>
            
            <p className="text-center text-xs text-zinc-400 leading-relaxed font-sans mb-6">
              Are you sure you want to retreat to the quiet cabin? 
              Leaving the active <span className="text-amber-500 font-bold">Battle Room</span> will reset the current simulated battle timers. Your daily streak remains perfectly preserved.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setShowRetreatConfirm(false)}
                className="flex-1 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-serif uppercase tracking-widest font-bold py-2.5 rounded-lg border border-zinc-800 text-xs"
              >
                ⚔️ Return to Battle
              </button>
              <button
                onClick={() => {
                  setShowRetreatConfirm(false);
                  setSession({ email: "", isLoggedIn: false, username: "Warrior", streakDays: 0 });
                }}
                className="flex-1 bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 text-white font-serif uppercase tracking-widest font-black py-2.5 rounded-lg text-xs shadow-lg shadow-red-500/10"
              >
                🚪 Retreat to Cabin
              </button>
            </div>

            <button 
              onClick={() => setShowRetreatConfirm(false)}
              className="absolute top-4 right-4 text-zinc-500 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      )}

      {/* CUSTOM CHAMBER ALERT DIALOG (REPLACES WINDOW.ALERT) */}
      {customAlert && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fadeIn">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md bg-zinc-950 border-2 border-[var(--color-amber-500)]/40 rounded-2xl p-7 relative shadow-2xl shadow-black/100"
          >
            {/* Top icon indicator */}
            <div className="flex justify-center mb-4">
              <div className="bg-amber-500/10 p-3 rounded-full border border-amber-500/30">
                <ShieldCheck className="w-10 h-10 text-amber-500 animate-bounce" />
              </div>
            </div>

            <h3 className="text-center font-serif text-amber-400 font-extrabold uppercase tracking-widest text-base mb-3">
              Chamber Decree
            </h3>
            
            <p className="text-center text-xs text-zinc-300 leading-relaxed font-sans mb-6">
              {customAlert}
            </p>

            <div className="flex justify-center">
              <button
                onClick={() => setCustomAlert(null)}
                className="w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-black font-serif uppercase tracking-widest font-black py-2.5 rounded-lg text-xs transition-all shadow-md hover:shadow-lg hover:shadow-amber-500/10"
              >
                ⚔️ Understood, Commander
              </button>
            </div>

            <button 
              onClick={() => setCustomAlert(null)}
              className="absolute top-4 right-4 text-zinc-500 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      )}

    </div>
  );
}
