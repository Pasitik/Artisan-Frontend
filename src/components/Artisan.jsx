import StarRating from './StarRating';

const Artisan = ({ artist }) => {
  return (
    <figure key={artist.id} className="flex w-12/12">
      <img src="../artisan.jpeg" width={200} height={200} />
      <figcaption className="px-2 flex flex-col justify-end ">
        <p className="flex mx-1 capitalize">
          <span className="mr-2 font-bold">Job title: </span>
          {artist.job_title}
        </p>
        <div className="flex mx-1">
          <span className="mr-2 font-bold">Ratings: </span>
          <StarRating totalStars={5} ratings={artist.rating} isRating={false} />
        </div>
        <p className="flex mx-1 capitalize">
          <span className="mr-2 font-bold">Location: </span>
          {artist.addresses[0] ? artist.addresses[0].city : 'Not available'}
        </p>
        <p className="flex mx-1 capitalize">
          <span className="mr-2 font-bold">Phone: </span>
          {artist.phone}
        </p>
      </figcaption>
    </figure>
  );
};

export default Artisan;
