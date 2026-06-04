import { Button } from './Button'

export const EmptyState = ({
  title = 'No data found',
  description = 'There is nothing to show right now.',
  buttonText = 'Try Again',
  onButtonClick,
}) => {
  return (
    <div className="rounded-lg border border-border bg-white p-6 text-center font-sans sm:p-8">
      <div className="mb-3 text-4xl leading-none">!</div>
      <h3 className="mb-2 text-lg font-bold text-text-primary">{title}</h3>
      <p className="mb-4 text-small text-text-secondary">{description}</p>
      <Button onClick={onButtonClick}>{buttonText}</Button>
    </div>
  )
}
