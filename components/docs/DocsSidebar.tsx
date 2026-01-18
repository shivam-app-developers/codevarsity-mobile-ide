'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const docSections = [
  {
    title: "Getting Started",
    items: [
      { title: "Installation", href: "/docs/getting-started/installation" },
      { title: "Your First Program", href: "/docs/getting-started/first-program" },
    ]
  },
  {
    title: "Learning Methodology",
    items: [
      { title: "Visualizers", href: "/docs/learning/visualizers" },
    ]
  },
  {
    title: "Languages",
    items: [
      { title: "Python", href: "/docs/languages/python" },
      { title: "Java", href: "/docs/languages/java" },
    ]
  },
  {
    title: "Profile & Stats",
    items: [
      { title: "Stats Explained", href: "/docs/profile/stats-explained" },
      { title: "Achievements", href: "/docs/profile/achievements" },
    ]
  },
  {
    title: "API Reference",
    items: [
      { title: "Course Format", href: "/docs/api/course-format" },
    ]
  }
];

export default function DocsSidebar() {
  const pathname = usePathname();

  return (
    <nav className="w-64 flex-shrink-0 border-r border-gray-100 pr-8 hidden lg:block h-[calc(100vh-8rem)] sticky top-28 overflow-y-auto">
      {docSections.map((section, idx) => (
        <div key={idx} className="mb-8">
          <h3 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wider">{section.title}</h3>
          <ul className="space-y-2">
            {section.items.map((item, i) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
              return (
                <li key={i}>
                  <Link
                    href={item.href}
                    className={`block text-sm py-1 border-l-2 pl-3 transition ${
                      isActive
                        ? 'border-brand-primary text-brand-primary font-medium'
                        : 'border-transparent text-gray-600 hover:text-brand-primary hover:border-brand-primary'
                    }`}
                  >
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
