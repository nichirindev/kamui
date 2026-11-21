/** @type {import('next').NextConfig} */
const nextConfig = {
    // The background-removal engine uses SharedArrayBuffer for multithreaded
    // WASM inference, which requires cross-origin isolation on every route.
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
                    { key: 'Cross-Origin-Embedder-Policy', value: 'require-corp' },
                ],
            },
        ];
    },
};

export default nextConfig;
