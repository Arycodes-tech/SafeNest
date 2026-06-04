export const Alert = ({ message, type = 'success' }) => {
  const alertMap = {
    success: 'border-success bg-status-success-light text-success',
    info: 'border-primary bg-status-info-light text-primary',
    warning: 'border-warning bg-status-warning-light text-warning',
    error: 'border-error bg-status-error-light text-error',
  }
  const alertClassName = [
    'rounded-lg border px-3.5 py-3 font-sans text-small font-medium',
    alertMap[type] ?? alertMap.success,
  ].join(' ')

  return <div className={alertClassName}>{message}</div>
}
