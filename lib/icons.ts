/**
 * Shared utility for mapping course languages/technologies to FontAwesome icons and brand colors.
 */
export interface IconConfig {
    icon: string;
    color: string;
}

export function getLanguageIcon(language: string): IconConfig {
    const l = language?.toLowerCase() || '';

    if (l.includes('python')) return { icon: 'fa-brands fa-python', color: 'text-yellow-500' };
    if (l.includes('java') && !l.includes('script')) return { icon: 'fa-brands fa-java', color: 'text-red-500' };
    if (l.includes('javascript') || l.includes('js')) return { icon: 'fa-brands fa-js', color: 'text-yellow-400' };
    if (l.includes('html')) return { icon: 'fa-brands fa-html5', color: 'text-orange-500' };
    if (l.includes('go')) return { icon: 'fa-brands fa-golang', color: 'text-cyan-500' };
    if (l.includes('sql')) return { icon: 'fa-solid fa-database', color: 'text-blue-500' };
    if (l.includes('c++')) return { icon: 'fa-solid fa-computer', color: 'text-blue-700' };
    if (l.includes('kotlin')) return { icon: 'fa-solid fa-mobile-screen', color: 'text-purple-500' };
    if (l.includes('rust')) return { icon: 'fa-brands fa-rust', color: 'text-orange-700' };
    if (l.includes('php')) return { icon: 'fa-brands fa-php', color: 'text-indigo-400' };
    if (l.includes('clojure')) return { icon: 'fa-solid fa-infinity', color: 'text-purple-600' };
    if (l.includes('groovy')) return { icon: 'fa-solid fa-bolt', color: 'text-emerald-500' };
    if (l.includes('c#') || l.includes('net')) return { icon: 'fa-brands fa-microsoft', color: 'text-blue-600' };

    // Default fallback
    return { icon: 'fa-solid fa-book-bookmark', color: 'text-gray-400' };
}
