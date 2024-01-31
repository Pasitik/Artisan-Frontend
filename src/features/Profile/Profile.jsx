import { useEffect, useState } from 'react';
import NavBar from '../../components/NavBar';
import { useApi } from '../../data/ApiProvider';
import { useDispatch, useSelector } from 'react-redux';
import { addArtisan } from '../addArtisanSlice';
import { getCustomer } from './profileSlice';
import { getHouseNumber } from '../houseNumberSlice';
import { getCategory } from '../categorySlice';
import { Link } from 'react-router-dom';
import { useUser } from '../../data/UserProvider';
import Loader from '../../components/Loader';
import UserPersonalInfo from './UserData';
import UserAddressInfo from './UserAddressData';

const Profile = () => {
  const api = useApi();
  const { setUser } = useUser();
  const dispatch = useDispatch();
  const [uploadedImage, setuploadedImage] = useState(null);

  const [personalDataForm, setPersonalDataForm] = useState({
    first_name: '',
    last_name: '',
    username: '',
    birth_date: '',
    phone: '',
  });
  const [addressDataForm, setAddressDataForm] = useState({
    house_number: '',
    street: '',
    city: '',
    state: '',
  });
  const [artisanDataForm, setArtisanDataForm] = useState({
    job_title: '',
    summary: '',
    category: '',
    business_line: '',
  });

  useEffect(() => {
    dispatch(addArtisan(async () => await api.fetchCustomerPortfolio())).then(
      (res) => {
        if (res.payload) {
          setArtisanDataForm(res.payload);
        }
        dispatch(getCategory(async () => await api.getArtisanCategories()));
      },
    );

    dispatch(getCustomer(async () => await api.fetchCustomer())).then((res) => {
      if (res.payload) {
        setPersonalDataForm(res.payload);

        const profilePhoto =
          res.payload.photos.length > 0
            ? res.payload.photos[0].photo
            : undefined;
        setuploadedImage(profilePhoto);
      }
    });

    dispatch(getHouseNumber(async () => await api.fetchCustomerAddress())).then(
      (res) => {
        if (res.payload) {
          setAddressDataForm(res.payload);
        }
      },
    );
  }, [api, dispatch]);

  const { status, customer } = useSelector((state) => state.customer);
  const { address } = useSelector((state) => state.address);
  const { data } = useSelector((state) => state.artisanProfile);
  const { category } = useSelector((state) => state.category);

  const handleOnChange = (e, formType) => {
    e.preventDefault();
    const form = {
      ...formType,
      [e.target.name]: e.target.value,
    };

    switch (formType) {
      case personalDataForm:
        setPersonalDataForm(form);
        break;
      case addressDataForm:
        setAddressDataForm(form);
        break;
      case artisanDataForm:
        setArtisanDataForm(form);
        break;
      case uploadedImage:
        handleFileChange(e);
        break;
      default:
        throw new Error('Invalid form type provided');
    }
  };

  const handlePersonalSubmit = (e) => {
    e.preventDefault();

    if (personalDataForm.username) {
      dispatch(
        getCustomer(async () => api.updateCustomer(personalDataForm)),
      ).then((res) => (!res.error ? setUser(res.payload) : null));
    }
  };

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    if (addressDataForm.state && addressDataForm.house_number) {
      dispatch(
        getHouseNumber(async () => api.updateCustomerAddress(addressDataForm)),
      );
    }
  };

  const handleBusinessSubmit = (e) => {
    e.preventDefault();
    if (artisanDataForm.job_title) {
      dispatch(
        addArtisan(async () => api.updateCustomerPortfolio(artisanDataForm)),
      );
    }
  };

  function handleFileChange(e) {
    const file = e.target.files[0];

    if (file && file.type.startsWith('image/')) {
      const formData = new FormData();
      formData.append('photo', file);

      (async () => {
        try {
          const response = await api.updateCustomerProfilephoto(formData);
          setuploadedImage(response.photo);
        } catch (error) {
          console.log('Error:', error);
        }
      })();
    }
  }

  if (status === 'loading') {
    return <Loader />;
  }

  if (status === 'failed') {
    return <div>Error loading data</div>;
  }

  return (
    <div>
      <NavBar />
      <article id="hero" className="py-5 profile-section">
        <div className="container mx-auto mt-10 md:px-12">
          <h2 className="font-bold text-2xl mt-4 mb-16 text-center">
            {' '}
            Profile
          </h2>
          <UserPersonalInfo
            customer={customer}
            uploadedImage={uploadedImage}
            handleOnChange={handleOnChange}
            personalDataForm={personalDataForm}
            handleFileChange={handleFileChange}
            handlePersonalSubmit={handlePersonalSubmit}
          />
          <UserAddressInfo
            address={address}
            handleOnChange={handleOnChange}
            addressDataForm={addressDataForm}
            handleAddressSubmit={handleAddressSubmit}
          />
          <section>
            <h3 className="font-bold text-xl mt-4 mb-16 text-center">
              Business Information
            </h3>
            {customer &&
            customer.membership === 'A' &&
            trackProfileCompletion(customer, address) ? (
              <form onSubmit={handleBusinessSubmit}>
                <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <>
                    <div className="field">
                      <input
                        type="text"
                        id="job_title"
                        required
                        className="block w-full p-2 rounded shadow"
                        name="job_title"
                        value={artisanDataForm.job_title}
                        placeholder=" "
                        onChange={(e) => handleOnChange(e, artisanDataForm)}
                      />
                      <label htmlFor="job_title">Job Title</label>
                    </div>
                    <div className="field">
                      <textarea
                        type="text"
                        id="summary"
                        className="block w-full p-2 rounded shadow"
                        name="summary"
                        value={artisanDataForm.summary}
                        placeholder=""
                        onChange={(e) => handleOnChange(e, artisanDataForm)}
                      />
                      <label htmlFor="summary">Summary</label>
                    </div>
                    <div className="my-2 field">
                      <select
                        id="category"
                        name="category"
                        className="block w-full"
                        onChange={(e) => handleOnChange(e, artisanDataForm)}
                        value={
                          artisanDataForm.category
                            ? artisanDataForm.category
                            : ''
                        }
                      >
                        <option value="" disabled>
                          -- Select --
                        </option>
                        {category &&
                          category.map((opts, index) => (
                            <option key={opts + index} value={opts.category}>
                              {opts &&
                                opts.category
                                  .toLowerCase()
                                  .replaceAll('_', ' ')}
                            </option>
                          ))}
                      </select>
                      <label htmlFor="category">Category</label>
                    </div>
                    <div className="field">
                      <input
                        id="business_line"
                        type="tel"
                        className="block w-full p-2 rounded shadow"
                        name="business_line"
                        value={artisanDataForm.business_line}
                        placeholder=" "
                        onChange={(e) => handleOnChange(e, artisanDataForm)}
                      />
                      <label htmlFor="business_line">Work line</label>
                    </div>{' '}
                  </>
                </fieldset>
                <button
                  type="submit"
                  className="w-full text-white font-semibold bg-[#060606] rounded-md p-4 text-center flex items-center justify-center mb-4"
                >
                  save
                </button>
              </form>
            ) : (
              <>
                <Link to="/artisan/join">
                  <button
                    disabled={
                      !(
                        customer &&
                        data &&
                        trackProfileCompletion(customer, address)
                      )
                    }
                    className="mb-8 w-full text-white font-semibold bg-[#060606] rounded-md p-4 text-center flex items-center justify-center"
                  >
                    {customer &&
                    data &&
                    trackProfileCompletion(customer, address)
                      ? 'Join Artisans'
                      : 'Complete profile setup to activate'}
                  </button>
                </Link>
              </>
            )}
          </section>
        </div>
      </article>
    </div>
  );
};

export default Profile;

function trackProfileCompletion(personalDataForm, addressDataForm) {
  const personalInfo = {
    first_name: personalDataForm.first_name,
    last_name: personalDataForm.last_name,
    phone: personalDataForm.phone,
    birth_date: personalDataForm.birth_date,
  };

  const isPersonalFormCompleted =
    personalDataForm &&
    Object.values(personalInfo).every((value) => value.trim() !== '');

  const isAddressFormCompleted =
    addressDataForm &&
    Object.values(addressDataForm).every(
      (value) => value.toString().trim() !== '',
    );

  return isPersonalFormCompleted && isAddressFormCompleted;
}
