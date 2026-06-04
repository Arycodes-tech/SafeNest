import heroImage from '../../assets/hero.png'

export const PropertyGallery = ({ images = [heroImage, heroImage, heroImage] }) => {
  return (
    // This creates a simple image gallery for a property details page.
    <div className="grid gap-3 font-sans md:grid-cols-[2fr_1fr]">
      <img
        src={images[0]}
        alt="Main property view"
        className="h-56 w-full rounded-xl border border-border object-cover sm:h-[280px]"
      />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-1">
        <img
          src={images[1]}
          alt="Property view two"
          className="h-32 w-full rounded-xl border border-border object-cover sm:h-[134px]"
        />
        <img
          src={images[2]}
          alt="Property view three"
          className="h-32 w-full rounded-xl border border-border object-cover sm:h-[134px]"
        />
      </div>
    </div>
  )
}
