import { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import { useApi } from '../data/ApiProvider';
import { useDispatch, useSelector } from 'react-redux';
import { addArtisan } from '../features/addArtisanSlice';
import { getCustomer } from './profileSlice';
import { getHouseNumber } from '../features/houseNumberSlice';
import { getCategory } from '../features/categorySlice';

const Profile = () => {
  const api = useApi();
  const dispatch = useDispatch();
//   const [isPhotoUpdated, setPhotoUpdated] = useState(false);
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

  const { status, customer, error } = useSelector((state) => state.customer);
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
		// setPhotoUpdated(true)
		handleFileChange(e);
        break;
      default:
        throw new Error('Invalid form type provided');
    }
  };

  const handlePersonalSubmit = (e) => {
    e.preventDefault();

    if (personalDataForm.username) {
      dispatch(getCustomer(async () => api.updateCustomer(personalDataForm)));
    }
  };

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    if (addressDataForm.state && addressDataForm.house_number) {
      dispatch(
        getCustomer(async () => api.updateCustomerAddress(addressDataForm)),
      );
    }
  };

  const handleBusinessSubmit = (e) => {
    e.preventDefault();
    if (artisanDataForm.job_title && artisanDataForm.category) {
      dispatch(
        getCustomer(async () => api.updateCustomerPortfolio(artisanDataForm)),
      );
    }
  };

  function handleFileChange(e) {

	const file = e.target.files[0]

    if (file && file.type.startsWith('image/')) {
		const reader = new FileReader()

		reader.onload = () => {
			setuploadedImage(reader.result)
		}
		reader.readAsDataURL(file)

		alert(file)
    }	
	    //   dispatch(
    //     getCustomer(async () => api.updateCustomerPortfolio(artisanDataForm)),
    //   );
  }

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error loading data: {error}</div>;
  }

  return (
    <div>
      <NavBar />
      <article id="hero" className="py-5">
        <div className="container mx-auto mt-10 md:px-12">
          <h2 className="font-bold text-4xl mt-4 mb-16 text-center underline">
            {' '}
            Update profile
          </h2>
          <section>
            <h3 className="font-bold text-xl mt-4 mb-16 text-center underline">
              Personal data
            </h3>
            
			 <div className="my-8 flex flex-col items-center">
			 <p>Drag and drop an image or click to upload.</p>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleOnChange(e, uploadedImage)}
        style={{ display: 'none' }}
        id="fileInput"
      />
      <label htmlFor="fileInput">
        <div
        //   onDragOver={handleDragOver}
        //   onDrop={handleDrop}
          style={{
            width: '300px',
            height: '300px',
            border: '2px dashed #ccc',
            textAlign: 'center',
            paddingTop: '20px',
            cursor: 'pointer',
			display: 'grid',
			placeContent: 'center'
          }}
        >
            <img
              src={uploadedImage ? uploadedImage : '../profilephoto.jpeg'}
              alt="Uploaded"
              style={{ maxWidth: '100%', maxHeight: '100%' , objectFit: 'cover'}}
			  height={270}
			  width={270}
			  
            />
        </div>
      </label>
    </div>
            <form onSubmit={handlePersonalSubmit}>
              <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                {customer && (
                  <>
                    <div className="field">
                      <input
                        id="first_name"
                        type="text"
                        required
                        pattern={'[A-Za-z]{3,200}'}
                        className="block w-full p-2 rounded shadow"
                        name="first_name"
                        value={personalDataForm.first_name}
                        placeholder=""
                        onChange={(e) => handleOnChange(e, personalDataForm)}
                      />
                      <label htmlFor="first_name">First Name </label>
                    </div>
                    <div className="field">
                      <input
                        type="text"
                        required
                        pattern={'[A-Za-z0-9]{3,200}'}
                        className="block w-full p-2 rounded shadow"
                        name="last_name"
                        value={personalDataForm.last_name}
                        placeholder="Last name"
                        onChange={(e) => handleOnChange(e, personalDataForm)}
                      />
                      <label>Last Name </label>
                    </div>
                    <div className="field">
                      <input
                        type="text"
                        required
                        className="block w-full p-2 rounded shadow"
                        name="username"
                        value={personalDataForm.username}
                        placeholder=""
                        onChange={(e) => handleOnChange(e, personalDataForm)}
                      />
                      <label>Username</label>
                    </div>
                    <div className="field">
                      <input
                        type="email"
                        required
                        disabled
                        className="block w-full p-2 rounded shadow"
                        name="email"
                        value={customer.email}
                        placeholder=""
                        onChange={(e) => handleOnChange(e, personalDataForm)}
                      />
                      <label>Email</label>
                    </div>
                    <div className="field">
                      <input
                        type="date"
                        required
                        className="block w-full p-2 rounded shadow"
                        name="birth_date"
                        value={personalDataForm.birth_date}
                        placeholder="Date of birth"
                        onChange={(e) => handleOnChange(e, personalDataForm)}
                      />
                      <label>Birth Date</label>
                    </div>
                    <div className="field">
                      <input
                        type="tel"
                        required
                        className="block w-full p-2 rounded shadow"
                        name="phone"
                        value={personalDataForm.phone}
                        placeholder="Phone"
                        onChange={(e) => handleOnChange(e, personalDataForm)}
                      />
                      <label>Phone</label>
                    </div>{' '}
                  </>
                )}
              </fieldset>
              <button
                type="submit"
                className="w-full text-white font-semibold bg-[#060606] rounded-md p-4 text-center flex items-center justify-center"
              >
                save
              </button>
            </form>
          </section>

          <section>
            <h3 className="font-bold text-xl mt-4 mb-16 text-center underline">
              Address data
            </h3>
            <form onSubmit={handleAddressSubmit}>
              <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {address && (
                  <>
                    <div className="field">
                      <input
                        type="text"
                        required
                        className="block w-full p-2 rounded shadow"
                        name="house_number"
                        value={addressDataForm.house_number}
                        placeholder=""
                        onChange={(e) => handleOnChange(e, addressDataForm)}
                      />
                      <label>Address line 1</label>
                    </div>
                    <div className="field">
                      <input
                        type="text"
                        id="street"
                        required
                        className="block w-full p-2 rounded shadow"
                        name="street"
                        value={addressDataForm.street}
                        placeholder=""
                        onChange={(e) => handleOnChange(e, addressDataForm)}
                      />
                      <label htmlFor="street">Street</label>
                    </div>
                    <div className="field">
                      <input
                        type="text"
                        id="city"
                        required
                        className="block w-full p-2 rounded shadow"
                        name="city"
                        value={addressDataForm.city}
                        placeholder=""
                        onChange={(e) => handleOnChange(e, addressDataForm)}
                      />
                      <label htmlFor="city">City</label>
                    </div>
                    <div className="field">
                      <input
                        type="text"
                        id="state"
                        required
                        className="block w-full p-2 rounded shadow"
                        name="state"
                        value={addressDataForm.state}
                        placeholder=""
                        onChange={(e) => handleOnChange(e, addressDataForm)}
                      />
                      <label htmlFor="state">State / Province</label>
                    </div>
                  </>
                )}
              </fieldset>
              <button
                type="submit"
                className="w-full text-white font-semibold bg-[#060606] rounded-md p-4 text-center flex items-center justify-center"
              >
                save
              </button>
            </form>
          </section>
          <section>
            <h3 className="font-bold text-xl mt-4 mb-16 text-center underline">
              business data
            </h3>
            <form onSubmit={handleBusinessSubmit}>
              <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data ? (
                  <>
                    <div className="field">
                      <input
                        type="text"
                        id="job_title"
                        required
                        className="block w-full p-2 rounded shadow"
                        name="job_title"
                        value={artisanDataForm.job_title}
                        placeholder=""
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
                        value={artisanDataForm.category}
                      >
                        <option value="" disabled>
                          -- Select --
                        </option>
                        {category &&
                          category.map((opts, index) => (
                            <option key={opts + index} value={opts}>
                              {opts.category.toLowerCase().replaceAll('_', ' ')}
                            </option>
                          ))}
                      </select>
                      <label htmlFor="category">Category</label>
                    </div>
                    <div className="field">
                      <input
                        id="business_line"
                        disabled
                        type="tel"
                        className="block w-full p-2 rounded shadow"
                        name="business_line"
                        value={'+0304567890'}
                        placeholder=" "
                        onChange={(e) => handleOnChange(e, artisanDataForm)}
                      />
                      <label htmlFor="business_line">Work line</label>
                    </div>{' '}
                  </>
                ) : (
                  <button>Join Artisans</button>
                )}
              </fieldset>
              <button
                type="submit"
                className="w-full text-white font-semibold bg-[#060606] rounded-md p-4 text-center flex items-center justify-center"
              >
                save
              </button>
            </form>
          </section>
        </div>
      </article>
    </div>
  );
};

export default Profile;
