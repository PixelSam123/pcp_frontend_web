export default function Card({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={`border border-white p-3 ${className ?? ''}`}>
      {children}
    </div>
  )
}
