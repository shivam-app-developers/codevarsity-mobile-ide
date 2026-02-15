'use client';

import { siteConfig } from '@/lib/metadata';

export default function StructuredData() {
    const softwareAppSchema = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: siteConfig.name,
        description: 'Learn Python, Java, JavaScript, SQL, Go & C programming with our offline IDE and 50+ structured courses. Master coding using the Rhombus Methodology™ with 30+ interactive visualizers.',
        url: siteConfig.url,
        applicationCategory: 'EducationalApplication, DeveloperApplication',
        operatingSystem: 'Android',
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
        },
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.8',
            ratingCount: '1250',
        },
    };

    const websiteSchema = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'CodeVarsity',
        alternateName: 'CodeVarsity Mobile IDE',
        url: siteConfig.url,
    };

    const organizationSchema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'CodeVarsity',
        url: siteConfig.url,
        logo: `${siteConfig.url}/assets/logo-brand.png`,
        founder: {
            '@type': 'Person',
            name: 'Marikanti Puli Bala Krishna',
        },
        sameAs: [
            siteConfig.links.twitter,
            siteConfig.links.github,
        ],
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
            />
        </>
    );
}
