export const Alert = ({ message, type = 'success' }) => {
  // This stores the alert colors for success, info, warning, and error messages.
  const alertMap = {
    success: 'border-success bg-status-success-light text-success',
    info: 'border-primary bg-status-info-light text-primary',
    warning: 'border-warning bg-status-warning-light text-warning',
    error: 'border-error bg-status-error-light text-error',
  }

  // This controls how the alert box looks.
  const alertClassName = [
    'rounded-lg border px-3.5 py-3 font-sans text-small font-medium',
    alertMap[type] ?? alertMap.success,
  ].join(' ')

  return <div className={alertClassName}>{message}</div>
}
