import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import JsonLd from '@/components/seo/JsonLd';
import { Metadata } from 'next';
import { createMetadata } from '@/lib/metadata';

export const metadata: Metadata = createMetadata({
    title: 'FAQ',
    description: 'Frequently asked questions about CodeVarsity, pricing, features, and learning methodology.',
    path: '/faq',
    type: 'website',
});

const faqs = [
    // General
    {
        category: "General",
        question: "What is CodeVarsity?",
        answer: "CodeVarsity is a professional mobile IDE and learning platform built on the Rhombus Methodology™. It enables you to write, compile, and run real code offline on your Android device. It features 50+ structured courses, 30+ interactive visualizers, and supports 15+ languages including Python, Java 21, Go, and Web languages (HTML/CSS/JS)."
    },
    {
        category: "General",
        question: "Is CodeVarsity free?",
        answer: "CodeVarsity is free to download and includes a sandbox IDE for web/scripting. You can try the first 2 layers of every course for free! Full access to courses is via one-time lifetime purchases. Advanced Workspace features (like the mobile Java 21 compiler) are available via subscription with a 7-day free trial."
    },
    {
        category: "General",
        question: "Is there an iOS version?",
        answer: "CodeVarsity is currently available on Android. We are actively working on the iOS version to bring high-performance offline coding to Apple devices soon."
    },
    // Offline & Technical
    {
        category: "Offline & Technical",
        question: "How does offline execution work?",
        answer: "CodeVarsity embeds professional language runtimes directly in the app: an industrial Python 3.10 engine, a professional Java 21 compiler, an advanced Go runtime, and a live-preview Web environment. Everything runs locally on your device - no internet required for compiling or executing code."
    },
    {
        category: "Offline & Technical",
        question: "Can I use NumPy, Pandas, Flask, Django?",
        answer: "Yes! Python comes pre-bundled with professional libraries: NumPy, Pandas, SciPy, Scikit-learn, Flask, Django, Requests, and more. All are fully functional without an internet connection. Note: Matplotlib and Seaborn are not supported due to mobile display limitations."
    },
    {
        category: "Offline & Technical",
        question: "Does it support interactive input?",
        answer: "Yes! You can use input() in Python, Scanner in Java, and fmt.Scanln() in Go. Build interactive CLI programs and terminal-based tools just like on a desktop."
    },
    {
        category: "Offline & Technical",
        question: "Can I build web pages on my phone?",
        answer: "Absolutely! CodeVarsity includes a full web development environment for HTML, CSS, and JavaScript with live preview. You can even use modern frameworks like React and Vue.js."
    },
    // Learning
    {
        category: "Learning",
        question: "What is the Rhombus Methodology™?",
        answer: "Our unique 7-layer learning framework takes students from high-level conceptual overviews to technical precision. It combines instructional spirals (Layers 1-3), mastery deep dives (Layer 4), and application spirals for debugging and design (Layers 5-7)."
    },
    {
        category: "Learning",
        question: "What is Guided Practice (Ghost Code™)?",
        answer: "Guided Practice helps you learn by typing character-by-character along with 'Ghost Code' templates. This builds muscle memory and helps you master complex syntax without getting frustrated by simple typos."
    },
    {
        category: "Learning",
        question: "What are the interactive visualizers?",
        answer: "We offer 30+ visualizers to help you 'see' your code. This includes Flowcharts, Execution Trace (step-by-step), Memory Manager (Stack/Heap), SQL Database View, and Tree/Graph visualizers for data structures."
    },
    {
        category: "Learning",
        question: "What are Profile Stats?",
        answer: "Your profile tracks verified coding activity: XP, total lines typed (verified, no copy-paste), Bug Squasher challenges solved, and your first-try rate. You can share your profile URL with recruiters to prove your coding competence."
    },
    // IDE Features
    {
        category: "IDE Features",
        question: "Does the keyboard have arrow keys?",
        answer: "Yes! Our custom developer keyboard is designed specifically for mobile coding. It includes arrow keys, Tab, Ctrl, and quick-access symbols like brackets, semicolons, and operators."
    },
    {
        category: "IDE Features",
        question: "Can I work on multi-file projects?",
        answer: "Yes! The workspace supports complex multi-file projects, folders, and asset management. You can build complete Flask web apps or Java console applications with multiple classes."
    },
    {
        category: "IDE Features",
        question: "Is there code formatting and linting?",
        answer: "Yes! CodeVarsity features real-time linting to catch errors as you type, and auto-formatting that follows professional standards like PEP8 (Python) and gofmt (Go)."
    },
    // Pricing
    {
        category: "Pricing",
        question: "How does course pricing work?",
        answer: "Courses are one-time 'Lifetime Access' purchases ranging from $5.99 to $19.99. Once you buy a course, it's yours forever. You can sample the first 2 layers of any course for free."
    },
    {
        category: "Pricing",
        question: "How does the IDE Workspace subscription work?",
        answer: "Advanced IDE features (like the Java 21 and Python compilers) require a Workspace Subscription (starting at $1.99/mo). We offer a 7-day free trial so you can test all pro features risk-free."
    },
    {
        category: "Pricing",
        question: "What payment methods are accepted?",
        answer: "We accept Credit/Debit cards (Visa, Mastercard, Amex), PayPal, and region-specific methods like UPI in India through our secure partner, Cashfree."
    }
];

// Group FAQs by category
const faqsByCategory = faqs.reduce((acc, faq) => {
    if (!acc[faq.category]) {
        acc[faq.category] = [];
    }
    acc[faq.category].push(faq);
    return acc;
}, {} as Record<string, typeof faqs>);

export default function FAQPage() {
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <JsonLd data={faqSchema} />
            <Navbar />
            <main className="flex-grow pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">

                <div className="text-center mb-16">
                    <h1 className="text-4xl font-black text-gray-900 mb-4">Frequently Asked Questions</h1>
                    <p className="text-xl text-gray-600">Everything you need to know about CodeVarsity</p>
                </div>

                {/* Quick Links */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {Object.keys(faqsByCategory).map(category => (
                        <a
                            key={category}
                            href={`#${category.toLowerCase().replace(/\s+/g, '-')}`}
                            className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:border-brand-primary hover:text-brand-primary transition"
                        >
                            {category}
                        </a>
                    ))}
                </div>

                {/* FAQ Sections */}
                {Object.entries(faqsByCategory).map(([category, categoryFaqs]) => (
                    <section key={category} id={category.toLowerCase().replace(/\s+/g, '-')} className="mb-12">
                        <h2 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">{category}</h2>
                        <div className="space-y-4">
                            {categoryFaqs.map((faq, index) => (
                                <details key={index} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm group">
                                    <summary className="font-semibold text-gray-900 cursor-pointer flex justify-between items-center">
                                        {faq.question}
                                        <i className="fa-solid fa-chevron-down text-gray-400 text-sm transition group-open:rotate-180"></i>
                                    </summary>
                                    <p className="mt-4 text-gray-600 leading-relaxed">{faq.answer}</p>
                                </details>
                            ))}
                        </div>
                    </section>
                ))}

                {/* Still have questions */}
                <div className="bg-gradient-to-br from-brand-primary to-brand-secondary text-white rounded-2xl p-8 text-center mt-16">
                    <h3 className="text-2xl font-bold mb-3">Still have questions?</h3>
                    <p className="opacity-90 mb-6">We&apos;re here to help. Reach out to our support team.</p>
                    <Link href="mailto:support@shivamappstudio.com" className="inline-block bg-white text-brand-primary px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition">
                        Contact Support
                    </Link>
                </div>

            </main>
            <Footer />
        </div>
    );
}

