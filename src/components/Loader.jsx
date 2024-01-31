import { useEffect, useRef } from 'react';

const Loader = () => {
  return (
    <div className=" h-screen w-screen grid place-content-center">
      <div className="loader" id="load"></div>
    </div>
  );
};

export default Loader;
