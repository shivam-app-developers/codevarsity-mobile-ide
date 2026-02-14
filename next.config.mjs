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
        ];
    },
};

export default nextConfig;
