import { Timestamp } from 'firebase/firestore';

/**
 * Comprehensive user profile stats tracked by CoderKit
 * These metrics represent verified coding activity, not just courses watched
 */

// Learning Stats
export interface LearningStats {
  coursesCompleted: number; // Complete learning paths finished
  xp: number; // Total experience points earned
  linesTyped: number; // Total lines of code typed (not pasted)
}

// Problem Solving Stats
export interface ProblemSolvingStats {
  bugSquasherCompleted: number; // Debugging challenges completed
  codeRefactorCompleted: number; // Code improvement challenges completed
  errorsFixed: number; // Total syntax and runtime errors resolved
}

// Building Stats
export interface BuildingStats {
  projectsCreated: number; // Independent coding projects
  capstonesCompleted: number; // Guided capstone projects
  scramblesSolved: number; // Code Scramble puzzles solved
}

// Consistency Stats
export interface ConsistencyStats {
  currentStreak: number; // Consecutive days of coding
  longestStreak: number; // Highest streak achieved
  practiceSessionsCompleted: number; // Guided practice exercises completed
  firstTryRate: number; // Percentage of challenges passed on first attempt (0-100)
}

// Achievements/Badges
export interface Achievement {
  id: string; // Bug Hunter, Clean Coder, etc.
  name: string;
  unlockedAt: Timestamp;
  icon: string; // emoji or icon identifier
}

// Main User Stats Document
export interface UserStatsDocument {
  // User metadata
  userId: string;
  displayName: string;
  email: string;
  photoURL?: string;
  
  // All stats
  learning: LearningStats;
  problemSolving: ProblemSolvingStats;
  building: BuildingStats;
  consistency: ConsistencyStats;
  
  // Achievements
  achievements: Achievement[];
  
  // Timestamps
  createdAt: Timestamp;
  lastActivityAt: Timestamp;
  statsUpdatedAt: Timestamp;
}

// Summary for quick display
export interface UserStatsSummary {
  displayName: string;
  photoURL?: string;
  coursesCompleted: number;
  xp: number;
  linesTyped: number;
  currentStreak: number;
  achievements: Achievement[];
  // All problem solving stats
  bugSquasherCompleted: number;
  codeRefactorCompleted: number;
  errorsFixed: number;
  // Building stats
  projectsCreated: number;
  capstonesCompleted: number;
  scramblesSolved: number;
  // Consistency
  longestStreak: number;
  practiceSessionsCompleted: number;
  firstTryRate: number;
}

// Achievement definitions
export const ACHIEVEMENT_DEFINITIONS = {
  BUG_HUNTER: {
    id: 'bug_hunter',
    name: 'Bug Hunter',
    requirement: 10,
    icon: '🐛',
    stat: 'bugSquasherCompleted'
  },
  BUG_SLAYER: {
    id: 'bug_slayer',
    name: 'Bug Slayer',
    requirement: 50,
    icon: '🗡️',
    stat: 'bugSquasherCompleted'
  },
  BUG_EXTERMINATOR: {
    id: 'bug_exterminator',
    name: 'Bug Exterminator',
    requirement: 100,
    icon: '💥',
    stat: 'bugSquasherCompleted'
  },
  BUG_LEGEND: {
    id: 'bug_legend',
    name: 'Bug Legend',
    requirement: 200,
    icon: '👑',
    stat: 'bugSquasherCompleted'
  },
  REFACTOR_ROOKIE: {
    id: 'refactor_rookie',
    name: 'Refactor Rookie',
    requirement: 10,
    icon: '📝',
    stat: 'codeRefactorCompleted'
  },
  CLEAN_CODER: {
    id: 'clean_coder',
    name: 'Clean Coder',
    requirement: 50,
    icon: '✨',
    stat: 'codeRefactorCompleted'
  },
  REFACTOR_MASTER: {
    id: 'refactor_master',
    name: 'Refactor Master',
    requirement: 100,
    icon: '🎯',
    stat: 'codeRefactorCompleted'
  },
  PUZZLE_STARTER: {
    id: 'puzzle_starter',
    name: 'Puzzle Starter',
    requirement: 10,
    icon: '🧩',
    stat: 'scramblesSolved'
  },
  PUZZLE_PRO: {
    id: 'puzzle_pro',
    name: 'Puzzle Pro',
    requirement: 50,
    icon: '🧠',
    stat: 'scramblesSolved'
  },
  PUZZLE_MASTER: {
    id: 'puzzle_master',
    name: 'Puzzle Master',
    requirement: 100,
    icon: '🏆',
    stat: 'scramblesSolved'
  },
  WEEK_WARRIOR: {
    id: 'week_warrior',
    name: 'Week Warrior',
    requirement: 7,
    icon: '⚔️',
    stat: 'currentStreak'
  },
  MONTH_MASTER: {
    id: 'month_master',
    name: 'Month Master',
    requirement: 30,
    icon: '👑',
    stat: 'currentStreak'
  },
  ERROR_FIXER: {
    id: 'error_fixer',
    name: 'Error Fixer',
    requirement: 50,
    icon: '🔧',
    stat: 'errorsFixed'
  },
  ERROR_ANNIHILATOR: {
    id: 'error_annihilator',
    name: 'Error Annihilator',
    requirement: 200,
    icon: '⚡',
    stat: 'errorsFixed'
  }
};
