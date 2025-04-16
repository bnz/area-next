import type { NextConfig } from "next"

const nextConfig: NextConfig = {
    output: 'export', // 👈 включаем static export
    trailingSlash: true, // 👈 важно для корректных путей
}

export default nextConfig
