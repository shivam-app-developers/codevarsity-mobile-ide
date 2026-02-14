import fs from 'fs';
import path from 'path';

export interface Course {
    id: string;
    title: string;
    track: string;
    icon: string;
    isFree: boolean;
    requiresDesktop: boolean;
    prerequisites: string[];
    topics: string[];
    whyTakeThis: string;
    theGoal: string;
    anchor: string;
    day1Product: string;
    capstone: string;
    level: string;
    language: string;
    analogyAnchor: string;
}

export interface TrackInfo {
    id: string; // The slug, e.g., 'python'
    title: string; // The full track name from JSON
    description?: string; // Optional description
    courses: Course[];
}

const TRACK_SLUG_MAP: Record<string, string> = {
    "Track 1: The Python Developer": "python",
    "Track 2: Java Enterprise Developer": "java",
    "Track 3: The Systems Engineer (Go)": "go",
    "Track 4: Full Stack Web Developer": "web",
    "Track 5: Modern Android & Kotlin (Desktop Only)": "kotlin",
    "Track 6: Groovy Automation": "groovy",
    "Track 7: Functional Thinking (Clojure)": "clojure",
    "Track 8: Data Engineering (SQL)": "sql",
    "Track 9: C Language (Low-Level Programming)": "c",
    "Track 10: Systems Programming (Rust) (Desktop Only)": "rust",
    "Track 10: Desktop-Only Specializations": "specializations",
    "Track 11: C++ High-Performance (Desktop Only)": "cpp",
};

export function getAllCourses(): Course[] {
    const filePath = path.join(process.cwd(), 'codelab_docs', 'courses_metadata.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
}

export function getAllTracks(): TrackInfo[] {
    const courses = getAllCourses();
    const tracksMap = new Map<string, Course[]>();

    courses.forEach(course => {
        if (!tracksMap.has(course.track)) {
            tracksMap.set(course.track, []);
        }
        tracksMap.get(course.track)?.push(course);
    });

    const tracks: TrackInfo[] = [];

    tracksMap.forEach((courses, trackName) => {
        const slug = TRACK_SLUG_MAP[trackName] || trackName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        tracks.push({
            id: slug,
            title: trackName,
            courses: courses,
        });
    });

    return tracks;
}

export function getTrackById(slug: string): TrackInfo | undefined {
    const tracks = getAllTracks();
    return tracks.find(t => t.id === slug);
}
