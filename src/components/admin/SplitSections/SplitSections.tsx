import { TransFiles } from "@/components/admin/AdminProvider"
import { SplitList } from "@/components/admin/SplitSections/SplitList"
import { PublishButton } from "@/components/admin/PublishButton"
import { AddSplitForm } from "@/components/admin/SplitSections/AddSplitForm"

export function SplitSections() {
    return (
        <div className="relative">
            <SplitList />
            <AddSplitForm />
            <PublishButton filename={TransFiles.splits} />
        </div>
    )
}
