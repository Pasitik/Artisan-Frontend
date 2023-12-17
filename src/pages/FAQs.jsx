import { React, useState } from 'react';
import faqs from '../data/FaqData';
import NavBar from '../components/NavBar';

const FAQs = () => {
  const [selected, setSelected] = useState(null);
  const toggle = (i) => {
    if (selected == i) {
      return setSelected(null);
    }
    setSelected(i);
  };
  return (
    <div className="w-full">
      <NavBar />
      <h1 className="text-left text-3xl font-extrabold my-10 mx-20">FAQs</h1>
      <div className="w-full flex justify-center items-center ">
        <div className="w-1/2">
          {faqs.map((item, i) => (
            <div className="bg-[#f0ebe1] mb-5 py-10 px-20">
              <div
                className="flex justify-between text-[#85662b] my-5 cursor-pointer text-xl font-bold"
                onClick={() => toggle(i)}
              >
                <h2 className="font-bold">{item.question}</h2>
                <span className="font-bold text-2xl">
                  {selected === i ? '-' : '+'}
                </span>
              </div>
              <div
                className={
                  selected === i
                    ? 'h-auto max-h-[9999] transition-all duration-1000 ease-in-out'
                    : 'text-[8b7f75] max-h-0 overflow-hidden transition-all duration-1000 ease-in-out'
                }
              >
                {item.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQs;
