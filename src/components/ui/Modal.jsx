import { Button } from './Button'

export const Modal = ({ title, children, isOpen, onClose }) => {
  // If isOpen is false, we return nothing so the modal does not show on the page.
  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed z-50 flex items-center justify-center bg-dark p-4 sm:p-5">
      <div className="w-full max-w-[480px] rounded-lg bg-white p-5 font-sans sm:p-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="m-0 text-lg font-semibold text-text-primary sm:text-xl">
            {title}
          </h2>
          <Button variant="text" onClick={onClose}>
            Close
          </Button>
        </div>

        {children}
      </div>
    </div>
  )
}
