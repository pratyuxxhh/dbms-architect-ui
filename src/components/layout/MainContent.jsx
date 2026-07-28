export default function MainContent({ children }) {
  return (
    <main className="flex-1 px-4 py-5 sm:px-6 lg:px-8 lg:py-6">
      <div className="mx-auto flex w-full max-w-340 flex-col gap-5">{children}</div>
    </main>
  )
}