import { EmptyAssignmentsState } from '../components/assignments/EmptyAssignmentsState'
import { Sidebar } from '../components/layout/Sidebar'
import { TopBar } from '../components/layout/TopBar'

export function App() {
  return (
    <main className="h-screen overflow-hidden bg-[var(--shell-bg)] p-2 text-[var(--text-strong)] sm:p-2.5">
      <div className="assignment-shell mx-auto flex h-full max-w-[1600px] overflow-hidden rounded-[18px] bg-[var(--shell-bg)]">
        <div className="flex py-2.5">
          <Sidebar />
        </div>

        <section className="flex min-w-0 min-h-0 flex-1 flex-col bg-[#e6e6e6]">
          <TopBar />
          <EmptyAssignmentsState />
        </section>
      </div>
    </main>
  )
}
