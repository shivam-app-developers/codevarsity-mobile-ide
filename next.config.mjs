/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        unoptimized: true,
    },
    async redirects() {
        return [
            {
                source: '/why-codelab',
                destination: '/',
                permanent: true,
            },
            // The app's legal pages live on the studio site
            // (shivam_app_studio repo, tool/gen_app_pages.py).
            {
                source: '/privacy',
                destination: 'https://shivamappstudio.com/codevarsity/privacy-policy',
                permanent: true,
            },
            {
                source: '/terms',
                destination: 'https://shivamappstudio.com/codevarsity/terms',
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
