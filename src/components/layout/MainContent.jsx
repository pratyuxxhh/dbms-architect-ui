export default function MainContent({ children }) {
  return (
    <main className="flex-1 px-3 py-4 sm:px-6 lg:px-8 lg:py-6 w-full min-w-0">
      <div className="mx-auto flex w-full max-w-340 flex-col gap-4 sm:gap-5">{children}</div>
    </main>
  )
}