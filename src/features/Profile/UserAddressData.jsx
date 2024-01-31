const UserAddressInfo = ({
  handleAddressSubmit,
  handleOnChange,
  addressDataForm,
  address,
}) => {
  return (
    <section>
      <h3 className="font-bold text-xl mt-4 mb-16 text-center">
        Address Information
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
                  placeholder=" "
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
                  placeholder=" "
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
                  placeholder=" "
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
                  placeholder=" "
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
  );
};

export default UserAddressInfo;
