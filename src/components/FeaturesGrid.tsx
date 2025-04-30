"use client"

import { useI18n } from "@/components/I18nProvider"
import { Feature } from "@/components/admin/AdminProvider"

export function FeaturesGrid() {
    const features = useI18n("features") as never as Feature[]

    return (
        <section className="py-24 px-6 sm:px-12 bg-gray-100 dark:bg-gray-950">
            <div className="max-w-6xl mx-auto grid gap-12 sm:grid-cols-2 lg:grid-cols-4 text-center">
                {features.map(function ({ title, description }, index) {
                    return (
                        <div key={index}>
                            <h3 className="text-xl font-medium mb-2">
                                {title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                {description}
                            </p>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}
