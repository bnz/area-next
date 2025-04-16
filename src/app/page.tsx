import Link from 'next/link'

export default function Home() {
	return (
		<div className="">
			aria | <Link href={`/admin`}>admin</Link>

			<br />

			<div className="p-3">
				<input type="text" className="" />
			</div>
		</div>
	)
}
