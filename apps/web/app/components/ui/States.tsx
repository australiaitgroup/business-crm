export function LoadingSkeleton() {
  return (
    <div className="animate-pulse space-y-3">
      <div className="h-6 w-40 bg-[var(--border)] rounded" />
      <div className="h-4 w-full bg-[var(--border)] rounded" />
      <div className="h-4 w-2/3 bg-[var(--border)] rounded" />
    </div>
  );
}

export function ErrorState(props: { message?: string }) {
  return (
    <div className="border border-red-300 bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-300 dark:border-red-900 rounded p-4">
      <div className="font-semibold mb-1">Something went wrong</div>
      <div className="text-sm opacity-80">{props.message ?? "Please try again."}</div>
    </div>
  );
}

export function EmptyState(props: { title?: string; description?: string }) {
  return (
    <div className="border border-[var(--border)] rounded p-6 text-center">
      <div className="font-medium">{props.title ?? "Nothing here yet"}</div>
      <div className="text-sm opacity-70">{props.description ?? "Add new data to get started."}</div>
    </div>
  );
}

