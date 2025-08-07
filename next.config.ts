import type { NextConfig } from "next"

const nextConfig: NextConfig = {
    output: 'export', // standalone // 👈 включаем static export
    trailingSlash: true, // 👈 важно для корректных путей
}

export default nextConfig
