import Link from 'next/link'


export default function Home() {
	return (
		<div className="">
			aria | <Link href={`/admin`}>
				admin
			</Link>
		</div>
	)
}
