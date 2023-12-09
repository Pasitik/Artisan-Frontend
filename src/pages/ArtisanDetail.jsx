import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useApi } from '../data/ApiProvider';
import { useDispatch, useSelector } from 'react-redux';
import { getArtisan } from './artisanDetailSlice';
import Artisan from '../components/Artisan';
import NavBar from '../components/NavBar';

const ArtisanDetail = () => {
  const { id } = useParams();
  const api = useApi();
  const dispatch = useDispatch();

  if (!id) {
    throw new Error('User not found');
  }
  useEffect(() => {

    dispatch(getArtisan(async () => await api.fetchArtist(id)))
  }, [dispatch, api, id]);

  const { status, artisan, error } = useSelector((state) => state.artisan);

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
            <Artisan artist={artisan} />
            <article className="my-2">
              <p>
                <span className="font-bold mr-2">Name:</span>
                {artisan.first_name} {artisan.last_name}
              </p>
              <p>
                <span className="font-bold mr-2">Email:</span>
                {artisan.email}
              </p>
              <p>
                <span className="font-bold mr-2">Summary:</span>
                {artisan.summary}
              </p>
            </article>
			<article className="my-2">
				<h3 className='font-bold'>Reviews:</h3>
				<p className='my-1 p-1'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut similique nulla ipsum illo error corrupti sit labore aspernatur debitis enim, provident cupiditate facere culpa odit temporibus quas veritatis minus modi?</p>
				<p className='my-1 p-1'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut similique nulla ipsum illo error corrupti sit labore aspernatur debitis enim, provident cupiditate facere culpa odit temporibus quas veritatis minus modi?</p>
				<p className='my-1 p-1'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut similique nulla ipsum illo error corrupti sit labore aspernatur debitis enim, provident cupiditate facere culpa odit temporibus quas veritatis minus modi?</p>
				<p className='my-1 p-1'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut similique nulla ipsum illo error corrupti sit labore aspernatur debitis enim, provident cupiditate facere culpa odit temporibus quas veritatis minus modi?</p>
			</article>
			
          </>
        )}
      </section>
    </>
  );
};
export default ArtisanDetail;
