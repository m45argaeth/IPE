import { Suspense } from "react"
import { PlaygroundInner } from "./playground-inner"

export default function PlaygroundPage() {
  return (
    <div className="container py-10 sm:py-16">
      <Suspense
        fallback={
          <div className="mx-auto max-w-4xl space-y-8">
            <div className="text-center">
              <div className="mx-auto h-8 w-64 animate-pulse rounded bg-muted" />
              <div className="mx-auto mt-4 h-4 w-96 animate-pulse rounded bg-muted" />
            </div>
          </div>
        }
      >
        <PlaygroundInner />
      </Suspense>
    </div>
  )
}
