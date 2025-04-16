import type { NextConfig } from "next"

const isProd = process.env.NODE_ENV === 'production'

const nextConfig: NextConfig = {
	output: 'export', // 👈 включаем static export
	basePath: isProd ? '' : '', // 👈 для GitHub Pages
	trailingSlash: true, // 👈 важно для корректных путей
}

export default nextConfig
