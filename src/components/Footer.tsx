export function Footer({ copyright }: { copyright: string }) {
	return (
		<footer className="py-6 text-center text-sm text-gray-500 h-[50px]">
			{copyright}
		</footer>
	)
}
