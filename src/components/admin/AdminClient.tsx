"use client"

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react"
import { Trans } from "@/components/admin/Trans"
import { useI18n } from "@/components/I18nProvider"
import { Features } from "@/components/admin/Features/Features"
import { useEffect, useState } from "react"
import { Posts } from "@/components/admin/Posts/Posts"
import { SplitSections } from "@/components/admin/SplitSections/SplitSections"
import { LogOut } from "@/components/admin/LogOut"
import { getAdminStorage, saveAdminStore } from "@/components/admin/getAdminStorage"

export function AdminClient() {
    const [selectedIndex, setSelectedIndex] = useState(0)

    useEffect(function () {
        const parsed = getAdminStorage()
        if (parsed.tab) {
            setSelectedIndex(parsed.tab)
        }
    }, [setSelectedIndex])

    return (
        <>
            <LogOut />
            <TabGroup selectedIndex={selectedIndex} onChange={function (selected) {
                setSelectedIndex(selected)
                saveAdminStore({ tab: selected })
            }}>
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
        </>
    )
}
