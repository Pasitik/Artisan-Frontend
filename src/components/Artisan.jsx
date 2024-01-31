import StarRating from './StarRating';
const BASE_API_URL = import.meta.env.VITE_APP_BASE_API_URL;

const Artisan = ({ artist }) => {
  const artistAddress = `${artist.addresses[0].street}, ${artist.addresses[0].city}`;

  return (
    <figure key={artist.id} className="flex w-12/12 max-h-[130px]">
      <img
        src={
          artist.photo
            ? BASE_API_URL + 'media/' + artist.photo
            : '../profilephoto.jpeg'
        }
        width={135}
        height={135}
        className=" max-h-[135px] object-contain"
      />
      <figcaption className="flex flex-col justify-end mx-2">
        <p className="flex capitalize">
          <span className="mr-2 font-bold leading-tight">Job title: </span>
          {artist.job_title}
        </p>
        <div className="flex">
          <span className="mr-2 font-bold leading-tight">Ratings: </span>
          <StarRating
            totalStars={5}
            ratings={artist.ratings}
            isRating={false}
          />
        </div>
        <p className="flex capitalize">
          <span className="mr-2 font-bold leading-tight">Location: </span>
          {artist.addresses.length > 0 && artist.addresses[0].city
            ? artistAddress.slice(0, 30) +
              (artistAddress.length > 30 ? '...' : '')
            : 'Not available'}
        </p>
        <p className="flex capitalize">
          <span className="mr-2 font-bold leading-tight">Phone: </span>
          {artist.business_line ? artist.business_line : 'Not Available'}
        </p>
      </figcaption>
    </figure>
  );
};

export default Artisan;
