import { useEffect, useState } from 'react';
import AuthSide from '../components/AuthSide';
import { useDispatch } from 'react-redux';
import { useApi } from '../data/ApiProvider';

const AddAddress = () => {
  const dispatch = useDispatch();
  const api = useApi();

  const [formErrors, setFormErrors] = useState({});
  const [isValidForm, setFormIsValid] = useState(false);
  const [formData, setFormData] = useState({
    houseNo: '',
    street: '',
    city: '',
    state: '',
  });
  //   const { status, error } = useSelector((state) => state.users);

  useEffect(() => {
    if (
      formData.city &&
      formData.houseNo &&
      formData.state &&
      formData.street
    ) {
      setFormIsValid(true);
    }
  }, [isValidForm, formErrors, formData]);

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

  const handleBlur = (e) => {
    let newErrors = { ...formErrors };

    if (!e.target.value && e.target.name == 'houseNo') {
      newErrors = {
        ...newErrors,
        houseNo: {
          message: 'House number is required',
          field: 'houseNo',
        },
      };
    }
    if (!formData.street && e.target.name == 'street') {
      newErrors = {
        ...newErrors,
        street: {
          message: 'Street name is required',
          field: 'street',
        },
      };
    }
    if (!formData.city && e.target.name == 'city') {
      newErrors = {
        ...newErrors,
        city: {
          message: 'City name is required',
          field: 'city',
        },
      };
    }
    if (!formData.state && e.target.name == 'state') {
      newErrors = {
        ...newErrors,
        state: {
          message: 'State name is required',
          field: 'state',
        },
      };
    }
    setFormErrors(newErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(JSON.stringify(formData));

    if (
      !formData.city ||
      !formData.houseNo ||
      !formData.state ||
      !formData.street
    ) {
      setFormIsValid(false);
      return;
    }
    console.log(formData);

    dispatch(async () => await api.addAddress(formData)).then((result) => {
      console.log(result);
      // navigate("/");
      console.log('we are in', formErrors);
    });
  };

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
            <form action="">
              <div>
                <label hidden htmlFor="houseno"></label>
                <input
                  id="houseno"
                  name="houseNo"
                  type="text"
                  placeholder="House number"
                  onBlur={handleBlur}
                  onChange={handleOnChange}
                  className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
                />
                {formErrors.houseNo && (
                  <p
                    hidden={!(formErrors.houseNo.field === 'houseNo')}
                    className="text-red-500 text-sm"
                  >
                    {formErrors.houseNo.message}
                  </p>
                )}
              </div>
              <div>
                <label hidden htmlFor="street"></label>
                <input
                  id="street"
                  name="street"
                  type="text"
                  placeholder="Street name"
                  onChange={handleOnChange}
                  onBlur={handleBlur}
                  className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
                />
                {formErrors.street && (
                  <p
                    hidden={!(formErrors.street.field === 'street')}
                    className="text-red-500 text-sm"
                  >
                    {formErrors.street.message}
                  </p>
                )}
              </div>
              <div>
                <label hidden htmlFor="city"></label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  placeholder="City"
                  onChange={handleOnChange}
                  onBlur={handleBlur}
                  className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
                />
                {formErrors.city && (
                  <p
                    hidden={!(formErrors.city.field === 'city')}
                    className="text-red-500 text-sm"
                  >
                    {formErrors.city.message}
                  </p>
                )}
              </div>
              <div>
                <label hidden htmlFor="state"></label>
                <input
                  id="state"
                  name="state"
                  type="text"
                  placeholder="State / Province"
                  onChange={handleOnChange}
                  onBlur={handleBlur}
                  className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
                />
                {formErrors.state && (
                  <p
                    hidden={!(formErrors.state.field === 'state')}
                    className="text-red-500 text-sm"
                  >
                    {formErrors.state.message}
                  </p>
                )}
              </div>

              <div className="w-full flex flex-col my-4">
                <button
                  onClick={handleSubmit}
                  disabled={status === 'loading' || !isValidForm}
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

export default AddAddress;
