export default function SimplePage({ title, description }) {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col items-start px-6 py-16">
      <p className="label">Find IT</p>
      <h2 className="mt-4 text-3xl font-semibold text-white">{title}</h2>
      <p className="mt-3 text-sm text-zinc-400">{description}</p>
    </div>
  )
}
