const BASE_API_URL = import.meta.env.VITE_APP_BASE_API_URL;

const UserPersonalInfo = ({
  uploadedImage,
  handleOnChange,
  personalDataForm,
  handleFileChange,
  handlePersonalSubmit,
  customer,
}) => {
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();

    if (e.dataTransfer.items) {
      const file = e.dataTransfer.items[0].getAsFile();
      handleFileChange({ target: { files: [file] } });
    }
  };

  return (
    <section>
      <h3 className="font-bold text-xl mt-4 mb-16 text-center">
        Personal Information
      </h3>

      <div className="my-8 mb-20 flex flex-col items-center">
        <p>Drag and drop an image or click to upload.</p>
        <label htmlFor="fileInput">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleOnChange(e, uploadedImage)}
            style={{ display: 'none' }}
            id="fileInput"
          />
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="max-w-[300px] max-h-[300px] border-2 border-dashed boder-[#ccc] text-center pt-2 cursor-pointer grid place-content-center"
          >
            <img
              src={
                uploadedImage
                  ? BASE_API_URL + 'media' + uploadedImage
                  : '../profilephoto.jpeg'
              }
              alt="Uploaded"
              className="max-w-full max-h-full object-cover overflow-hidden"
              height={270}
              width={270}
            />
          </div>
        </label>
        <p>Using your business flyer or poster is recommended.</p>
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
                <label htmlFor="first_name tesx">First Name </label>
              </div>
              <div className="field">
                <input
                  type="text"
                  required
                  pattern={'[A-Za-z0-9]{3,200}'}
                  className="block w-full p-2 rounded shadow"
                  name="last_name"
                  value={personalDataForm.last_name}
                  placeholder=" "
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
                  placeholder=" "
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
                  value={
                    personalDataForm.birth_date
                      ? personalDataForm.birth_date
                      : ''
                  }
                  placeholder=" "
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
                  placeholder=" "
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
  );
};

export default UserPersonalInfo;
