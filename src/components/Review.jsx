const Review = ({ handleReviewSubmit, reviewRef, handleModelToggle }) => {
  return (
    <>
      <form className="w-full" onSubmit={handleReviewSubmit}>
        <textarea
          className="w-3/4 p-2 rounded-md"
          cols={10}
          rows={5}
          ref={reviewRef}
        ></textarea>
        <div>
          <button
            type="button"
            onClick={handleModelToggle}
            className="p-2 px-4 m-1 rounded-md bg-white"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="p-2 px-4 m-1 rounded-md bg-green-400 text-white font-bold"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default Review;
