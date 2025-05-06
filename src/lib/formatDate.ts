export function formatDate(dateString: string): string {
	const [date, time] = dateString.split("T")
	const [yy, mm, dd] = date.split("-")
    return `${dd}/${mm}/${yy} ${time}`
}
