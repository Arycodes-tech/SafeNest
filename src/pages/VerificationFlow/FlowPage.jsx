export default function FlowPage({ children, className = '' }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background-primary px-4 py-8">
      <div
        className={`w-full max-w-md rounded-[28px] border border-border bg-white p-6 shadow-floating sm:p-8 ${className}`}
      >
        {children}
      </div>
    </div>
  )
}
