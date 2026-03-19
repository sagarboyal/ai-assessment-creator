import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <main className="min-h-screen bg-slate-950 px-6 py-24 text-slate-100">
      <div className="mx-auto max-w-3xl space-y-6">
        <span className="inline-flex rounded-full border border-cyan-400/40 bg-cyan-400/10 px-3 py-1 text-sm font-medium text-cyan-300">
          Tailwind CSS is active
        </span>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
          AI Assessment Creator
        </h1>
        <p className="max-w-2xl text-lg text-slate-300">
          Start editing this screen with Tailwind utility classes and Vite will hot-reload
          the result.
        </p>
      </div>
    </main>
  </StrictMode>,
)
