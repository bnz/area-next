"use client"

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react"
import { Trans } from "@/components/admin/Trans"
import { LogOut } from "@/components/admin/LogOut"
import { useI18n } from "@/components/I18nProvider"
import { Features } from "@/components/admin/Features/Features"
import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Posts } from "@/components/admin/Posts/Posts"

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
        <div className="max-w-5xl bg-gray-100 dark:bg-gray-700 rounded px-1 py-3 lg:px-3 mx-2 lg:mx-auto shadow">
            <LogOut />
            <TabGroup
                selectedIndex={selectedIndex}
                onChange={setSelectedIndex}
                className="px-2"
            >
                <TabList className="flex gap-4 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded overflow-auto scrollbar-hide">
                    <Tab className="px-3 py-2 data-selected:outline-1 cursor-pointer rounded">
                        {useI18n("tab.translations")}
                    </Tab>
                    <Tab className="px-3 py-2 data-selected:outline-1 cursor-pointer rounded">
                        {useI18n("tab.features")}
                    </Tab>
                    <Tab className="px-3 py-2 data-selected:outline-1 cursor-pointer rounded">
                        {useI18n("tab.posts")}
                    </Tab>
                    <Tab className="px-3 py-2 data-selected:outline-1 cursor-pointer rounded">
                        {useI18n("tab.contacts")}
                    </Tab>
                </TabList>
                <TabPanels className="mt-3 py-3">
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
                        contacts tab content
                    </TabPanel>
                </TabPanels>
            </TabGroup>
        </div>
    )
}
