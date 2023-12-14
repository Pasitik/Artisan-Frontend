import { useEffect, useState } from 'react';
import AuthSide from '../components/AuthSide';
import { useSelector, useDispatch } from 'react-redux';
import { useApi } from '../data/ApiProvider';
import { getCategory } from './categorySlice';
import { addArtisan } from './addArtisanSlice';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../data/UserProvider';

const AddArtisan = () => {
  const dispatch = useDispatch();
  const api = useApi();
  const { user } = useUser();
  const navigate = useNavigate();

  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    job_title: '',
    summary: '',
    category: '',
    business_line: '',
  });

  const { category, status, error } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getCategory(async () => await api.getArtisanCategories()));
  }, [dispatch, api]);

  const handleOnChange = (e) => {
    if (e.target.value.length > 0) {
      formErrors[e.target.name] = {};
      setFormErrors({});
    }
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.job_title || !formData.summary || !formData.category) {
      return;
    }

    dispatch(addArtisan(async () => await api.addArtisan(formData))).then(
      async () => {
        setFormData({
          job_title: '',
          summary: '',
          category: '',
          business_line: '',
        });
        const response = await api.updateCustomerMembership({
          ...user,
          membership: 'A',
        });
        if (response.membership) {
          navigate('/artisan/profile');
        }
      },
    );
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error loading data: {error}</div>;
  }

  return (
    <div className="w-full h-screen flex items-start">
      <AuthSide />

      <div className="w-1/2 h-full bg-[#f5f5f5] flex flex-col px-20 py-8 justify-between">
        <h1 className="text-base text-[#060606] font-semibold mb-2">
          ArtisanBay
        </h1>

        <div className="w-full flex flex-col max-w-[550px]">
          <div className="w-full flex flex-col mb-5">
            <h1 className="text-3xl font-semibold mb-2">
              Join The Artisan Pool
            </h1>
            <p className="text-base mb-2">Please enter your details</p>
          </div>

          <div className="w-full flex flex-col">
            <form onSubmit={handleSubmit}>
              <div>
                <label hidden htmlFor="job title"></label>
                <input
                  id="job_title"
                  name="job_title"
                  type="text"
                  value={formData.job_title}
                  placeholder="Profession"
                  onChange={handleOnChange}
                  required
                  className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
                />
                {formErrors.job_title && (
                  <p
                    hidden={!(formErrors.job_title.field === 'job_title')}
                    className="text-red-500 text-sm"
                  >
                    {formErrors.job_title.message}
                  </p>
                )}
              </div>
              <div>
                <label hidden htmlFor="summary"></label>
                <input
                  id="summary"
                  name="summary"
                  type="text"
                  placeholder="Summary"
                  value={formData.summary}
                  onChange={handleOnChange}
                  required
                  className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
                />
                {formErrors.summary && (
                  <p
                    hidden={!(formErrors.summary.field === 'summary')}
                    className="text-red-500 text-sm"
                  >
                    {formErrors.summary.message}
                  </p>
                )}
              </div>
              <div>
                <label hidden htmlFor="business_line"></label>
                <input
                  id="business_line"
                  name="business_line"
                  type="tel"
                  placeholder="Telephone"
                  value={formData.business_line}
                  onChange={handleOnChange}
                  className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
                />
                {formErrors.business_line && (
                  <p
                    hidden={
                      !(formErrors.business_line.field === 'business_line')
                    }
                    className="text-red-500 text-sm"
                  >
                    {formErrors.business_line.message}
                  </p>
                )}
              </div>
              <div className="my-2">
                <label hidden>category </label>
                <select
                  name="category"
                  className="block w-full"
                  value={formData.category}
                  onChange={handleOnChange}
                >
                  <option value="">-- Select job category --</option>
                  {category &&
                    category.map((opt) => (
                      <option
                        value={opt.category}
                        key={opt.category + '' + opt.id}
                      >
                        {opt.category.toLowerCase().replaceAll('_', ' ')}
                      </option>
                    ))}
                </select>
              </div>
              <div className="w-full flex flex-col my-4">
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full text-white my-2 font-semibold bg-[#060606] rounded-md p-4 text-center flex items-center justify-center"
                >
                  Join
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddArtisan;
