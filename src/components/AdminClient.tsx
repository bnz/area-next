"use client"

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react"
import { Trans } from "@/components/Trans"
import { LogOut } from "@/components/LogOut"
import { useI18n } from "@/components/I18nProvider"
import { Features } from "@/components/Features"
import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"

export function AdminClient() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const tabParam = searchParams.get("tab")
    const initialTab = tabParam ? parseInt(tabParam, 10) : 0
    const [selectedIndex, setSelectedIndex] = useState(initialTab)

    useEffect(function () {
        router.replace(`?tab=${selectedIndex}`)
    }, [selectedIndex, router])

    return (
        <div className="max-w-5xl mx-auto">
            <LogOut />
            <TabGroup
                selectedIndex={selectedIndex}
                onChange={setSelectedIndex}
                className="px-2"
            >
                <TabList className="flex gap-4 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
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
                    <TabPanel className="">
                        posts tab content
                    </TabPanel>
                    <TabPanel className="">
                        contacts tab content
                    </TabPanel>
                </TabPanels>
            </TabGroup>
        </div>
    )
}
