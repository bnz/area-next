import Link from 'next/link'

export default function Home() {

	console.log(process.env.NEXT_PUBLIC_GITHUB_TOKEN)

	return (
		<div className="">
			aria | <Link href={`/admin`}>admin</Link>

			<br />

			<div>
				<input type="text"
					className=""
				/>
			</div>
		</div>
	)
}
