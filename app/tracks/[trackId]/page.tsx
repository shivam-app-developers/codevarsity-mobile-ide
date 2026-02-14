import { getAllTracks, getTrackById } from '@/lib/courses';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Metadata } from 'next';
import { getLanguageIcon } from '@/lib/icons';

export async function generateStaticParams() {
    const tracks = getAllTracks();
    return tracks.map((track) => ({
        trackId: track.id,
    }));
}

export async function generateMetadata({ params }: { params: { trackId: string } }): Promise<Metadata> {
    const track = getTrackById(params.trackId);
    if (!track) {
        return {
            title: 'Track Not Found',
        };
    }
    return {
        title: `${track.title} | CodeVarsity`,
        description: `Master ${track.title} with CodeVarsity. structured courses, offline IDE, and interactive visualizers.`,
    };
}

export default function TrackPage({ params }: { params: { trackId: string } }) {
    const track = getTrackById(params.trackId);

    if (!track) {
        notFound();
    }

    // Schema Markup for Course List
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: track.courses.map((course, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
                '@type': 'Course',
                name: course.title,
                description: course.whyTakeThis,
                provider: {
                    '@type': 'Organization',
                    name: 'CodeVarsity',
                },
            },
        })),
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Navbar />

            <main>
                {/* Track Hero */}
                <section className="bg-brand-primary text-white pt-32 pb-20 px-4 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-[100px] -mr-32 -mt-32 pointer-events-none"></div>
                    <div className="max-w-7xl mx-auto relative z-10">
                        <Link href="/#courses" className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-8 text-sm font-bold uppercase tracking-widest transition-colors">
                            <i className="fa-solid fa-arrow-left"></i> Back to Tracks
                        </Link>
                        <div className="flex items-center gap-4 mb-6">
                            <span className="px-3 py-1 bg-white/10 rounded-lg text-xs font-black uppercase tracking-widest border border-white/10">Learning Track</span>
                        </div>
                        <h1 className="text-4xl sm:text-6xl font-black mb-6 tracking-tight">{track.title}</h1>
                        <p className="text-xl text-white/80 max-w-2xl font-medium leading-relaxed">
                            A comprehensive curriculum designed to take you from beginner to expert in {track.courses[0].language}.
                        </p>
                    </div>
                </section>

                {/* Course List */}
                <section className="py-20 px-4 max-w-7xl mx-auto">
                    <div className="grid gap-12">
                        {track.courses.map((course) => {
                            const langIcon = getLanguageIcon(course.language);
                            return (
                                <div key={course.id} className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-12 group hover:shadow-xl transition-shadow duration-300">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className={`w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-2xl ${langIcon.color} group-hover:scale-110 transition-transform`}>
                                                <i className={langIcon.icon}></i>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                {course.requiresDesktop && (
                                                    <>
                                                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-black uppercase tracking-widest border border-blue-200">
                                                            <i className="fa-solid fa-desktop mr-1"></i> Desktop
                                                        </span>
                                                        <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">•</span>
                                                    </>
                                                )}
                                                <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">{course.level}</span>
                                            </div>
                                        </div>

                                        <h2 className="text-3xl font-black text-brand-primary mb-4 group-hover:text-brand-secondary transition-colors">
                                            {course.title}
                                        </h2>
                                        <p className="text-lg text-gray-600 mb-8 font-medium italic">"{course.whyTakeThis}"</p>

                                        <div className="grid sm:grid-cols-2 gap-8 mb-8">
                                            <div>
                                                <h4 className="text-xs font-black text-brand-primary mb-2 uppercase tracking-widest flex items-center gap-2 opacity-70">
                                                    <i className="fa-solid fa-bullseye text-brand-secondary"></i> The Goal
                                                </h4>
                                                <p className="text-sm text-gray-700 font-medium leading-relaxed">{course.theGoal}</p>
                                            </div>
                                            <div>
                                                <h4 className="text-xs font-black text-brand-primary mb-2 uppercase tracking-widest flex items-center gap-2 opacity-70">
                                                    <i className="fa-solid fa-anchor text-brand-secondary"></i> Conceptual Anchor
                                                </h4>
                                                <p className="text-sm text-gray-700 font-medium leading-relaxed">{course.anchor}</p>
                                            </div>
                                            {course.analogyAnchor && (
                                                <div>
                                                    <h4 className="text-xs font-black text-brand-primary mb-2 uppercase tracking-widest flex items-center gap-2 opacity-70">
                                                        <i className="fa-solid fa-lightbulb text-brand-secondary"></i> Analogy
                                                    </h4>
                                                    <p className="text-sm text-gray-700 font-medium leading-relaxed">{course.analogyAnchor}</p>
                                                </div>
                                            )}
                                            {course.day1Product && course.day1Product !== "N/A" && (
                                                <div>
                                                    <h4 className="text-xs font-black text-brand-primary mb-2 uppercase tracking-widest flex items-center gap-2 opacity-70">
                                                        <i className="fa-solid fa-rocket text-brand-secondary"></i> Day 1 Product
                                                    </h4>
                                                    <p className="text-sm text-gray-700 font-medium leading-relaxed">{course.day1Product}</p>
                                                </div>
                                            )}
                                        </div>

                                        <div className="space-y-6 mb-8">
                                            {course.prerequisites && course.prerequisites.length > 0 && (
                                                <div>
                                                    <h4 className="text-xs font-black text-gray-400 mb-3 uppercase tracking-widest">Prerequisites</h4>
                                                    <div className="flex flex-wrap gap-2">
                                                        {course.prerequisites.map(prereq => (
                                                            <span key={prereq} className="px-3 py-1 bg-red-50 text-red-600 text-xs font-bold rounded-lg border border-red-100 flex items-center gap-1">
                                                                <i className="fa-solid fa-lock text-[10px] opacity-50"></i> {prereq}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            <div className="mb-0">
                                                <h4 className="text-xs font-black text-brand-primary mb-3 uppercase tracking-widest opacity-70">Constructs Mastered</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {course.topics.map(topic => (
                                                        <span key={topic} className="px-3 py-1 bg-gray-50 text-gray-600 text-xs font-bold rounded-lg border border-gray-100">
                                                            {topic}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="w-full md:w-80 shrink-0 bg-gray-50 rounded-3xl p-8 border border-gray-100 flex flex-col h-full">
                                        <div className="mb-auto">
                                            <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Milestone Project</h4>
                                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
                                                <div className="w-10 h-10 bg-brand-secondary/10 rounded-xl flex items-center justify-center text-brand-secondary mb-3">
                                                    <i className="fa-solid fa-trophy"></i>
                                                </div>
                                                <p className="font-bold text-gray-800 text-sm leading-tight">{course.capstone}</p>
                                            </div>
                                        </div>

                                        <Link href={`/checkout/${course.id}`} className="w-full bg-brand-primary text-white py-4 rounded-xl font-bold text-center hover:bg-brand-secondary transition-colors shadow-lg shadow-brand-primary/20 flex items-center justify-center gap-2">
                                            {course.isFree ? <span>Start Learning</span> : <span>Unlock Course</span>}
                                            <i className="fa-solid fa-arrow-right"></i>
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

            </main>
            <Footer />
        </div>
    );
}
