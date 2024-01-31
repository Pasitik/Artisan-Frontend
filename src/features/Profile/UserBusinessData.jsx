import { Link } from 'react-router-dom';

const UserBusinessInfo = ({
  data,
  customer,
  address,
  category,
  artisanDataForm,
  handleOnChange,
  trackProfileCompletion,
  handleBusinessSubmit,
}) => {
  return (
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
                    artisanDataForm.category ? artisanDataForm.category : ''
                  }
                >
                  <option value="" disabled>
                    -- Select --
                  </option>
                  {category &&
                    category.map((opts, index) => (
                      <option key={opts + index} value={opts.category}>
                        {opts &&
                          opts.category.toLowerCase().replaceAll('_', ' ')}
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
                !(customer && data && trackProfileCompletion(customer, address))
              }
              className="mb-8 w-full text-white font-semibold bg-[#060606] rounded-md p-4 text-center flex items-center justify-center"
            >
              {customer && data && trackProfileCompletion(customer, address)
                ? 'Join Artisans'
                : 'Complete profile setup to activate'}
            </button>
          </Link>
        </>
      )}
    </section>
  );
};
export default UserBusinessInfo;
