"use client"

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react"
import { Trans } from "@/components/Trans"
import { useAdmin } from "@/components/AdminProvider"

type AdminClientProps = {
    lang: string
}

export function AdminClient({ lang }: AdminClientProps) {

    return (
        <div className="max-w-5xl mx-auto">
            <TabGroup>
                <TabList className="flex gap-4">
                    <Tab className="px-3 py-2 data-selected:outline-1 cursor-pointer rounded">translations</Tab>
                    <Tab className="px-3 py-2 data-selected:outline-1 cursor-pointer rounded">contacts</Tab>
                    <Tab className="px-3 py-2 data-selected:outline-1 cursor-pointer rounded">posts</Tab>
                </TabList>
                <TabPanels className="mt-3 outline-1">
                    <TabPanel>
                        <Trans />
                    </TabPanel>
                    <TabPanel className="">
                        contacts tab content
                    </TabPanel>
                    <TabPanel className="">
                        posts tab content
                    </TabPanel>
                </TabPanels>
            </TabGroup>
        </div>
    )

    // return (
    //     <form
    //         className="p-2 max-w-[700px] mx-auto flex flex-col gap-4"
    //         onSubmit={function (event) {
    //             event.preventDefault()
    //         }}
    //     >
    //         <input
    //             type="password"
    //             placeholder="Вставь GitHub Token"
    //             value={token}
    //             onChange={function (e) {
    //                 setToken(e.target.value)
    //             }}
    //         />
    //         <button type="button" className="button" onClick={loadFile}>Загрузить JSON</button>
    //         <textarea
    //             rows={20}
    //             value={jsonText}
    //             onChange={(e) => setJsonText(e.target.value)}
    //         />
    //         <button type="submit" className="button" onClick={saveFile}>
    //             💾 Сохранить
    //         </button>
    //         <div style={{ marginTop: "1rem", fontWeight: "bold" }}>{status}</div>
    //     </form>
    // )
}
