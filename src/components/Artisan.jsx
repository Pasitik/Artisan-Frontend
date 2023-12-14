import StarRating from './StarRating';
const BASE_API_URL = import.meta.env.VITE_APP_BASE_API_URL;

const Artisan = ({ artist }) => {
  return (
    <figure key={artist.id} className="flex w-12/12 max-h-[130px]">
      <img
        src={
          artist.photo ? BASE_API_URL + artist.photo : '../profilephoto.jpeg'
        }
        width={200}
        height={200}
        className='max-h-[200px] object-contain'
      />
      <figcaption className="px-2 flex flex-col justify-end ">
        <p className="flex mx-1 capitalize">
          <span className="mr-2 font-bold">Job title: </span>
          {artist.job_title}
        </p>
        <div className="flex mx-1">
          <span className="mr-2 font-bold">Ratings: </span>
          <StarRating
            totalStars={5}
            ratings={artist.ratings}
            isRating={false}
          />
        </div>
        <p className="flex mx-1 capitalize">
          <span className="mr-2 font-bold">Location: </span>
          {artist.addresses[0] ? artist.addresses[0].city : 'Not available'}
        </p>
        <p className="flex mx-1 capitalize">
          <span className="mr-2 font-bold">Phone: </span>
          {artist.business_line ? artist.business_line : 'Not Available'}
        </p>
      </figcaption>
    </figure>
  );
};

export default Artisan;
