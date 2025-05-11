"use client"

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react"
import { Trans } from "@/components/admin/Trans"
import { LogOut } from "@/components/admin/LogOut"
import { useI18n } from "@/components/I18nProvider"
import { Features } from "@/components/admin/Features/Features"
import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Posts } from "@/components/admin/Posts/Posts"
import { SplitSections } from "@/components/admin/SplitSections/SplitSections"

export function AdminClient() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const tabParam = searchParams.get("tab")
    const initialTab = tabParam ? parseInt(tabParam, 10) : 0
    const [selectedIndex, setSelectedIndex] = useState(initialTab)

    useEffect(function () {
        history.replaceState(null, "", `?tab=${selectedIndex}`)
    }, [selectedIndex, router])

    return (
        <div className="max-w-5xl bg-gray-100 dark:bg-gray-700 rounded py-3 mx-2 lg:mx-auto shadow-xl">
            <LogOut />
            <TabGroup selectedIndex={selectedIndex} onChange={setSelectedIndex}>
                <TabList className="flex gap-4 bg-gray-100 dark:bg-gray-800 px-3 py-1 overflow-auto scrollbar-hide">
                    <Tab className="px-3 py-2 data-selected:outline-1 cursor-pointer rounded whitespace-nowrap">
                        {useI18n("tab.translations")}
                    </Tab>
                    <Tab className="px-3 py-2 data-selected:outline-1 cursor-pointer rounded whitespace-nowrap">
                        {useI18n("tab.features")}
                    </Tab>
                    <Tab className="px-3 py-2 data-selected:outline-1 cursor-pointer rounded whitespace-nowrap">
                        {useI18n("tab.posts")}
                    </Tab>
                    <Tab className="px-3 py-2 data-selected:outline-1 cursor-pointer rounded whitespace-nowrap">
                        {useI18n("tab.split.sections")}
                    </Tab>
                </TabList>
                <TabPanels className="mt-3">
                    <TabPanel>
                        <Trans />
                    </TabPanel>
                    <TabPanel>
                        <Features />
                    </TabPanel>
                    <TabPanel>
                        <Posts />
                    </TabPanel>
                    <TabPanel>
                        <SplitSections />
                    </TabPanel>
                </TabPanels>
            </TabGroup>
        </div>
    )
}
