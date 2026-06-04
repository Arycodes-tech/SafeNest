import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import heroImage from '../../assets/hero.png'

export const PropertyCard = ({
  title = 'Lovely 2 Bedroom Flat',
  location = 'Yaba, Lagos',
  price = '#850,000 / year',
  bedrooms = 2,
  bathrooms = 2,
  parking = 1,
  image = heroImage,
}) => {
  return (
    // This controls the whole property card.
    <article className="overflow-hidden rounded-xl border border-border bg-white font-sans shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover">
      {/* This holds the property image and verified badge. */}
      <div className="relative h-44 overflow-hidden sm:h-[180px]">
        <img src={image} alt={title} className="h-full w-full object-cover" />
        <div className="absolute left-3 top-3">
          <Badge type="verified">Verified Property</Badge>
        </div>
      </div>

      <div className="p-4">
        <h3 className="m-0 text-lg font-semibold text-text-primary">{title}</h3>
        <p className="mt-1.5 text-small text-text-tertiary">{location}</p>
        <p className="mt-2.5 text-xl font-bold text-dark">{price}</p>

        {/* This lists the quick property features under the price. */}
        <div className="mt-3 flex flex-wrap gap-x-3.5 gap-y-1 text-[13px] text-text-tertiary">
          <span>{bedrooms} beds</span>
          <span>{bathrooms} baths</span>
          <span>{parking} parking</span>
        </div>

        <div className="mt-4">
          <Button size="small" variant="secondary">
            View Details
          </Button>
        </div>
      </div>
    </article>
  )
}
