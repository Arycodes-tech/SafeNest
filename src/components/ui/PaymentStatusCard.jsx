export const PaymentStatusCard = ({ title, description, status = 'pending' }) => {
  // This stores the card color for each payment status.
  const statusMap = {
    pending: 'border-primary bg-status-info-light',
    held: 'border-warning bg-status-warning-light',
    released: 'border-success bg-status-success-light',
    refunded: 'border-status-refunded bg-status-refunded-light',
  }

  // This controls the outside card design.
  const cardClassName = [
    'rounded-lg border p-3.5 font-sans transition-all duration-200 hover:-translate-y-0.5 hover:shadow-status-hover',
    statusMap[status] ?? statusMap.pending,
  ].join(' ')

  return (
    <div className={cardClassName}>
      <h4 className="mb-1 text-small font-bold text-text-primary">{title}</h4>
      <p className="m-0 text-caption text-text-secondary">{description}</p>
    </div>
  )
}
