export const Badge = ({ children, type = 'verified' }) => {
  // This stores the badge colors for each status type.
  const badgeMap = {
    verified: 'border-success bg-status-success-light text-success',
    pending: 'border-warning bg-status-warning-light text-warning',
    rejected: 'border-error bg-status-error-light text-error',
    info: 'border-primary bg-status-info-light text-primary',
  }

  // This combines the normal badge shape with the selected badge color.
  const badgeClassName = [
    'inline-flex items-center rounded-lg border px-2.5 py-1.5 font-sans text-caption font-semibold transition-all duration-200 hover:-translate-y-px',
    badgeMap[type] ?? badgeMap.verified,
  ].join(' ')

  return <span className={badgeClassName}>{children}</span>
}
