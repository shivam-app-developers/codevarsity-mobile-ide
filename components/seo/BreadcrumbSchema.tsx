'use client';

import { usePathname } from 'next/navigation';
import { siteConfig } from '@/lib/metadata';

export default function BreadcrumbSchema() {
    const pathname = usePathname();

    if (pathname === '/') return null;

    const paths = pathname.split('/').filter(Boolean);

    const itemListElement = [
        {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: siteConfig.url,
        },
        ...paths.map((path, index) => {
            const url = `${siteConfig.url}/${paths.slice(0, index + 1).join('/')}`;
            const name = path
                .split('-')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');

            return {
                '@type': 'ListItem',
                position: index + 2,
                name,
                item: url,
            };
        }),
    ];

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement,
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
    );
}
