import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useApi } from '../data/ApiProvider';
import { useDispatch, useSelector } from 'react-redux';
import { getArtisan } from './artisanDetailSlice';
import Artisan from '../components/Artisan';
import NavBar from '../components/NavBar';
import { Modal } from '../components/Modal';
import StarRating from '../components/StarRating';
import { useUser } from '../data/UserProvider';

const ArtisanDetail = () => {
  const { id } = useParams();
  const api = useApi();
  const dispatch = useDispatch();
  const [toggleModel, setToggleModel] = useState(true);
  const { user } = useUser();
  const { status, artisan, error } = useSelector((state) => state.artisan);

  const reviews = [
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut \
  similique nulla ipsum illo error corrupti sit labore aspernatur \
  debitis enim, provident cupiditate facere culpa odit temporibus \
  quas veritatis minus modi?',
  ];

  if (!id) {
    throw new Error('User not found');
  }
  useEffect(() => {
    dispatch(getArtisan(async () => await api.fetchArtist(id)));
  }, [dispatch, api, id]);

  const handleReview = (e) => {
    console.log('Review clicked');
    setToggleModel(false);
  };

  const handleModelToggle = () => {
    setToggleModel(true);
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error loading data: {error}</div>;
  }

  return (
    <>
      <NavBar />
      <section className="p-4">
        {artisan && (
          <>
            <Modal xtraclass={''} hidden={toggleModel}>
              <div className="relative text-white bg-slate-500 ">
                <button
                  className="absolute top-0 right-0 bottom-0 text-xl"
                  onClick={handleModelToggle}
                >
                  x
                </button>
              </div>
              <div className="flex justify-center items-center h-[100%]">
                <div className="text-4xl">
                  <StarRating totalStars={5} ratings={5} isRating />
                </div>
              </div>
            </Modal>
            <Artisan artist={artisan} />
            <article className="my-2">
              <p>
                <span className="font-bold mr-2">Name:</span>
                {artisan.first_name && artisan.last_name
                  ? `${artisan.first_name} ${artisan.last_name}`
                  : 'Not Available'}
              </p>
              <p>
                <span className="font-bold mr-2">Email:</span>
                {artisan.email ? artisan.email : 'Not Available'}
              </p>
              <p>
                <span className="font-bold mr-2">Summary:</span>
                {artisan.summary ? artisan.summary : 'Not Available'}
              </p>
            </article>
            <article className="my-2">
              <h3 className="font-bold">Reviews:</h3>
              {Array.from({ length: 5 })
                .map(() => reviews[0])
                .map((review, idx) => (
                  <p key={idx} className="my-1 p-1">{review}</p>
                ))}
            </article>

            {user && (
              <section className="flex">
                <button
                  onClick={handleReview}
                  className="m-1 bg-black text-sm text-white py-2 rounded-full px-4"
                >
                  Rate
                </button>
                <button className="m-1 bg-black text-sm text-white py-2 rounded-full px-4">
                  Review
                </button>
              </section>
            )}
          </>
        )}
      </section>
    </>
  );
};
export default ArtisanDetail;
