import { Badge } from './Badge'
import { Button } from './Button'

export const DepositCard = ({
  property = '2 Bedroom Apartment, Lekki',
  amount = '₦350,000', 
  status = 'Held', 
}) => {
  return (
    <div className="rounded-2xl border border-border bg-background-deposit p-4 font-sans shadow-deposit sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="m-0 text-lg font-semibold text-text-primary">
            Holding Deposit
          </h3>
          <p className="mb-1 mt-2.5 text-caption text-text-tertiary">
            Property
          </p>
          <strong className="text-small text-text-primary sm:text-body">
            {property}
          </strong>
        </div>
        <div className="self-start">
          <Badge type="verified">{status}</Badge>
        </div>
      </div>
      <p className="mb-1.5 mt-4 text-caption text-text-tertiary">Amount</p>
      <h2 className="m-0 text-h2 text-text-primary">{amount}</h2>
      <div className="mt-5">
        <Button variant="secondary" size="small">
          View Transaction
        </Button>
      </div>
    </div>
  )
}
