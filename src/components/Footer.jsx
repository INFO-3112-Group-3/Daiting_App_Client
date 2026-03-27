import { Link } from 'react-router-dom'

// Static sitemap data controls link groupings and keeps JSX lean.
const columns = [
	{
		label: 'Product',
		links: [
			{ name: 'About Find IT', to: '/' },
			{ name: 'How it Works', to: '/' },
		],
	},
	{
		label: 'Account',
		links: [
			{ name: 'Sign In', to: '/' },
			{ name: 'Register', to: '/register' },
			{ name: 'Help Center', to: '/' },
		],
	},
	{
		label: 'Legal',
		links: [
			{ name: 'Privacy', to: '/' },
			{ name: 'Terms', to: '/' },
		],
	},
]

export function Footer() {
	return (
		<footer className="fixed inset-x-0 bottom-0 z-40 border-t border-[#1F1F2A] bg-[#12121A]/98 px-6 py-6 text-[#8A8A97] shadow-[0_-16px_40px_rgba(0,0,0,0.45)] backdrop-blur">
			<div className="mx-auto grid w-full max-w-4xl gap-6 text-xs sm:grid-cols-3">
				{columns.map((column) => (
					<div key={column.label} className="space-y-3">
						<p className="text-[0.6rem] font-semibold uppercase tracking-[0.28em] text-[#B9BAC6]">
							{column.label}
						</p>
						<div className="flex flex-col gap-2">
							{column.links.map((link) => (
								<Link
									key={link.name}
									to={link.to}
									className="transition hover:text-white"
								>
									{link.name}
								</Link>
							))}
						</div>
					</div>
				))}
			</div>
		</footer>
	)
}
