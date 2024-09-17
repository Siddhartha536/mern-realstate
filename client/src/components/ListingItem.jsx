import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';
import {
  FaBath,
  FaBed,
  FaChair,
  FaParking,
} from 'react-icons/fa';

export default function ListingItem({ listing }) {
  return (
    <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]'>
      <Link to={`/listing/${listing._id}`}>
        <img
          src={
            listing.imageUrls[0] ||
            'https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg'
          }
          alt='listing cover'
          className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'
        />
        <div className='p-3 flex flex-col gap-2 w-full'>
          <p className='truncate text-lg font-semibold text-slate-700'>
            {listing.name}
          </p>
          <div className='flex items-center gap-1'>
            <MdLocationOn className='h-4 w-4 text-green-700' />
            <p className='text-sm text-gray-600 truncate w-full'>
              {listing.address}
            </p>
          </div>
          <p className='text-sm text-gray-600 line-clamp-2'>
            {listing.description}
          </p>
          <p className='text-slate-500 mt-2 font-semibold '>
            $
            {listing.offer
              ? listing.discountPrice.toLocaleString('en-US')
              : listing.regularPrice.toLocaleString('en-US')}
            {listing.type === 'rent' && ' / month'}
          </p>

          {/* Beds, Baths, Furnished Status, and Parking */}          
          <div className='text-slate-700 flex gap-4 flex-wrap'>
            {/* Bedrooms */}
            <div className='flex items-center gap-1 text-xs'>
              <FaBed className='text-lg' />
              <span>
                {listing.bedRooms > 1
                  ? `${listing.bedRooms} Bedrooms`
                  : `${listing.bedRooms} Bedroom`}
              </span>
            </div>

            {/* Bathrooms */}
            <div className='flex items-center gap-1 text-xs'>
              <FaBath className='text-lg' />
              <span>
                {listing.bathRooms > 1
                  ? `${listing.bathRooms} Bathrooms`
                  : `${listing.bathRooms} Bathroom`}
              </span>
            </div>

            {/* Furnished Status */}
            <div className='flex items-center gap-1 text-xs'>
              <FaChair className='text-lg' />
              <span>{listing.furnished ? 'Furnished' : 'Unfurnished'}</span>
            </div>

            {/* Parking Status */}
            <div className='flex items-center gap-1 text-xs'>
              <FaParking className='text-lg' />
              <span>{listing.parking ? 'Parking Available' : 'No Parking'}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
