/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        GENERATE_SOURCEMAP: false,
        API_KEY: process.env.API_KEY,
    },
}

module.exports = nextConfig
