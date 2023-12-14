import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useApi } from '../data/ApiProvider';
import { useDispatch, useSelector } from 'react-redux';
import { getArtisan } from './artisanDetailSlice';
import Artisan from '../components/Artisan';
import NavBar from '../components/NavBar';
import { Modal } from '../components/Modal';
import StarRating from '../components/StarRating';
import { useUser } from '../data/UserProvider';
import Review from '../components/Review';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { dateToString } from '../utils/date';

const ArtisanDetail = () => {
  const { id } = useParams();
  const api = useApi();
  const dispatch = useDispatch();
  const [toggleModel, setToggleModel] = useState(true);
  const [isReview, setReview] = useState(true);
  const [isReviewSubmitted, setIsReviewSubmitted] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const { user } = useUser();
  const reviewRef = useRef();
  const { status, artisan, error } = useSelector((state) => state.artisan);

  if (!id) {
    throw new Error('User not found');
  }
  useEffect(() => {
    dispatch(getArtisan(async () => await api.fetchArtist(id)));
    (async () => {
      const response = await api.verifyArtist(id);
      setIsVerified(response);
    })();
  }, [dispatch, api, id]);

  const handleReview = () => {
    setReview(true);
    setToggleModel(false);
  };

  const handleRating = () => {
    setReview(false);
    setToggleModel(false);
  };

  const handleModelToggle = () => {
    setToggleModel(true);
    setIsReviewSubmitted(false);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();

    if (!id) {
      throw new Error('Artisan id not found');
    }
    if (reviewRef.current.value.trim() !== '') {
      const review = reviewRef.current.value;

      (async () => {
        const response = await api.updateArtisanReview({
          review: review,
          artisan_id: id,
        });
        if (response === 'OK') {
          setIsReviewSubmitted(true);
          reviewRef.current.value = '';
        }
      })();
    }
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
      <section className="p-4 container mx-32">
        {artisan && (
          <>
            <Modal xtraclass={''} hidden={toggleModel}>
              <div className="relative bg-slate-500 ">
                <button
                  className="absolute top-0 right-0 bottom-0 text-xl"
                  onClick={handleModelToggle}
                >
                  x
                </button>
              </div>
              {isReview ? (
                <div className="flex justify-center items-center h-[100%]">
                  {!isReviewSubmitted ? (
                    <Review
                      handleReviewSubmit={handleReviewSubmit}
                      reviewRef={reviewRef}
                      handleModelToggle={handleModelToggle}
                    />
                  ) : (
                    <>
                      <div className="w-full">
                        <p className="text-white font-bold">
                          Review Successfully submitted
                        </p>
                        <div className="my-2 p-2 grid place-content-center">
                          <span className="block text-4xl text-green-800 border border-1 border-green-600 rounded-full w-[50px] h-[50px] transition-transform ease-in-out duration-300">
                            <FontAwesomeIcon icon={faCheck} />
                          </span>
                        </div>
                      </div>
                    </>
                  )}{' '}
                </div>
              ) : (
                <div className="flex justify-center items-center h-[100%]">
                  <div className="text-4xl font-bold text-black">
                    <StarRating totalStars={5} ratings={5} isRating />
                  </div>
                </div>
              )}
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
              {artisan.reviews.length > 0 ? (
                artisan.reviews.map((review) => (
                  <section key={review.id} className="my-1 p-1">
                    <div className="my-1 p-1">
                      <p>
                        <span className="text-sm font-bold mr-2">Review:</span>
                        {review.review}
                      </p>
                      <p className="text-sm flex justify-between">
                        <span>
                          <span className="text-sm font-bold mr-2">
                            Reviewer:
                          </span>
                          {'Alexis Smith'}
                        </span>
                        <span>
                          <span className="text-sm font-bold mr-2">Date:</span>{' '}
                          {dateToString(review.updated_at)}
                        </span>
                      </p>
                    </div>
                  </section>
                ))
              ) : (
                <p>No reviews</p>
              )}
            </article>

            {user && !isVerified && (
              <section className="flex">
                <button
                  onClick={handleRating}
                  className="m-1 bg-black text-sm text-white py-2 rounded-full px-4"
                >
                  Rate
                </button>
                <button
                  onClick={handleReview}
                  className="m-1 bg-black text-sm text-white py-2 rounded-full px-4"
                >
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
