import { doc, getDoc, setDoc, serverTimestamp, Timestamp } from 'firebase/firestore';
import { db } from './firebase';
import { UserStatsDocument, UserStatsSummary, ACHIEVEMENT_DEFINITIONS, DifficultyBreakdown } from '@/types/userStats';

/**
 * Fetch user stats from Firestore
 * Used by public profile page (no auth required)
 */
export async function getUserStats(userId: string): Promise<UserStatsSummary | null> {
  try {
    // 1. Try public subcollection first (Standard Mobile Sync & Publicly Readable)
    // match /users/{userId}/profile/{document=**} { allow read: if true; }
    const publicRef = doc(db, 'users', userId, 'profile', 'stats');
    const publicSnap = await getDoc(publicRef);

    if (publicSnap.exists()) {
      const data = publicSnap.data() as UserStatsDocument;
      return convertToSummary(data);
    }

    // 2. Fallback to main user document (Authenticated/Private)
    // match /users/{userId} { allow read: if isOwner(userId); }
    // Only works if the caller has permissions (e.g. user viewing their own account)
    try {
      const userSnap = await getDoc(doc(db, 'users', userId));
      if (userSnap.exists()) {
        const data = userSnap.data();
        if (data.stats) {
          return convertToSummary(data.stats as UserStatsDocument);
        }
      }
    } catch (permError) {
      // Ignore permission errors - it just means we can't access the private root doc
      console.log('Skipping private root doc check due to permissions');
    }

    return null;
  } catch (error) {
    console.error('Error fetching user stats:', error);
    return null;
  }
}

/**
 * Initialize user stats document when user first signs up
 */
export async function initializeUserStats(userId: string, email: string, displayName?: string, photoURL?: string): Promise<boolean> {
  try {
    const now = Timestamp.now();
    const statsDoc: UserStatsDocument = {
      userId,
      displayName: displayName || email?.split('@')[0] || 'Learner',
      email,
      photoURL,

      learning: {
        coursesCompleted: 0,
        xp: 0,
        linesTyped: 0
      },

      problemSolving: {
        bugSquasherCompleted: 0,
        codeRefactorCompleted: 0,
        errorsFixed: 0
      },

      building: {
        projectsCreated: 0,
        capstonesCompleted: 0,
        scramblesSolved: 0
      },

      consistency: {
        currentStreak: 0,
        longestStreak: 0,
        practiceSessionsCompleted: 0,
        firstTryRate: 0
      },

      achievements: [],

      createdAt: now,
      lastActivityAt: now,
      statsUpdatedAt: now
    };

    await setDoc(doc(db, 'users', userId), { stats: statsDoc }, { merge: true });
    // Also maintain subcollection for now if needed by other services
    await setDoc(doc(db, 'users', userId, 'profile', 'stats'), statsDoc);
    return true;
  } catch (error) {
    console.error('Error initializing user stats:', error);
    return false;
  }
}

/**
 * Convert UserStatsDocument to UserStatsSummary for display
 */
function convertToSummary(stats: UserStatsDocument): UserStatsSummary {
  const getCount = (val: number | DifficultyBreakdown): number => {
    if (typeof val === 'number') return val;
    return (val.easy || 0) + (val.medium || 0) + (val.hard || 0);
  };

  return {
    displayName: stats.displayName,
    photoURL: stats.photoURL,
    coursesCompleted: stats.learning.coursesCompleted,
    xp: stats.learning.xp,
    linesTyped: stats.learning.linesTyped,
    currentStreak: stats.consistency.currentStreak,
    achievements: stats.achievements,

    bugSquasherCompleted: getCount(stats.problemSolving.bugSquasherCompleted),
    codeRefactorCompleted: getCount(stats.problemSolving.codeRefactorCompleted),
    errorsFixed: stats.problemSolving.errorsFixed,

    projectsCreated: stats.building.projectsCreated,
    capstonesCompleted: stats.building.capstonesCompleted,
    scramblesSolved: stats.building.scramblesSolved,

    longestStreak: stats.consistency.longestStreak,
    practiceSessionsCompleted: stats.consistency.practiceSessionsCompleted,
    firstTryRate: stats.consistency.firstTryRate
  };
}

/**
 * Calculate which achievements should be unlocked based on stats
 */
export function calculateEarnedAchievements(summary: UserStatsSummary): string[] {
  const earned: string[] = [];

  // Bug Squasher achievements
  if (summary.bugSquasherCompleted >= ACHIEVEMENT_DEFINITIONS.BUG_HUNTER.requirement) earned.push('Bug Hunter');
  if (summary.bugSquasherCompleted >= ACHIEVEMENT_DEFINITIONS.BUG_SLAYER.requirement) earned.push('Bug Slayer');
  if (summary.bugSquasherCompleted >= ACHIEVEMENT_DEFINITIONS.BUG_EXTERMINATOR.requirement) earned.push('Bug Exterminator');
  if (summary.bugSquasherCompleted >= ACHIEVEMENT_DEFINITIONS.BUG_LEGEND.requirement) earned.push('Bug Legend');

  // Code Refactor achievements
  if (summary.codeRefactorCompleted >= ACHIEVEMENT_DEFINITIONS.REFACTOR_ROOKIE.requirement) earned.push('Refactor Rookie');
  if (summary.codeRefactorCompleted >= ACHIEVEMENT_DEFINITIONS.CLEAN_CODER.requirement) earned.push('Clean Coder');
  if (summary.codeRefactorCompleted >= ACHIEVEMENT_DEFINITIONS.REFACTOR_MASTER.requirement) earned.push('Refactor Master');

  // Puzzle achievements
  if (summary.scramblesSolved >= ACHIEVEMENT_DEFINITIONS.PUZZLE_STARTER.requirement) earned.push('Puzzle Starter');
  if (summary.scramblesSolved >= ACHIEVEMENT_DEFINITIONS.PUZZLE_PRO.requirement) earned.push('Puzzle Pro');
  if (summary.scramblesSolved >= ACHIEVEMENT_DEFINITIONS.PUZZLE_MASTER.requirement) earned.push('Puzzle Master');

  // Streak achievements
  if (summary.currentStreak >= ACHIEVEMENT_DEFINITIONS.WEEK_WARRIOR.requirement) earned.push('Week Warrior');
  if (summary.currentStreak >= ACHIEVEMENT_DEFINITIONS.MONTH_MASTER.requirement) earned.push('Month Master');

  // Error fixing achievements
  if (summary.errorsFixed >= ACHIEVEMENT_DEFINITIONS.ERROR_FIXER.requirement) earned.push('Error Fixer');
  if (summary.errorsFixed >= ACHIEVEMENT_DEFINITIONS.ERROR_ANNIHILATOR.requirement) earned.push('Error Annihilator');

  return earned;
}
